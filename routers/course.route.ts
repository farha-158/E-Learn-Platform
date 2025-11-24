import {product} from './graud/prodection'
import { courseController } from '../controller/course.controller'
import {languageCourse} from '../shared/enums/languageCourse.enum'
import {levelCourse} from '../shared/enums/levelCourse.enum'
import { Router ,Request ,Response } from 'express'
import instService from '../services/instructor.service'
import { upload } from '../services/multer'
import {validate} from '../shared/middlewares/validate'
import {courseSchema} from '../dto/course.dto'
import expresshandler from "express-async-handler"

const a= new instService()

class courseRouter{
    router=Router()
    private coursecontroller:courseController


    constructor(){
        this.coursecontroller=new courseController()

        this.initRouter()
    }

    private initRouter=()=>{
        
        this.router.get('/api',this.coursecontroller.getAllCourse)
        this.router.get('/api/:id',this.coursecontroller.getCourseWithId)        
        
        this.router.get('/:userId',product,async(req:Request,res:Response)=>{
            console.log(req.params.userId)
            res.render('course(home)',{userId:req.params.userId})
        })

        this.router.get('/course/:Cid/:Uid',product,async(req:Request,res:Response)=>{
            res.render('courseid',{ Cid:req.params.Cid , Uid:req.params.Uid })
        })


        this.router.get('/addCourse',async(req:Request,res:Response)=>{
            let b=await a.findallInst()
            res.render('addCourse',{language:Object.values(languageCourse),level:Object.values(levelCourse),b:b})
        },)

        this.router.post('/addCourse',upload.single('thumbnailImage'),validate(courseSchema),this.coursecontroller.createCourse)

    }
}

export default courseRouter