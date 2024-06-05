var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { URL } from '../models/url.js';
export const staticRouter = express.Router();
staticRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.redirect('/ssr/login');
    const allUrls = yield URL.find({ createdBy: req.user });
    return res.render('home', {
        urls: allUrls
    });
}));
staticRouter.get('/signup', (req, res) => {
    res.render('signup');
});
staticRouter.get('/login', (req, res) => {
    res.render('login');
});
