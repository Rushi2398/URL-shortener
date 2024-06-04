import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/user.js";
import { setUser } from "../service/auth.js";

export const handleUserSignup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect('/ssr/');
}

export const handleUserLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password
    });
    if (!user) return res.render('login', {
        error: "Invalid username or password"
    });
    const sessionId = uuidv4();
    setUser(sessionId, user._id)
    res.cookie('uid', sessionId);
    return res.redirect('/ssr/');
}