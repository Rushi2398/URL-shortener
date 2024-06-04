import fs from 'fs';
export const logFunction = (fileName) => {
    return (req, res, next) => {
        fs.appendFile(fileName, `\n${Date.now()}: ${req.method}: ${req.path}`, () => next());
    };
};
