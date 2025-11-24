import {model,Document,Schema} from "mongoose";

export interface IUser extends Document {
    name: string;
    age: number;
    email: string;
    password: string;
    resetCode: string | null;
    resetCodeExpires: Date | null;
}



let userSchema = new Schema({
    name:{type:String,required: true},
    age: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    resetCode: { type: String, default: null },
    resetCodeExpires: { type: Date, default: null },
}, { timestamps: false })

export let User=model<IUser>('user',userSchema)

