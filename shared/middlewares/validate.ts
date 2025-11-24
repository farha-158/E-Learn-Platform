import { ZodObject , ZodRawShape , ZodError} from "zod";
import { Request, Response , NextFunction} from "express";
import AppError from '../errors/app.error'
import { statusCode } from "../enums/statusCode.enum";

export const validate=(schema:ZodObject<ZodRawShape>)=>
    (req:Request,res:Response, next:NextFunction ) => {
        try{
            schema.parse({
                body:req.body,
                query:req.query,
                params:req.params
            })
            next()

        }catch(err){
            if(err instanceof ZodError){
                throw new AppError(
                    'VALIDATION_ERROR',
                    statusCode.BAD_REQUEST,
                    err.issues
                );
            } 
            next(err)
        }
    }