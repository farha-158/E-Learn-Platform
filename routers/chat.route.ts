
import { Router ,Request ,Response } from 'express'
import {chatController} from '../controller/chat.controller'

export class routerChat{

    router=Router()
    private chatcontroller:chatController

    constructor(){
        this.chatcontroller=new chatController()
        this.initRouter()
    }
    private initRouter=()=>{
        this.router.get('/chat',this.chatcontroller.createChatoropen);
        this.router.get('/chat-page',async(req:Request,res:Response)=>{
            res.render("chat")
        });
        this.router.get('/all-msg/:chatId',this.chatcontroller.allMsgBetweenTwo)
    }
}