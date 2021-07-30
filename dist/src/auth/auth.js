"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authApiKey = exports.siginGoogle = exports.signIn = void 0;
const helper_1 = require("../helpers/helper");
const user_1 = __importDefault(require("../models/users/user"));
/**
 * @description validates if user and password exist also match
 * @param req
 * @param res
 * @returns
 */
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (user) {
            let match = helper_1.compoarePassword(password, user.password);
            if (match) {
                user.lastConected = Date.now();
                yield user.save();
                return helper_1.succesfulResponse(res, { user, token: helper_1.genToken({ uid: user._id }) }, 200);
            }
        }
        return helper_1.unSuccesfulResponse(res, { error: 'user or password incorret' }, 400);
    }
    catch (error) {
        console.log(error);
        return helper_1.unSuccesfulResponse(res, { error: 'Server error' });
    }
});
exports.signIn = signIn;
const siginGoogle = (req, res) => {
    const { idToken } = req.body;
};
exports.siginGoogle = siginGoogle;
const authApiKey = (req, res, next) => {
    const token = req.header('token') || '';
    if (token) {
        try {
            // console.log(token)
            let response = helper_1.verifyToken(token);
            if (response)
                return next();
        }
        catch (error) {
            return helper_1.unSuccesfulResponse(res, { error: 'forbidden ' }, 403, 'Su token es invalido o ha caducado');
        }
    }
    helper_1.unSuccesfulResponse(res, { error: 'forbidden ' }, 403);
};
exports.authApiKey = authApiKey;
