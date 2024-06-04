var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/user.js";
export const handleUserSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    yield User.create({
        name,
        email,
        password
    });
    return res.redirect('/ssr/');
});
export const handleUserLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User.findOne({
        email,
        password
    });
    if (!user)
        return res.render('login', {
            error: "Invalid username or password"
        });
    const sessionId = uuidv4();
    res.cookie('uid', sessionId);
    return res.redirect('/ssr/');
});
