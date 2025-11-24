import { User, IUser } from "../models/user.model";

export class userService {

    static async finduser(email:string){
        let user=await User.findOne({email})
        return user
    }
    static async finduserWithId(id:string){
        let user=await User.findById(id)
        return user
    }

    static async createuser(data:Partial<IUser>){
        let user = await User.create(data)
        return user
    }
    static async updateUserFromCode(user:IUser ,code:string | null, codeE : Date | null){
        user.resetCode=code,
        user.resetCodeExpires=codeE
        await user.save()

    }
}