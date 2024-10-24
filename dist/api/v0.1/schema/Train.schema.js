"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const trainModel = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "SignUp",
    },
    organizationName: {
        type: String,
        required: true,
    },
    uploadKnowledge: {
        type: String,
        required: true,
    },
    embeddingModel: {
        type: String,
        required: true
    },
    embeddedKnowlege: {
        type: String,
        required: true,
    },
    apiKey: {
        type: String,
        required: true,
    },
    originalAPIKey: {
        type: String,
        required: true,
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const AiTrainingModel = mongoose_1.default.model("OrganizationAITrainedKnwoledge", trainModel);
exports.default = AiTrainingModel;
