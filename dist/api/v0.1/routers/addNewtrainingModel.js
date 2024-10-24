"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RetriveAws_1 = require("../services/aws/RetriveAws");
const embeddingCohere_1 = require("../Embedding/embeddingCohere");
const embeddingOpenAI_1 = require("../Embedding/embeddingOpenAI");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateApiKey_1 = require("../services/generateApiKey");
const Train_schema_1 = __importDefault(require("../schema/Train.schema"));
const app = (0, express_1.Router)();
app.post('/', async (req, res) => {
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
        const fileName = newAITrainingModel.uploadKnowledge.substring(newAITrainingModel.uploadKnowledge.lastIndexOf("/") + 1);
        const knowledgeSource = await (0, RetriveAws_1.RetriveDataAws)(`uploads/${fileName}`);
        console.log({ fileName, knowledgeSource });
        let embeddedFileData;
        if (embeddingModel == "OpenAI") {
            embeddedFileData = await (0, embeddingOpenAI_1.createEmbeddingOpenAI)(fileName, knowledgeSource);
        }
        else {
            embeddedFileData = await (0, embeddingCohere_1.createEmbeddingCohereAI)(fileName, knowledgeSource);
        }
        if (!embeddedFileData) {
            throw Error("Error in creating embedding file");
        }
        newAITrainingModel.embeddedKnowlege = embeddedFileData.embededFileLocation;
        const { organizationName, embeddedKnowlege } = newAITrainingModel;
        newAITrainingModel.originalAPIKey = (0, generateApiKey_1.generateApiKey)({
            organizationName,
            embeddedKnowlege,
        });
        newAITrainingModel.apiKey = await bcrypt_1.default.hash(newAITrainingModel.originalAPIKey, 10);
        console.log({ newAITrainingModel });
        const AiTrainedModel = await Train_schema_1.default.create(newAITrainingModel);
        res.json({
            status: "Success",
            response: {
                data: AiTrainedModel,
            },
        });
    }
    catch (error) {
        console.log("Error", error);
        res.json({
            status: "Failed",
            response: {},
            error: error.message,
        });
    }
});
app.get('/', async (req, res) => {
    try {
        const userIdFromQuery = req.query.UserId;
        if (!userIdFromQuery) {
            return res.json({
                status: "Failed",
                response: {},
                error: "UserId query parameter not found",
            });
        }
        const getAllAiTrained = await Train_schema_1.default.find({ userId: userIdFromQuery });
        res.json({
            status: "Success",
            response: {
                data: getAllAiTrained,
            },
        });
    }
    catch (error) {
        console.log("Error", error);
        res.json({
            status: "Failed",
            response: {},
            error: error,
        });
    }
});
exports.default = app;
