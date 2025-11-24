import { Router,Request,Response } from "express";
import instrController from '../controller/instructor.controller'
import { upload } from "../services/multer";
import {validate} from '../shared/middlewares/validate'
import {instructorSchema} from '../dto/instructor.dto'

class instrRouter{
    router=Router()
    private instrcontroller:instrController

    constructor(){
        this.instrcontroller=new instrController()
        this.initRouter()
    }

    private initRouter=()=>{
        this.router.get('/addInstructor',(req:Request,res:Response)=>{
            res.render('addInstructor')
        })
        this.router.post('/addInstructor'
            ,upload.single('profileImage')
            ,validate(instructorSchema)
            ,this.instrcontroller.createInstructor)
            
        this.router.get('/instructor/api/:id',this.instrcontroller.getInstWithId)
        this.router.get('/instructor/:Iid/:Uid',(req:Request,res:Response)=>{

            res.render('instrId',{Iid:req.params.Iid ,Uid:req.params.Uid })
        })

        }
        
}

export default instrRouter