import { Schema ,model,Document,Types} from "mongoose"
import { levelCourse} from '../shared/enums/levelCourse.enum'
import {languageCourse} from '../shared/enums/languageCourse.enum'

export interface ICourse extends Document{
  name:string,
  instructor:Types.ObjectId,
  releaseDate:Date,
  price:number
  description:string
  thumbnailImage:string
  videoCount:number
  courseDuration:number
  language:string
  level:string
}

const courseSchema=new Schema<ICourse>({
  name:{type:String, require},
  instructor:{type:Schema.Types.ObjectId , ref:'Instructor'},
  releaseDate:{type:Date , default:Date.now()},
  price:Number,
  description:String,
  thumbnailImage:String,
  videoCount:Number,
  courseDuration:Number,
  language:{type:String , enum:languageCourse , default:languageCourse.ENGLISH},
  level:{type:String , enum:levelCourse,default:levelCourse.BEGINNER}
})

export const Course=model<ICourse>('course',courseSchema)
