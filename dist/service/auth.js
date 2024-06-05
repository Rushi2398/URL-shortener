import jwt from 'jsonwebtoken';
const JWT_SECRET = '@34*U@*F#!';
export const setUser = (user) => {
    return jwt.sign({ user }, JWT_SECRET);
};
export const getUser = (token) => {
    if (!token)
        return null;
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (error) {
        return null;
    }
};
