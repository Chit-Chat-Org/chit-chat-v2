"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SignUp_1 = __importDefault(require("../routers/SignUp"));
const SignIn_1 = __importDefault(require("../routers/SignIn"));
const sendMail_1 = __importDefault(require("../routers/sendMail"));
const app = (0, express_1.Router)();
app.use('/signup', SignUp_1.default);
app.use('/signin', SignIn_1.default);
app.use('/send-email', sendMail_1.default);
exports.default = app;
