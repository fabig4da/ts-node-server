import { Request, Response } from "express";
import { compoarePassword, genToken, succesfulResponse, unSuccesfulResponse, verifyToken } from "../helpers/helper";
import User from "../models/users/user";


/**
 * @description validates if user and password exist also match
 * @param req 
 * @param res 
 * @returns 
 */
export const signIn = async(req: Request, res: Response)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if(user){
            let match = compoarePassword(password, user.password);
            if(match){
                user.lastConected = Date.now();
                await user.save()
                let data = {
                    user, 
                    token:genToken({uid:user._id})
                }
                return succesfulResponse(res, data, 200 )

            }
        }
        return unSuccesfulResponse(res, {error: 'user or password incorret'}, 400);
    } catch (error) {
        console.log(error)
        return unSuccesfulResponse(res, {error: 'Server error'});
    }
}

export const siginGoogle = async (req: Request, res: Response)=>{
    const {idToken} = req.body;
    try {
        let {name, email, img} = await verifyGoogleToken(idToken);
        let user = await User.findOne({email});
        if(user && user.active){
            let data = {
                user, 
                token:genToken({uid:user._id})
            }
            succesfulResponse(res, data, 200)
        }
    } catch (error) {
        
    }
    
}





export const authApiKey = (req: Request, res: Response, next: any)=>{
    const token : string = req.header('token') || '';
    if(token){
        try {
            // console.log(token)
            let response = verifyToken(token);
            if(response)
                return next();
        } catch (error) {
            return unSuccesfulResponse(res, {error: 'forbidden '}, 403, 'Su token es invalido o ha caducado')
        }
    }
    unSuccesfulResponse(res, {error: 'forbidden '}, 403)
}