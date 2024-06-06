import express, { Request, Response } from 'express';
import { URL } from '../models/url.js';
import { restrictToLoggedUserOnly, restrictTo } from '../middlewares/auth.js';

export const staticRouter = express.Router();

staticRouter.get('/admin/', restrictToLoggedUserOnly, restrictTo(["ADMIN"]), async (req: Request, res: Response) => {
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls
    })
});

staticRouter.get('/', restrictToLoggedUserOnly, restrictTo(["NORMAL", "ADMIN"]), async (req: Request, res: Response) => {
    const allUrls = await URL.find({ createdBy: req.user.user });
    return res.render('home', {
        urls: allUrls
    })
});

staticRouter.get('/signup', (req: Request, res: Response) => {
    res.render('signup');
});

staticRouter.get('/login', (req: Request, res: Response) => {
    res.render('login');
})
