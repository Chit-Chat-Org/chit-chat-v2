"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmbeddingCohereAI = void 0;
const refactorKnowledgeBase_1 = require("../services/refactorKnowledgeBase");
const UploadAws_1 = require("../services/aws/UploadAws");
const CohereAi_1 = require("../config/CohereAi");
async function createEmbeddingCohereAI(fileName, knowledgeSource) {
    try {
        const paras = (0, refactorKnowledgeBase_1.refactor)(fileName, knowledgeSource);
        const embeddingStore = {};
        const paraLen = paras.length;
        const date = new Date().getTime();
        const response = await CohereAi_1.cohere.embed({
            texts: paras,
            model: "embed-english-v3.0",
            inputType: "classification",
        });
        const embeddings = response.embeddings;
        if (embeddings[0].length >= paraLen) {
            for (let i = 0; i < paraLen; i++) {
                embeddingStore["embeds:" + paras[i]] = JSON.stringify({
                    embedding: embeddings[i],
                    created: date,
                });
            }
        }
        const embededFileUploadedURL = await (0, UploadAws_1.uploadEmbededModeltoAWS)(embeddingStore, fileName);
        return embededFileUploadedURL;
    }
    catch (error) {
        console.error("Error while generating embeddings:", error);
    }
}
exports.createEmbeddingCohereAI = createEmbeddingCohereAI;
