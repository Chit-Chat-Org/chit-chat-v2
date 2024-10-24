"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generationConfig = exports.model = void 0;
const generative_ai_1 = require("@google/generative-ai");
require("dotenv/config");
const googleSeceretkey = process.env.GOOGLE_SECERET_KEY;
if (!googleSeceretkey) {
    throw new Error('Google APIKEY is undefined');
}
const genAI = new generative_ai_1.GoogleGenerativeAI(googleSeceretkey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
exports.model = model;
const generationConfig = {
    temperature: 0,
    maxOutputTokens: 8192,
};
exports.generationConfig = generationConfig;
