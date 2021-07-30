import {validationResult} from 'express-validator';
import {Request, Response} from 'express';
import { unSuccesfulResponse } from '../helpers/helper';




export const expressValidatorErrors = (req: Request, res: Response, next:any)=>{
    const errors = validationResult(req);
    if(errors.isEmpty())
        return next()
    return unSuccesfulResponse(res, errors);
}