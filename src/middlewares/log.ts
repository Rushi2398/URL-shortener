import { NextFunction, Request, Response } from "express";
import fs from 'fs';

export const logFunction = (fileName: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fs.appendFile(fileName,
            `\n${Date.now()}: ${req.method}: ${req.path}`,
            () => next()
        )
    }
}