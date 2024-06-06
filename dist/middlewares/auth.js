import { getUser } from "../service/auth.js";
export const restrictToLoggedUserOnly = (req, res, next) => {
    const userId = req.cookies.uid;
    if (!userId)
        return res.redirect('/ssr/login');
    const user = getUser(userId);
    if (!user)
        return res.redirect('/ssr/login');
    if (typeof user !== 'string') {
        req.user = user.user;
        next();
    }
};
// export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
//     const userId = req.cookies.uid;
//     const user = getUser(userId);
//     req.user = user!;
//     next();
// }
export const restrictTo = (roles) => {
    return (req, res, next) => {
        if (!req.user)
            return res.redirect('/ssr/login');
        if (!roles.includes(req.user.role))
            return res.end('Unauthorized');
        next();
    };
};
