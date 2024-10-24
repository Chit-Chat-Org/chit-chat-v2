"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const papaparse_1 = __importDefault(require("papaparse"));
const aws_config_1 = require("../config/aws.config");
const urlToText_1 = __importDefault(require("../services/urlToText"));
const app = (0, express_1.Router)();
app.post("/", async (req, res) => {
    try {
        // Check if a file was uploaded
        if (req.files && req.files.file) {
            const file = req.files.file;
            // Process the file based on its mimetype
            if (file.mimetype === "application/pdf") {
                let data = await (0, pdf_parse_1.default)(file.data);
                let textContent = data.text;
                file.name = file.name.replace(".pdf", ".txt");
                file.data = Buffer.from(textContent, "utf8");
                file.mimetype = "text/plain";
            }
            else if (file.mimetype === "text/csv") {
                const parsedData = papaparse_1.default.parse(file.data.toString("utf8"));
                const jsonData = JSON.stringify(parsedData.data, null, 2);
                file.name = file.name.replace(".csv", ".txt");
                file.data = Buffer.from(jsonData, "utf8");
                file.mimetype = "text/plain";
            }
            else {
                return res.json({
                    status: "Failed",
                    message: "Unsupported file type",
                });
            }
            aws_config_1.s3Bucket.putObject({
                Bucket: aws_config_1.BUCKET_NAME,
                Key: "uploads/" + file.name,
                Body: file.data,
                ContentType: file.mimetype,
            }, async (err, data) => {
                if (err) {
                    console.log({ err });
                    return res.json({
                        status: "Failed",
                        message: "File upload failed",
                        error: err.message,
                    });
                }
                else {
                    return res.json({
                        status: "Success",
                        message: "File uploaded successfully",
                        data: {
                            tag: data,
                            url: `https://${aws_config_1.BUCKET_NAME}.s3.ap-south-1.amazonaws.com/uploads/${file.name}`,
                        },
                    });
                }
            });
        }
    }
    catch (error) {
        res.json({
            status: "Failed",
            message: "File Upload Failed",
            error: error.message,
        });
    }
});
app.post('/url', async (req, res) => {
    try {
        const { resource_url } = req.body;
        console.log(req.body.resource_url);
        const extractedText = await (0, urlToText_1.default)(resource_url);
        const fileName = resource_url.replace(/(^\w+:|^)\/\//, '').replace(/\//g, '_') + ".txt";
        aws_config_1.s3Bucket.putObject({
            Bucket: aws_config_1.BUCKET_NAME,
            Key: "uploads/" + fileName,
            Body: extractedText,
            ContentType: 'text/plain',
        }, async (err, data) => {
            if (err) {
                console.log({ err });
                return res.json({
                    status: "Failed",
                    message: "File upload failed",
                    error: err.message,
                });
            }
            else {
                return res.json({
                    status: "Success",
                    message: "File uploaded successfully",
                    data: {
                        tag: data,
                        url: `https://${aws_config_1.BUCKET_NAME}.s3.ap-south-1.amazonaws.com/uploads/${fileName}`,
                    },
                });
            }
        });
    }
    catch (error) {
        res.json({
            status: "Failed",
            message: "File Upload Failed",
            error: error.message,
        });
    }
});
exports.default = app;
