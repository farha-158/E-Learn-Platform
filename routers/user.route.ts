
import AuthController from '../controller/auth.controller'
import passport from 'passport'
import {product} from './graud/prodection'
import {registerClientSchema} from '../dto/register.dto'
import { loginClientSchema } from '../dto/login.dto'
import {forgetPasswordSchema} from '../dto/forgetPassword.dto'
import {verifyCodeSchema} from '../dto/verifyCode.dto'
import {validate} from '../shared/middlewares/validate'
import dotenv  from 'dotenv';
dotenv.config()
import {Router, Request ,Response } from 'express'

class authRouter{
    public router= Router()
    private authcontroller : AuthController

    constructor(){
        this.authcontroller=new AuthController()
        this.initRouter()
    }
    private initRouter=()=>{
        this.router.post('/signup',validate(registerClientSchema),this.authcontroller.register)

        this.router.get('/signup',(req:Request,res:Response)=>{
            res.render('signup')
        })
        this.router.get('/course',product,(req:Request,res:Response)=>{
            res.send(`hello course`)
        })
        this.router.get('/login',(req:Request,res:Response)=>{
            res.render('login')
        })

        this.router.post('/login',validate(loginClientSchema),this.authcontroller.login)

        this.router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

        this.router.get('/auth/google/callback',passport.authenticate('google', { failureRedirect: '/login',session:false }),this.authcontroller.loginWithGoogleCallBack)

        this.router.get("/forgot-password",(req:Request,res:Response)=>{res.render('forgot-password')})

        this.router.post("/forgot-password",validate(forgetPasswordSchema),this.authcontroller.forgetPassword)

        this.router.get('/verify-code' ,(req:Request,res:Response)=>{ 
            const {email}=req.query
            res.render('verify-code',{email})
        })

        this.router.post('/verify-code',validate(verifyCodeSchema),this.authcontroller.verifyCode)

    }
}

export default authRouter