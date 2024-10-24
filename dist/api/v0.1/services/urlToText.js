"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const html_to_text_1 = require("html-to-text");
// fetch HTML content from a URL
async function fetchHTML(url) {
    try {
        const response = await axios_1.default.get(url);
        return response.data;
    }
    catch (error) {
        throw new Error(`Unable to fetch HTML content from ${url}: ${error}`);
    }
}
async function extractTextFromURL(url) {
    try {
        const html = await fetchHTML(url);
        const text = (0, html_to_text_1.convert)(html, {
            wordwrap: 130,
        });
        return text;
    }
    catch (error) {
        console.error(error);
    }
}
exports.default = extractTextFromURL;
// const url = 'https://stcet.ac.in';
// extractTextFromURL(url)
//     .then(text => console.log(text))
//     .catch(error => console.error(error));
