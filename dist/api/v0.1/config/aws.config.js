"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Bucket = exports.BUCKET_NAME = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
require("dotenv/config");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secret = process.env.AWS_ACCESS_SECRET;
const bucket = process.env.AWS_BUCKET_NAME;
if (!bucket || !accessKeyId || !secret) {
    throw new Error('bucket || accessKeyId || secret is undefined');
}
aws_sdk_1.default.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secret
});
exports.BUCKET_NAME = bucket;
exports.s3Bucket = new aws_sdk_1.default.S3();
