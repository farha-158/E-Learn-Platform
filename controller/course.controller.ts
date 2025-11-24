import courseService from '../services/course.service'
import { Request ,Response  } from 'express'
import { sendRespones } from '../shared/utils/sendResponse.util'
import { statusCode } from '../shared/enums/statusCode.enum'
import instService from '../services/instructor.service'

export class courseController{
  private courseservice:courseService
  private instrserviec:instService

  
  constructor(){
    this.courseservice = new courseService()
    this.instrserviec=new instService()
  }

  public getAllCourse=async(req:Request , res:Response)=>{

    const allcourrse = await this.courseservice.findAllCourse()

    sendRespones(res,statusCode.OK ,{success:true ,data:allcourrse})
  }
  

  public createCourse=async(req:Request , res:Response)=>{
    const dto=req.body
    const img=req.file?.path
    const msg =await this.courseservice.createCourse(dto,img)
    sendRespones(res,statusCode.OK ,{success:true ,data:msg})
  }

  public getCourseWithId=async(req:Request , res:Response)=>{
    const id=req.params.id
    console.log('get',req.params)
    const course=await this.courseservice.findCourse(id)
    sendRespones(res,statusCode.OK ,{success:true ,data:course})
  }
}