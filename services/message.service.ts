import {Msg,IMsg} from '../models/message.model'

export class serviceMsg{
    public async addMsg(data:IMsg){
        await Msg.create(data)
        return true
    }
    public async allMsgBetweenTwo(chatId:any){
        const msgs= await Msg.find(chatId)
        return msgs
    }
}