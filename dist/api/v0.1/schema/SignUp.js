"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SignUp = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, 'Please provide your Email'],
        unique: true
    },
    username: {
        type: String,
        require: true,
        maxLength: 20,
        minLength: 5,
    },
    password: {
        type: String,
        require: true,
    }
});
const Signup = mongoose_1.default.model('SignUp', SignUp);
exports.default = Signup;
