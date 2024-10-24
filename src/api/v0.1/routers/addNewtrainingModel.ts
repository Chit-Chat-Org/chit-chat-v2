import {Router, Response, Request} from 'express'
import { RetriveDataAws } from '../services/aws/RetriveAws';
import { createEmbeddingCohereAI } from '../Embedding/embeddingCohere';
import { createEmbeddingOpenAI } from '../Embedding/embeddingOpenAI';
import bcrypt from 'bcrypt'
import { generateApiKey } from '../services/generateApiKey';
import AiTrainingModel from '../schema/Train.schema'
import { JwtAuth } from '../middlewares/JwtAuth';

const app = Router()

app.post('/',async (req:Request, res:Response)=>{

    try {
      const userId = req.body.organization.userId;

      if (!userId) {
        return res.json({
          status: "Failed",
          response: {},
          error: "Not Authenticated !",
        });
      }
  
    const embeddingModel = req.body.embeddingModel;

    if (!userId) {
      return res.json({
        status: "Failed",
        response: {},
        error: "Not Authenticated !",
      });
    }
    if (!embeddingModel) {
      return res.json({
        status: "Failed",
        response: {},
        error: "Provide embedding model",
      });
    }

    const newAITrainingModel = {
      userId: userId,
      organizationName: req.body.organization.organizationName,
      uploadKnowledge: req.body.url,
      embeddingModel: embeddingModel,
      embeddedKnowlege: "",
      apiKey: "",
      originalAPIKey: "",
    };


    const fileName = newAITrainingModel.uploadKnowledge.substring(
      newAITrainingModel.uploadKnowledge.lastIndexOf("/") + 1
    );

    const knowledgeSource = await RetriveDataAws(`uploads/${fileName}`);

    console.log({ fileName, knowledgeSource });

    let embeddedFileData;

    if(embeddingModel == "OpenAI"){
      embeddedFileData = await createEmbeddingOpenAI(
        fileName,
        knowledgeSource
      );
    }
    else{
      embeddedFileData = await createEmbeddingCohereAI(
        fileName,
        knowledgeSource
      );
    }

    if(!embeddedFileData){
        throw Error("Error in creating embedding file");
    }

    newAITrainingModel.embeddedKnowlege = embeddedFileData.embededFileLocation;

    const { organizationName, embeddedKnowlege } = newAITrainingModel;

    newAITrainingModel.originalAPIKey = generateApiKey({
      organizationName,
      embeddedKnowlege,
    });

    newAITrainingModel.apiKey = await bcrypt.hash(
      newAITrainingModel.originalAPIKey,
      10
    );
    console.log({ newAITrainingModel });
    const AiTrainedModel = await AiTrainingModel.create(newAITrainingModel);

    res.json({
      status: "Success",
      response: {
        data: AiTrainedModel,
      },
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      status: "Failed",
      response: {},
      error: (error as Error).message,
    });
  }
})

app.get('/',async(req:Request, res:Response)=>{
  try {
    const userIdFromQuery = req.query.UserId;
    if (!userIdFromQuery) {
      return res.json({
        status: "Failed",
        response: {},
        error: "UserId query parameter not found",
      });
    }
    const getAllAiTrained = await AiTrainingModel.find({userId: userIdFromQuery});

    res.json({
      status: "Success",
      response: {
        data: getAllAiTrained,
      },
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      status: "Failed",
      response: {},
      error: error,
    });
  }
})

export default app;


