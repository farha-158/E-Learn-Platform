import { Schema , model } from "mongoose";

const schemaChat = new Schema({
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export const Chat = model('Chat', schemaChat);
