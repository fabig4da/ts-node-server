import User from "../../models/users/user";
import {Request, Response} from 'express';
import { succesfulResponse, unSuccesfulResponse } from "../../helpers/helper";


/**
 * description: Save a new user in the database
 * @param req containes all the data sent from the client
 * @param res used to send respose to the client
 */
export const add = async(req: Request, res: Response)=>{
    
    let {name, lastname, email, password} = req.body;
    const user = new User({
        name,
        lastname,
        email,
        password
    })

    try {
        await user.save();
        succesfulResponse(res, user, 201, 'User created') 
    } catch (error) {
        unSuccesfulResponse(res, {error: 'unknown'}, 500, 'Server error')
    }


}

/**
 * @description get an user by id
 * @param req 
 * @param res 
 */
export const view = async (req: Request, res: Response)=>{
    let {uid} = req.params;

    try {
        const user = await User.findOne({_id:uid});
        if(!user){
            return unSuccesfulResponse(res, {error: 'no found'}, 404)
        }
        succesfulResponse(res, user)       
    } catch (error) {
        unSuccesfulResponse(res, {error: 'unknown'}, 500, 'Server error')
    }
}

