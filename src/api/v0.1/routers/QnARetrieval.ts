import { Router, Response, Request } from "express";
import AiTrainingModel from "../schema/Train.schema";
import bcrypt from "bcrypt";
import { RetriveDataAws } from "../services/aws/RetriveAws";
import { cohere } from "../config/CohereAi";
import { generationConfig, model } from "../config/GoogleGenAI";
import { openai } from "../config/openAI";
import Redis from 'ioredis'
import util from 'util'

const app = Router();

const rediskey = process.env.REDISS_URI;

if (!rediskey) {
  throw new Error("Invalid Redis API key");
}

const redis = new Redis(rediskey,{
  tls:{
    rejectUnauthorized: false
  }
});
let embeddingStore: any = {};

const getAsync = util.promisify(redis.get).bind(redis);
const setAsync = util.promisify(redis.set).bind(redis);

app.post("/", async (req: Request, res: Response) => {
  try {
    const key = req.query.key as string;

    const llm = req.body.llm;

    if (!key) {
      return res.json({
        status: "Error",
        message: "Invalid ApiKey",
      });
    }
    const redisKey = `QnARetrieval:${req.query.key}:${req.body.prompt}`;

    // Check if the data is already cached in Redis
    const cachedData = await getAsync(redisKey);
    if (cachedData) {
      return res.json({
        status: "success",
        message: cachedData,
      });
    }
    const data = await AiTrainingModel.findOne({ apiKey: req.query.key });

    if (!data) {
      return res.json({
        status: "Error",
        message: "Invalid ApiKey",
      });
    }

    const isValidApiKey = await bcrypt.compare(data.originalAPIKey, key);

    if (isValidApiKey && data.isDisabled) {
      return res.json({
        status: "Error",
        message: "API Key is deactivated",
      });
    }

    if (isValidApiKey) {
      try {
        let embeddedQuestion;

        const fileName = extractFileNamewithExt(data.embeddedKnowlege);
        const embeddingStoreJSON: any = await RetriveDataAws(
          `embedding/${fileName}`
        );
        embeddingStore = JSON.parse(embeddingStoreJSON);

        if (data.embeddingModel == "OpenAI") {
          let embeddedQuestionResponse = await openai.embeddings.create({
            input: req.body.prompt,
            model: "text-embedding-ada-002",
          });

          if (embeddedQuestionResponse.data.length) {
            embeddedQuestion = embeddedQuestionResponse.data[0].embedding;
          } else {
            throw Error("Question not embedded properly");
          }
        } else {
          let embeddedQuestionResponse = await cohere.embed({
            texts: [req.body.prompt],
            model: "embed-english-v3.0",
            inputType: "classification",
          });
          const embeddings = embeddedQuestionResponse.embeddings as
            | number[][]
            | any;
          if (embeddings[0].length) {
            embeddedQuestion = embeddings[0];
          } else {
            throw Error("Question not embedded properly");
          }
        }

        let closestParagraphs = findClosestParagraphs(embeddedQuestion, 5);
        let responseData;
        const str = Prompt(req.body.prompt, closestParagraphs);

        if(llm == "OpenAI"){
          let completionData:any = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-16k",
            messages: [
              {
                role: "user",
                content: str,
              },
            ],
            temperature: 0,
          });
    
          if (!completionData.choices) {
            throw new Error("No answer gotten");
          }
    
          responseData = completionData.choices[0].message.content.trim();
        }
        else{
          const chat = model.startChat({
          generationConfig: generationConfig,
        });

        const result = await chat.sendMessage(str);

        responseData = result.response.text();
        }


        await setAsync(redisKey, responseData);

        return res.json({
          status: "success",
          message: responseData,
        });
      } catch (error) {
        console.error(error);

        return res.status(400).json({
          status: "Failed",
          message: error,
        });
      }
    }
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      status: "Failed",
      message: error,
    });
  }
});
export default app;

const extractFileNamewithExt = (url: string) => {
  const fileName = url.substring(url.lastIndexOf("/") + 1);
  return fileName;
};

const Prompt = (question: any, paragraph: string[]) => {
  return (
    "You are AI Assistant, your name is Lake AI. developed by Apurv Krishn Jha. Answer the following question from the context, if the answer can not be deduced from the context, say 'Sorry! I didn't Understand the Question, Please explain it in detail' :\n\n" +
    "Context :\n" +
    paragraph.join("\n\n") +
    "\n\nQuestion :\n" +
    question +
    "?" +
    "\n\nAnswer :"
  );
};

function findClosestParagraphs(questionEmbedding: string, count: number) {
  const items = [];

  for (const key in embeddingStore) {
    let paragraph = key.substring("embeds:".length);

    let currentEmbedding = JSON.parse(embeddingStore[key]).embedding;

    items.push({
      paragraph: paragraph,
      score: compareEmbeddings(questionEmbedding, currentEmbedding),
    });
  }

  items.sort(function (a, b) {
    return b.score - a.score;
  });

  return items.slice(0, count).map((item) => item.paragraph);
}

function compareEmbeddings(embedding1: any, embedding2: any) {
  const length = Math.min(embedding1.length, embedding2.length);
  let dotprod = 0;

  for (let i = 0; i < length; i++) {
    dotprod += embedding1[i] * embedding2[i];
  }
  return dotprod;
}
