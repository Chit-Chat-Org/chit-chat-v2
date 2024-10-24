"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Organization = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'SignUp'
    },
    OrganizationName: {
        type: String,
        requireq: true,
        unique: true
    },
    OrganizationWebsite: {
        type: String,
        requireq: true,
        unique: true
    },
    OrganizationPhone: {
        type: Number,
        requireq: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        requireq: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const OrganizationModel = mongoose_1.default.model("Organization", Organization);
exports.default = OrganizationModel;
