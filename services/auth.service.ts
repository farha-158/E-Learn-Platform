
import {registerClientDTO} from '../dto/register.dto'
import {userService} from '../services/user.service'
import bcrypt from "bcrypt"
import AppError from '../shared/errors/app.error'
import {User , SubjectMail} from '../shared/utils/constant.util'
import {statusCode} from '../shared/enums/statusCode.enum'
import {loginClientDTO} from '../dto/login.dto'
import {forgetPasswordDTO} from '../dto/forgetPassword.dto'
import {verifyCodeDTO} from '../dto/verifyCode.dto'
import { sendMail } from './mailService'
export class authService{
    public register = async (dto:registerClientDTO ) => {

            const { name, age, email, password } = dto;

            let checkEmail=await userService.finduser(email)

            if(checkEmail){
                throw new AppError('VALIDATION_ERROR' , statusCode.CONFLICT, [{message:User.USER_FOUND}])
                
            }
            const bcryptPassword= await bcrypt.hash(password, 10)

            userService.createuser({name,age,email,password: bcryptPassword})

            return User.USER_CREATE
    }
    public login=async (dto:loginClientDTO)=>{
        const {email , password} =dto

        let user = await userService.finduser(email)
        if(!user){
            throw new AppError('VALIDATION_ERROR' , statusCode.CONFLICT, [{message:User.USER_NOT_FOUND}])
        }

        let checkPassword=await bcrypt.compare(password,user.password)
        if(!checkPassword){
            throw new AppError('VALIDATION_ERROR' , statusCode.CONFLICT, [{message:User.USER_PASSWORD}])
        }
        return {msg:User.USER_LOGIN,user}
    }

    public forgetPassword=async(dto:forgetPasswordDTO)=>{
        const {email} =dto

        const user =  await userService.finduser(email)
        if(!user){
            throw new AppError('VALIDATION_ERROR' , statusCode.CONFLICT, [{message:User.USER_NOT_FOUND}])
        }

        let code= Math.floor(100000+ Math.random()*900000 ).toString()

        const CE=new Date(Date.now() + 1 * 60 * 1000)

        await userService.updateUserFromCode(user,code,CE)
        const html=`
            <p>Hello ${user.name || ''},</p>
            <p>Your password reset code is:</p>
            <h2>${code}</h2>
            <p>This code will expire in 10 minutes.</p>
        `;

        await sendMail(user.email, 'Password reset code', html);
        console.log(code)
        return SubjectMail.VERIFICATION_EMAIL
    }

    public verifyCode=async(dto:verifyCodeDTO)=>{
        const {email,code} =dto

        const user = await userService.finduser(email)
        if(!user){
            throw new AppError('VALIDATION_ERROR' , statusCode.CONFLICT, [{message:User.USER_NOT_FOUND}])
        }
        // const codeS = code.toString()
        
        if(!user.resetCode || user.resetCode !== code){
            throw new AppError('VALIDATION_ERROR' , statusCode.CONFLICT, [{message:SubjectMail.VERIFICATION_NOT_CORRECT}])
        }

        if(!user.resetCodeExpires || user.resetCodeExpires < new Date()){
            await userService.updateUserFromCode(user,null,null)
            throw new AppError('VALIDATION_ERROR' , statusCode.CONFLICT, [{message:SubjectMail.VERIFICATION_CODE_EXPIRED}])
        }

        await userService.updateUserFromCode(user,null,null)

        return {msg:SubjectMail.VERIFICATION_CORRECT ,user}

    }

}