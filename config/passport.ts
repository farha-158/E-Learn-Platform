import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import type { Profile } from "passport-google-oauth20";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Request } from "express";
import { User } from "../models/user.model";
import dotenv from "dotenv";
import {userService} from '../services/user.service'
dotenv.config();


const cookieExtractor=(req:Request)=>{
  let token=null
  if(req && req.cookies){
    token = req.cookies['token']
  }
  return token
}

const opts={
  jwtFromRequest:cookieExtractor,
  secretOrKey:process.env.SECRET as string
}

passport.use(new JwtStrategy(opts,async(payload,done)=>{
  try{
    const user=await userService.finduserWithId(payload.userId)
    if(user){
      return done(null,user)
    }
    return done(null,false)

    }catch(err){
      return done(err,null)
    }
}))

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      callbackURL: "http://localhost:5000/auth/google/callback", 
      passReqToCallback: true, 
    },
    async (
      request: Express.Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void
    ) => {
      try {
        let user = await userService.finduser(profile.emails?.[0].value || "")

        if (!user) {
          user = await userService.createuser({
            name: profile.displayName,
            email: profile.emails?.[0].value,
            password: "google_oauth_user",
            age: 0,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
