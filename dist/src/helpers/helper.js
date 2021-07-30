"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.genToken = exports.compoarePassword = exports.encodePassword = exports.unSuccesfulResponse = exports.succesfulResponse = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * @description send a response as answer of a succesful request
 * @param res express response to send a response
 * @param data is a data to send
 * @param code request code
 * @param msg message
 */
const succesfulResponse = (res, data, code = 200, msg = 'Successful') => {
    res.status(code).json({
        ok: true,
        msg,
        data
    });
};
exports.succesfulResponse = succesfulResponse;
/**
 * @description send a response as answer of a unsuccesful request
 * @param res
 * @param error
 * @param code
 * @param msg
 */
const unSuccesfulResponse = (res, errors, code = 500, msg = 'Unsuccessful') => {
    res.status(code).json({
        ok: false,
        msg,
        errors: errors
    });
};
exports.unSuccesfulResponse = unSuccesfulResponse;
/**
 * @description this encode a password
 * @param password type string
 */
const encodePassword = (password) => {
    const round = 10;
    const salt = bcrypt_1.default.genSaltSync(round);
    return bcrypt_1.default.hashSync(password, salt);
};
exports.encodePassword = encodePassword;
/**
 * @description compare a password with a encoded password
 * @param password User password
 * @param hast Password encoded
 * @returns boolean
 */
const compoarePassword = (password, hast) => {
    return bcrypt_1.default.compareSync(password, hast);
};
exports.compoarePassword = compoarePassword;
const genToken = (user) => {
    const secret = process.env.SECRET_WORD_JWT || '';
    return jsonwebtoken_1.default.sign(user, secret, { expiresIn: 20 });
};
exports.genToken = genToken;
const verifyToken = (token) => {
    const secret = process.env.SECRET_WORD_JWT || '';
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
