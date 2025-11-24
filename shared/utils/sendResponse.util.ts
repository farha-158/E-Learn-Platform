import { Response } from "express"
import {statusCode} from '../enums/statusCode.enum'

interface IAPIResponse{
    success:boolean,
    message?:string|null
    data?:any
    error?:any

}

export const sendRespones=(res:Response,statusCode:statusCode,response:IAPIResponse)=>{
    res.status(statusCode||500).json({...response})
}
