"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./auth/authRoutes"));
const user_1 = __importDefault(require("./users/user"));
const routes = express_1.default();
routes.use(user_1.default);
routes.use(authRoutes_1.default);
exports.default = routes;
