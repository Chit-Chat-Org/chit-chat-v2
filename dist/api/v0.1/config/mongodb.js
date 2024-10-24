"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is undefined');
}
const MongoDb = mongoose_1.default.connect(MONGODB_URI).then(() => console.log("Connected to mongoDb !")).catch(err => console.log(err));
exports.default = MongoDb;
