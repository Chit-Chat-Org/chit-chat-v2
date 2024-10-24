"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiKey = void 0;
const crypto_1 = __importDefault(require("crypto"));
require("dotenv/config");
const secretKey = process.env.secretKey;
if (!secretKey) {
    throw new Error('Secret key is missing!');
}
const salt = crypto_1.default.randomBytes(16);
const key = crypto_1.default.scryptSync(secretKey, salt, 32);
const generateApiKey = (data) => {
    const dataString = JSON.stringify(data);
    const iv = crypto_1.default.randomBytes(16);
    const cipher = crypto_1.default.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(dataString, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + encrypted;
};
exports.generateApiKey = generateApiKey;
