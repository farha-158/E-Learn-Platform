
import AppError from '../errors/app.error'
import { Response,Request , NextFunction } from 'express'
import {serverError} from '../utils/constant.util'
import {sendRespones} from '../utils/sendResponse.util'


export const errorHandler=(err:AppError ,req:Request, res:Response,next:NextFunction)=>{
    if (err){
        return sendRespones(res ,
            err.statusCode || 500,
            {success:false, 
                message:err.message || serverError.SERVER_ERROR , 
                error:err.error
            })
    }
    next()

}