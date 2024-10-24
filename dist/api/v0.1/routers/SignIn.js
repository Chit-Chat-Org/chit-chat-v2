"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SignUp_1 = __importDefault(require("../schema/SignUp"));
const HashedPassword_1 = require("../services/HashedPassword");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey)
        return res.status(500).send("Server Error");
    // fetching credentials
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ error: "Missing username or password" });
    try {
        // finding data in database
        let user = await SignUp_1.default.findOne({ username });
        if (!user)
            return res.status(404).json("User not found");
        // compare passwords - bcrypt
        const isPasswordValid = (0, HashedPassword_1.compareHashedPassword)(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Wrong credentials!" });
        }
        console.log(user._id);
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, secretKey, {
            expiresIn: "7d",
        });
        return res.status(200).json({
            id: user._id,
            username: user.username,
            token,
            message: "Login successful",
        });
    }
    catch (error) {
        console.log("Oops! Some error Occurs.", error);
    }
});
exports.default = router;
