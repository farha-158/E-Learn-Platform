import { Schema , model , Document, Types } from "mongoose";

export interface IMsg extends Document {
    senderId:Types.ObjectId,
    message:string,
    chatId:Types.ObjectId,
    createdAt?:Date
}

const messageSchema = new Schema<IMsg>({
    senderId: {
        type: Schema.Types.ObjectId,
        required: true,
    },

    message: {
        type: String,
        required: true,
    },

    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export const Msg=model<IMsg>('message',messageSchema)