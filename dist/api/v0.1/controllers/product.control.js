"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadToAws_1 = __importDefault(require("../routers/uploadToAws"));
const newOrganization_1 = __importDefault(require("../routers/newOrganization"));
const addNewtrainingModel_1 = __importDefault(require("../routers/addNewtrainingModel"));
const QnARetrieval_1 = __importDefault(require("../routers/QnARetrieval"));
const app = (0, express_1.Router)();
app.use('/upload', uploadToAws_1.default);
app.use('/newOrganization', newOrganization_1.default);
app.use('/addAiTrainingModel', addNewtrainingModel_1.default);
app.use('/QnARetrieval', QnARetrieval_1.default);
exports.default = app;
