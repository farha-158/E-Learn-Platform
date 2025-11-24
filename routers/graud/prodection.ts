import { Request, Response, NextFunction } from "express";
import passport from "passport";

export let product = (req: Request, res: Response, next: NextFunction) => {

  if (!req.cookies|| !req.cookies.token) {
    return res.redirect("/signup"); 
  }

  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error | null, user: any, info: { message?: string } | undefined) => {
      if (err || !user) {
        console.error("Auth error:", info?.message || err);
        return res.redirect("/signup");
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};
