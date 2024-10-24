import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'

const googleSeceretkey = process.env.GOOGLE_SECERET_KEY

if(!googleSeceretkey){
    throw new Error('Google APIKEY is undefined');
}
const genAI = new GoogleGenerativeAI(googleSeceretkey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
const generationConfig = {
  temperature: 0,
  maxOutputTokens: 8192,
};

export {model, generationConfig};