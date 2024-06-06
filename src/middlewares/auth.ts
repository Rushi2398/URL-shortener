import { NextFunction, Request, Response } from "express";
import { getUser } from "../service/auth.js";


// Extend Request interface to include token property
declare global {
    namespace Express {
        interface Request {
            user: {
                user: String,
                iat: String,
                role: string
            }
        }
    }
}

export const restrictToLoggedUserOnly = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.cookies.uid;
    if (!userId) return res.redirect('/ssr/login');
    const user = getUser(userId);

    if (!user) return res.redirect('/ssr/login');
    if (typeof user !== 'string') {
        req.user = user.user;
        next();
    }
}

// export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
//     const userId = req.cookies.uid;
//     const user = getUser(userId);
//     req.user = user!;
//     next();
// }

export const restrictTo = (roles: Array<string>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return res.redirect('/ssr/login');
        if (!roles.includes(req.user.role)) return res.end('Unauthorized');
        next();
    }
}