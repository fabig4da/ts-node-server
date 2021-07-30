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
exports.view = exports.add = void 0;
const user_1 = __importDefault(require("../../models/users/user"));
const helper_1 = require("../../helpers/helper");
/**
 * description: Save a new user in the database
 * @param req containes all the data sent from the client
 * @param res used to send respose to the client
 */
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, lastname, email, password } = req.body;
    const user = new user_1.default({
        name,
        lastname,
        email,
        password
    });
    try {
        yield user.save();
        helper_1.succesfulResponse(res, user, 201, 'User created');
    }
    catch (error) {
        helper_1.unSuccesfulResponse(res, { error: 'unknown' }, 500, 'Server error');
    }
});
exports.add = add;
/**
 * @description get an user by id
 * @param req
 * @param res
 */
const view = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { uid } = req.params;
    try {
        const user = yield user_1.default.findOne({ _id: uid });
        if (!user) {
            return helper_1.unSuccesfulResponse(res, { error: 'no found' }, 404);
        }
        helper_1.succesfulResponse(res, user);
    }
    catch (error) {
        helper_1.unSuccesfulResponse(res, { error: 'unknown' }, 500, 'Server error');
    }
});
exports.view = view;
