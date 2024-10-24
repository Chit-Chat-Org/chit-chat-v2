"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Org_schema_1 = __importDefault(require("../schema/Org.schema"));
const app = (0, express_1.Router)();
app.post("/", async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.json({
                status: "Failed",
                response: {},
                error: "Not Authenticated !",
            });
        }
        const newOrganization = await Org_schema_1.default.create({
            userId: userId,
            OrganizationName: req.body.OrganizationName,
            OrganizationWebsite: req.body.OrganizationWebsite,
            OrganizationPhone: req.body.OrganizationPhone,
            isActive: req.body.isActive,
        });
        res.json({
            status: "Success",
            response: {
                data: newOrganization,
            },
        });
    }
    catch (error) {
        console.log("Error:", error);
        res.json({
            status: "Failed",
            response: {},
            error: error.message,
        });
    }
});
app.get("/", async (req, res) => {
    try {
        const userIdFromQuery = req.query.UserId;
        if (!userIdFromQuery) {
            return res.json({
                status: "Failed",
                response: {},
                error: "UserId query parameter not found",
            });
        }
        const allOrg = await Org_schema_1.default.find({
            userId: userIdFromQuery,
        });
        res.json({
            status: "Success",
            response: {
                data: allOrg,
            },
        });
    }
    catch (error) {
        res.json({
            status: "Failed",
            response: {},
            error: error.message,
        });
    }
});
exports.default = app;
