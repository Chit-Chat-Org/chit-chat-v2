"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Train_schema_1 = __importDefault(require("../schema/Train.schema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const RetriveAws_1 = require("../services/aws/RetriveAws");
const CohereAi_1 = require("../config/CohereAi");
const GoogleGenAI_1 = require("../config/GoogleGenAI");
const openAI_1 = require("../config/openAI");
const ioredis_1 = __importDefault(require("ioredis"));
const util_1 = __importDefault(require("util"));
const app = (0, express_1.Router)();
const rediskey = process.env.REDISS_URI;
if (!rediskey) {
    throw new Error("Invalid Redis API key");
}
const redis = new ioredis_1.default(rediskey, {
    tls: {
        rejectUnauthorized: false
    }
});
let embeddingStore = {};
const getAsync = util_1.default.promisify(redis.get).bind(redis);
const setAsync = util_1.default.promisify(redis.set).bind(redis);
app.post("/", async (req, res) => {
    try {
        const key = req.query.key;
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
        const data = await Train_schema_1.default.findOne({ apiKey: req.query.key });
        if (!data) {
            return res.json({
                status: "Error",
                message: "Invalid ApiKey",
            });
        }
        const isValidApiKey = await bcrypt_1.default.compare(data.originalAPIKey, key);
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
                const embeddingStoreJSON = await (0, RetriveAws_1.RetriveDataAws)(`embedding/${fileName}`);
                embeddingStore = JSON.parse(embeddingStoreJSON);
                if (data.embeddingModel == "OpenAI") {
                    let embeddedQuestionResponse = await openAI_1.openai.embeddings.create({
                        input: req.body.prompt,
                        model: "text-embedding-ada-002",
                    });
                    if (embeddedQuestionResponse.data.length) {
                        embeddedQuestion = embeddedQuestionResponse.data[0].embedding;
                    }
                    else {
                        throw Error("Question not embedded properly");
                    }
                }
                else {
                    let embeddedQuestionResponse = await CohereAi_1.cohere.embed({
                        texts: [req.body.prompt],
                        model: "embed-english-v3.0",
                        inputType: "classification",
                    });
                    const embeddings = embeddedQuestionResponse.embeddings;
                    if (embeddings[0].length) {
                        embeddedQuestion = embeddings[0];
                    }
                    else {
                        throw Error("Question not embedded properly");
                    }
                }
                let closestParagraphs = findClosestParagraphs(embeddedQuestion, 5);
                let responseData;
                const str = Prompt(req.body.prompt, closestParagraphs);
                if (llm == "OpenAI") {
                    let completionData = await openAI_1.openai.chat.completions.create({
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
                else {
                    const chat = GoogleGenAI_1.model.startChat({
                        generationConfig: GoogleGenAI_1.generationConfig,
                    });
                    const result = await chat.sendMessage(str);
                    responseData = result.response.text();
                }
                await setAsync(redisKey, responseData);
                return res.json({
                    status: "success",
                    message: responseData,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(400).json({
                    status: "Failed",
                    message: error,
                });
            }
        }
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            status: "Failed",
            message: error,
        });
    }
});
exports.default = app;
const extractFileNamewithExt = (url) => {
    const fileName = url.substring(url.lastIndexOf("/") + 1);
    return fileName;
};
const Prompt = (question, paragraph) => {
    return ("You are AI Assistant, your name is Lake AI. developed by Apurv Krishn Jha. Answer the following question from the context, if the answer can not be deduced from the context, say 'Sorry! I didn't Understand the Question, Please explain it in detail' :\n\n" +
        "Context :\n" +
        paragraph.join("\n\n") +
        "\n\nQuestion :\n" +
        question +
        "?" +
        "\n\nAnswer :");
};
function findClosestParagraphs(questionEmbedding, count) {
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
function compareEmbeddings(embedding1, embedding2) {
    const length = Math.min(embedding1.length, embedding2.length);
    let dotprod = 0;
    for (let i = 0; i < length; i++) {
        dotprod += embedding1[i] * embedding2[i];
    }
    return dotprod;
}
