import { CustomValidator} from "express-validator";
import User from "../../models/users/user";

export const emailExist: CustomValidator = async(email: string)=>{
    try {
        const user = await User.findOne({email})
        console.log(user)
        if(user)
            return Promise.reject('Email already exist');
    } catch (error) {
        return Promise.reject('Server error');
    }
}