"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmbeddingOpenAI = void 0;
const refactorKnowledgeBase_1 = require("../services/refactorKnowledgeBase");
const UploadAws_1 = require("../services/aws/UploadAws");
const openAI_1 = require("../config/openAI");
async function createEmbeddingOpenAI(fileName, knowledgeSource) {
    try {
        const paras = (0, refactorKnowledgeBase_1.refactor)(fileName, knowledgeSource);
        const embeddingStore = {};
        const paraLen = paras.length;
        const date = new Date().getTime();
        const response = await openAI_1.openai.embeddings.create({
            input: paras,
            model: "text-embedding-ada-002",
        });
        if (response.data.length >= paraLen) {
            for (let i = 0; i < paraLen; i++) {
                embeddingStore["embeds:" + paras[i]] = JSON.stringify({
                    embedding: response.data[i].embedding,
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
exports.createEmbeddingOpenAI = createEmbeddingOpenAI;
