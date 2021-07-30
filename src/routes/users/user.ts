import {Router} from 'express';
import { body } from 'express-validator';
import { authApiKey } from '../../auth/auth';
import {add, view} from '../../controllers/users/user';
import { expressValidatorErrors } from '../../middleware/gobals';
import { emailExist } from '../../middleware/users/userMiddleware';

const userRoutes :Router = Router();

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
userRoutes.post('/user',[
    body('name', 'name is required').notEmpty().isString(),
    body('lastname', 'lastname is required').notEmpty().isString(),
    body('email', 'ivalid email').notEmpty().isEmail().custom(emailExist),
    body('password', 'password must combine lowcase, uppercase, expecial charaters').notEmpty().isString().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
    expressValidatorErrors
], add);


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
userRoutes.get('/user/:uid',authApiKey, view);


export default userRoutes;