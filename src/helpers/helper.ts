import { Response } from "express";
import bcrypt from 'bcrypt';
import jwt, { verify } from 'jsonwebtoken';

/**
 * @description send a response as answer of a succesful request
 * @param res express response to send a response 
 * @param data is a data to send
 * @param code request code
 * @param msg message
 */
export const succesfulResponse = (res: Response, data:object, code = 200, msg='Successful')=>{
    res.status(code).json({
        ok: true,
        msg,
        data
    })
} 




/**
 * @description send a response as answer of a unsuccesful request
 * @param res 
 * @param error 
 * @param code 
 * @param msg 
 */
export const unSuccesfulResponse = (res: Response, errors:object, code = 500, msg='Unsuccessful')=>{
    res.status(code).json({
        ok: false,
        msg,
        errors: errors
    })
} 





/**
 * @description this encode a password
 * @param password type string
 */
export const encodePassword = (password: string)=>{
    const round : number = 10;
    const salt = bcrypt.genSaltSync(round);
    return bcrypt.hashSync(password, salt);
}




/**
 * @description compare a password with a encoded password
 * @param password User password
 * @param hast Password encoded
 * @returns boolean
 */
export const compoarePassword = (password: string, hast: string)=>{
    return bcrypt.compareSync(password, hast);
}



export const genToken = (user:object)=>{
    const secret : string = process.env.SECRET_WORD_JWT || '';
    return jwt.sign(user, secret, {expiresIn: 20});
}


export const verifyToken = (token: string)=>{
    const secret : string = process.env.SECRET_WORD_JWT || '';
    return jwt.verify(token, secret);
}