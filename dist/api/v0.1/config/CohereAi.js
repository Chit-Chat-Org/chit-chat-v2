"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cohere = void 0;
const cohere_ai_1 = require("cohere-ai");
require("dotenv/config");
exports.cohere = new cohere_ai_1.CohereClient({
    token: process.env.COHERE_AI,
});
