"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// console.log(process.env.NODEMAILER_EMAIL)
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: 'apurvjha1234@gmail.com',
        pass: 'gvll jrjs jyyb pfqh',
    },
});
const sendMail = ({ email, randomNumber }) => {
    const html = `
<h1>Welcome to our ChatBot AI</h1>
<p>Your OTP Is ${randomNumber}</p>
`;
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "One Time Password",
        html: html,
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                resolve(false);
            }
            else {
                console.log("Email sent: " + info.response);
                resolve(true);
            }
        });
    });
};
exports.sendMail = sendMail;
