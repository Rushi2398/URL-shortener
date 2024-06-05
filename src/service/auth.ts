import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const JWT_SECRET = '@34*U@*F#!'

export const setUser = (user: Object) => {
    return jwt.sign({ user }, JWT_SECRET);
}

export const getUser = (token: string) => {
    if (!token) return null;
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}