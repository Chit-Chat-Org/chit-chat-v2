"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openai = void 0;
const openai_1 = require("openai");
require("dotenv/config");
const openai_api = process.env.OPENAI_API__KEY;
if (!openai_api)
    throw new Error('OpenAi Api Not Found !');
exports.openai = new openai_1.OpenAI({ apiKey: openai_api });
