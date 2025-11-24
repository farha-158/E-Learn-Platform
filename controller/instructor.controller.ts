import instService from '../services/instructor.service'
import { Request,Response } from 'express'
import { sendRespones } from '../shared/utils/sendResponse.util'
import { statusCode } from '../shared/enums/statusCode.enum'
import expresshandler from "express-async-handler"

class instrController{
    private instservice:instService

    constructor(){
        this.instservice=new instService()
    }
    public createInstructor=expresshandler (async(req:Request,res:Response)=>{

        const dto=req.body 

        const  profileImage=req.file?.path 
        const Inst=await this.instservice.createInst(dto,profileImage)
        
        sendRespones(res,statusCode.OK,{success:true , data:Inst})
    })
    public getInstWithId=async(req:Request,res:Response)=>{
        const id=req.params.id
        const inst=await this.instservice.instructorwithid(id)
        sendRespones(res,statusCode.OK,{success:true , data:inst})
    }
}

export default instrController