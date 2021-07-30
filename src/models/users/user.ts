import mongoose, {Schema}from 'mongoose';
import { compoarePassword, encodePassword } from '../../helpers/helper';


/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              lastname:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *          required:
 *              -name
 *              -lastname
 *              -email
 *              -password
 */

let userSchema : Schema = new Schema({
    name : {
        type: String,
        required: true,
    },
    lastname : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    lastConected:{
        type: Date,
        required: false,
    }
})



userSchema.pre('save', function(next){
    if(this.isModified('password')){
        const password = encodePassword(this.get('password'));
        this.set('password', password);
    }
    next();
})


export default mongoose.model('user', userSchema);