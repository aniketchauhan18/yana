"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../src/config");
const authenticateJwt = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    // req.headers.authorization?.split(' ')
    if (!token)
        return res.status(401).json({ message: "No Token provided" });
    const verifyToken = jsonwebtoken_1.default.verify(token, config_1.SECRET_KEY);
    if (!verifyToken)
        return res.status(401).json({ message: "Invaldi jwt" });
    console.log(verifyToken);
    next();
};
exports.authenticateJwt = authenticateJwt;
