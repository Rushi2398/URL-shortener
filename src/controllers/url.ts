import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { URL } from "../models/url.js";

export const handleGenerateShortURL = async (req: Request, res: Response) => {
    const body = req.body;

    if (!body) return res.status(400).json({
        error: "URL is required"
    });

    const shortId = nanoid(8);

    await URL.create({
        shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user
    });

    return res.render('home', {
        id: shortId
    });
    // return res.status(200).json({
    //     id: shortId
    // })
}

export const handleGetURL = async (req: Request, res: Response) => {
    const shortId = req.params.shortID;
    const url = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    });
    if (!url) return res.status(400).json({
        error: "Incorrect URL"
    });
    return res.redirect(url.redirectURL);
}

export const handleGetAnalytics = async (req: Request, res: Response) => {
    const shortId = req.params.shortID;
    const result = await URL.findOne({
        shortId
    });
    if (!result) return res.status(400).json({
        error: "Incorrect ID",
    });
    return res.status(200).json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}
