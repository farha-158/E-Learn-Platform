import nodemailer from 'nodemailer'
import AppError from '../shared/errors/app.error'

import {statusCode} from '../shared/enums/statusCode.enum'
import dotenv  from 'dotenv';
dotenv.config()

export let sendMail = async(to:string,subject:string, html:string)=>{
    try{
        let transport=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        })

        const mailOption={
            from: `'E-Learn Platform' <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        }
        await transport.sendMail(mailOption)
        console.log('email send successful')

    }catch (error) {
        console.error("Error sending email:", error); 
        throw new AppError('ERROR SEDING' , statusCode.CONFLICT, [{ error}])
    }

}