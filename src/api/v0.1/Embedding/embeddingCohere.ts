import { refactor } from "../services/refactorKnowledgeBase";
import { uploadEmbededModeltoAWS } from "../services/aws/UploadAws";
import { cohere } from "../config/CohereAi";

export async function createEmbeddingCohereAI(
  fileName: string,
  knowledgeSource: any
) {
  try {
    const paras = refactor(fileName, knowledgeSource);

    const embeddingStore: any = {};
    const paraLen = paras.length;
    const date = new Date().getTime();

    

    const response = await cohere.embed({
      texts: paras,
      model: "embed-english-v3.0",
      inputType: "classification",
    });
    const embeddings = response.embeddings as number[][] | any;
    if (embeddings[0].length >= paraLen) {
      for (let i = 0; i < paraLen; i++) {
        embeddingStore["embeds:" + paras[i]] = JSON.stringify({
          embedding: embeddings[i],
          created: date,
        });
      }
    }
    const embededFileUploadedURL = await uploadEmbededModeltoAWS(
      embeddingStore,
      fileName
    );

    return embededFileUploadedURL;
  } catch (error) {
    console.error("Error while generating embeddings:", error);
  }
}
