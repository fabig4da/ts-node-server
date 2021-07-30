"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../../auth/auth");
const user_1 = require("../../controllers/users/user");
const gobals_1 = require("../../middleware/gobals");
const userMiddleware_1 = require("../../middleware/users/userMiddleware");
const userRoutes = express_1.Router();
/**
 * @openapi
 * tags:
 *  - name: user
 *    description: Everything about users
 *    externalDocs:
 *      url: http://docs.my-api.com/pet-operations.htm
 */
/**
 * @openapi
 * /user:
 *   post:
 *     summary: Creates a user
 *     tags:
 *      - user
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User save successfuly.
 *       500:
 *         description: server error
 */
userRoutes.post('/user', [
    express_validator_1.body('name', 'name is required').notEmpty().isString(),
    express_validator_1.body('lastname', 'lastname is required').notEmpty().isString(),
    express_validator_1.body('email', 'ivalid email').notEmpty().isEmail().custom(userMiddleware_1.emailExist),
    express_validator_1.body('password', 'password must combine lowcase, uppercase, expecial charaters').notEmpty().isString().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
    gobals_1.expressValidatorErrors
], user_1.add);
/**
 * @openapi
 * /user/{uid}:
 *   get:
 *     summary: Find user by user id
 *     tags:
 *      - user
 *     security:
 *      - ApiKeyAuth: [read]
 *     parameters:
 *      - in: path
 *        name: uid
 *        required: true
 *      - in: header
 *        name: token
 *        required: true
 *     responses:
 *       200:
 *         description: User save successfuly.
 *         content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: server error
 */
userRoutes.get('/user/:uid', auth_1.authApiKey, user_1.view);
exports.default = userRoutes;
