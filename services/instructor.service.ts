import {Instructor,IInstructor} from '../models/instructor.model'
import {insructorDTO} from '../dto/instructor.dto'
import AppError from '../shared/errors/app.error'
import { statusCode } from '../shared/enums/statusCode.enum'
import {instructor} from '../shared/utils/constant.util'

class instService{
    public async findallInst () {
        const allInst=await Instructor.find({},{name:1,email:1})

        return allInst 
    }

    public async createInst(dto:insructorDTO,profileImage?:string ){

        const {name , email , specialization,country,experienceYear}=dto
        const cInstr=await Instructor.findOne({email})
        if(cInstr){
            throw new AppError('VALIDATION_ERROR' , statusCode.CONFLICT, [{message:instructor.INSTRUCTOR_FOUND}])
        }

        await Instructor.create({name ,email , specialization ,country ,profileImage, experienceYear })
        return instructor.INSTRUCTOR_CREATE
    }

    public async instructorwithid(id:any){
        const instructor= await Instructor.findById(id)
        return instructor
    }
}

export default instService