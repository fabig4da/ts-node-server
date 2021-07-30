"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConect = () => {
    mongoose_1.default.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    let { connection: db } = mongoose_1.default;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Conection succesful');
    });
    return mongoose_1.default;
};
exports.default = dbConect;
