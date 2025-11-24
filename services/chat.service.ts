import {Chat} from '../models/chat.model'

export class serviceChat{
    public async createChat(instrId:any,userId:any){

        const find = await Chat.findOne({instructor:instrId,user:userId})
        if (find) {
            return find
        }
        const chat =await Chat.create({instructor:instrId,user:userId})
        return chat
    }

}