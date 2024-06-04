import { NextFunction, Request, Response } from "express";
import { getUser } from "../service/auth.js";
import { ObjectId } from "mongoose";


// Extend Request interface to include token property
declare global {
    namespace Express {
        interface Request {
            user: ObjectId
        }
    }
}

export const restrictToLoggedUserOnly = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.cookies.uid;
    if (!userId) return res.redirect('/ssr/login');
    const user = getUser(userId);

    if (!user) return res.redirect('/ssr/login');
    req.user = user;
    next();
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.cookies.uid;
    const user = getUser(userId);
    req.user = user;
    next();
}