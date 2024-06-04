import express, { Request, Response } from 'express';
import { URL } from '../models/url.js';

export const staticRouter = express.Router();

staticRouter.get('/', async (req: Request, res: Response) => {
    if (!req.user) return res.redirect('/ssr/login');
    const allUrls = await URL.find({ createdBy: req.user });
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
