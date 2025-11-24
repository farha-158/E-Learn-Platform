import {model, Document, Schema } from "mongoose";

export interface IInstructor extends Document {
    name: string
    email:string
    specialization:string
    country:string
    profileImage:string
    experienceYear:number
}

const instructerSchema = new Schema<IInstructor>({
    name: { type: String, required: true },
    email:{ type: String, required: true },
    specialization:{ type: String, required: true },
    country:{ type: String, required: true },
    profileImage:{ type: String, required: true },
    experienceYear:{ type: Number, required: true }
});

export const Instructor = model<IInstructor>("instructor", instructerSchema);

