"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genrateOtp_1 = __importDefault(require("../services/genrateOtp"));
const nodemailer_1 = require("../services/nodemailer");
const JwtAuth_1 = require("../middlewares/JwtAuth");
const router = (0, express_1.Router)();
router.post('/', JwtAuth_1.JwtAuth, async (req, res) => {
    // verify email
    try {
        const { email } = req.body;
        const randomNumber = (0, genrateOtp_1.default)();
        const response = await (0, nodemailer_1.sendMail)({ email, randomNumber });
        if (!response) {
            throw new Error('Error in sending mail');
        }
        return res.status(201).json({ otp: randomNumber, message: "Email has been sent" });
    }
    catch (error) {
        console.log("err", error);
    }
});
exports.default = router;
