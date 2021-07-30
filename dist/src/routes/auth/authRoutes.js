"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../../auth/auth");
const gobals_1 = require("../../middleware/gobals");
const autRoutes = express_1.Router();
/**
 * @swagger
 * components:
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: token
 */
/**
 * @openapi
 * tags:
 *  - name: auth
 *    description: Everything about users
 *    externalDocs:
 *
 */
/**
 * @openapi
 * /sign-in:
 *   post:
 *     summary: Sign in
 *     tags:
 *      - auth
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *            type: object
 *            properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *     responses:
 *       200:
 *         description: User save successfuly.
 *       500:
 *         description: server error
 */
autRoutes.post('/sign-in', [
    express_validator_1.body('email').isEmail(),
    express_validator_1.body('password').notEmpty(),
    gobals_1.expressValidatorErrors
], auth_1.signIn);
exports.default = autRoutes;
