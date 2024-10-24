"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHashedPassword = exports.hashPassword = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const hashPassword = (password) => {
    // hashing logic using crypto-js
    const hashedPassword = crypto_js_1.default.SHA256(password).toString(crypto_js_1.default.enc.Hex);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
const compareHashedPassword = (inputPassword, hashedPassword) => {
    // comparison logic using crypto-js
    const inputHash = crypto_js_1.default.SHA256(inputPassword).toString(crypto_js_1.default.enc.Hex);
    return inputHash === hashedPassword;
};
exports.compareHashedPassword = compareHashedPassword;
