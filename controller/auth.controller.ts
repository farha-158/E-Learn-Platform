import {authService} from '../services/auth.service'
import {sendMail} from '../services/mailService'
import {sendRespones} from '../shared/utils/sendResponse.util'
import {statusCode} from '../shared/enums/statusCode.enum'
import jwt from 'jsonwebtoken'
import expresshandler from "express-async-handler"

import dotenv  from 'dotenv';
dotenv.config()

import { Request, Response , NextFunction} from "express";

class AuthController{

    private authserver:authService

    constructor(){
        this.authserver=new authService()
    }

    public register = expresshandler(async (req:Request,res:Response,next:NextFunction ) => {
            const dto=req.body

            const message =await this.authserver.register(dto)

            sendRespones(res,statusCode.OK,{ success: true, data: { message } })
    })

    public login = expresshandler(async (req:Request,res:Response,next:NextFunction ) =>{
        const dto=req.body
        const {msg,user} =await this.authserver.login(dto)

        const token = jwt.sign(
            { userId: user._id},
            process.env.SECRET as string,
            { expiresIn: "3h" }
        );
        
        res.cookie('token',token,{maxAge: 60 * 1000 *60 * 3,httpOnly:true})

        sendRespones(res,statusCode.OK,{ success:true,data:{msg,userId: user._id}})
    })
    
    public loginWithGoogleCallBack= expresshandler(
            (req:Request,res:Response)=>{
                if(!req.user){
                    res.redirect('/login')
                }
                let user = req.user as any

                const token = jwt.sign(
                    { userId: user._id},
                    process.env.SECRET as string,
                    { expiresIn: "3h" }
                );
                
                res.cookie('token',token,{maxAge: 60 * 1000 *60 * 3,httpOnly:true})

                res.redirect('/')
            }
    )

    public forgetPassword=expresshandler(async(req:Request,res:Response)=>{
        const dto=req.body

        const msg=await this.authserver.forgetPassword(dto)
        sendRespones(res,statusCode.OK,{ success:true,data:{msg}})
    })

    public verifyCode=expresshandler(async(req:Request,res:Response)=>{
        const dto =req.body
        const {msg,user}=await this.authserver.verifyCode(dto)
        const token = jwt.sign(
                { userId: user._id},
                process.env.SECRET as string,
                { expiresIn: "3h" }
        );
                
        res.cookie('token',token,{maxAge: 60 * 1000 *60 * 3,httpOnly:true})
        sendRespones(res,statusCode.OK,{ success:true,data:{msg}})

    })

}

export default AuthController


