import { Router } from "express";
import { body } from "express-validator";
import { signIn } from "../../auth/auth";
import { expressValidatorErrors } from "../../middleware/gobals";

const autRoutes : Router = Router();

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
autRoutes.post(
    '/sign-in', 
    [
        body('email').isEmail(),
        body('password').notEmpty(),
        expressValidatorErrors
    ],
    signIn
)

export default autRoutes;