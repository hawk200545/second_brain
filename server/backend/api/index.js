"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const middleware_1 = __importDefault(require("../src/middleware"));
const user_1 = require("../src/user");
const content_1 = require("../src/content");
const share_1 = require("../src/share");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "token"],
}));
app.use((0, express_2.json)());
app.use("/api/v1", user_1.user_route); // User Route doesn't need a middleware
app.use("/api/v1/brain", share_1.link_route);
app.use(middleware_1.default); // Adding middleware for verification of jwt and parsing the userId
app.use("/api/v1", content_1.content_route);
app.listen(3000, () => console.log("Server ready on port 3000."));
exports.default = app; //for vercel serverless
