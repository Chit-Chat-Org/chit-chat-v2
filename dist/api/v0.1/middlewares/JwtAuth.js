"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JwtAuth = (req, res, next) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        return res.status(500).send("Server Error");
    }
    const auth_token = req.headers.authorization;
    const token = auth_token === null || auth_token === void 0 ? void 0 : auth_token.split(" ")[1];
    console.log({ token });
    // Check if the token is present
    if (!token) {
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    try {
        // Decode the token
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        // Check if the decoded object has a userId property
        if (decoded && decoded.userId) {
            // Attach user data to the request object
            req.body.userId = decoded.userId;
            next();
        }
        else {
            return res.status(401).json({ error: "Unauthorized - Invalid token" });
        }
    }
    catch (error) {
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
};
exports.JwtAuth = JwtAuth;
