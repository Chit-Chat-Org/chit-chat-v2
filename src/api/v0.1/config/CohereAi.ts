import { CohereClient } from "cohere-ai";
import "dotenv/config";

export const cohere = new CohereClient({
  token: process.env.COHERE_AI,
});
