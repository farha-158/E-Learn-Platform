import {Course,ICourse} from '../models/course.model'
import { courseDTO } from '../dto/course.dto'
import {course} from '../shared/utils/constant.util'

class courseService{
    public async createCourse(data:courseDTO,thumbnailImage?:string){
        const {name , instructor,releaseDate,price,description,videoCount,courseDuration,language,level} =data
        await Course.create({name , instructor,releaseDate,price,description,thumbnailImage,videoCount,courseDuration,language,level})
        return course.COURSE_CREATE
    }
    public async findAllCourse(){
        const allcourse=await Course.find()
        return allcourse
    }
    public async findCourse(id:any){
        const course=await Course.findById(id)
        return course
    }

}

export default courseService