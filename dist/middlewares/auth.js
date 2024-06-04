import { getUser } from "../service/auth.js";
export const restrictToLoggedUserOnly = (req, res, next) => {
    const userId = req.cookies.uid;
    if (!userId)
        return res.redirect('/ssr/login');
    const user = getUser(userId);
    if (!user)
        return res.redirect('/ssr/login');
    req.user = user;
    next();
};
