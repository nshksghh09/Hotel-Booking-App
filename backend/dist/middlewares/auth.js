"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies["auth-token"];
    console.log(token);
    if (!token) {
        console.log("from first error code");
        return res.status(401).json({ message: "unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "X4TFuGQ8KOEMcTUKmZD2RLvXxQ37cIH5");
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.log("from second error code");
        return res.status(401).json({ message: "unauthorized" });
    }
};
exports.default = verifyToken;
