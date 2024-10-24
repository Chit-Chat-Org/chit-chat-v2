import { refactor } from "../services/refactorKnowledgeBase";
import { uploadEmbededModeltoAWS } from "../services/aws/UploadAws";
import { openai } from '../config/openAI'

export async function createEmbeddingOpenAI(
  fileName: string,
  knowledgeSource: any
) {
  try {
    const paras = refactor(fileName, knowledgeSource);

    const embeddingStore: any = {};
    const paraLen = paras.length;
    const date = new Date().getTime();

    

    const response = await openai.embeddings.create({
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
    const embededFileUploadedURL = await uploadEmbededModeltoAWS(
      embeddingStore,
      fileName
    );

    return embededFileUploadedURL;
  } catch (error) {
    console.error("Error while generating embeddings:", error);
  }
}
