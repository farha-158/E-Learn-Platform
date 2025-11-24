import {serviceChat} from '../services/chat.service'
import {serviceMsg} from '../services/message.service'
import { Request, Response } from "express";
import { sendRespones } from '../shared/utils/sendResponse.util'
import { statusCode } from '../shared/enums/statusCode.enum'
import { cached } from 'zod/v4/core/util.cjs';

export class chatController{
    private servicechat:serviceChat
    private servicemsg:serviceMsg

    constructor(){
        this.servicechat=new serviceChat()
        this.servicemsg= new serviceMsg()
    }

    public createChatoropen=async (req:Request,res:Response)=>{

        const {instrId , userId} =req.query

        const chat=await this.servicechat.createChat(instrId,userId)

        sendRespones(res,statusCode.OK,{success:true ,data:chat})
    }

    public allMsgBetweenTwo=async(req:Request,res:Response)=>{
        const {chatId}=req.params
        const msgs=await this.servicemsg.allMsgBetweenTwo(chatId)
        sendRespones(res,statusCode.OK,{success:true ,data:msgs})

    }
}