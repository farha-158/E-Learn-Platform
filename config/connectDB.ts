import {connect} from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const connectDB=async()=>{
    try{
        connect(process.env.DB_url!)
    }catch(err){
        console.error('error in DB' , err)
        throw err
    }
}

export default connectDB
