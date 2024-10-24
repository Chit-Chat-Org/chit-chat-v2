"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refactor = void 0;
function refactor(fileName, knowledgeSource) {
    const text = knowledgeSource;
    let paras = [];
    const rawValue = text.split(/\n\s*\n/);
    for (let i = 0; i < rawValue.length; i++) {
        let rawPara = rawValue[i].trim().replaceAll("\n", " ").replace(/\r/g, "");
        if (rawPara.charAt(rawPara.length - 1) != "?") {
            if (rawPara.split(/\s+/).length >= 5) {
                paras.push(rawPara);
            }
        }
    }
    return paras;
}
exports.refactor = refactor;
