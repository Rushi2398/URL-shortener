import express from 'express';
import { handleUserLogin, handleUserSignup } from '../controllers/user.js';
export const userRouter = express.Router();
userRouter.post('/', handleUserSignup);
userRouter.post('/login', handleUserLogin);
