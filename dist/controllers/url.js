var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { nanoid } from "nanoid";
import { URL } from "../models/url.js";
export const handleGenerateShortURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (!body)
        return res.status(400).json({
            error: "URL is required"
        });
    const shortId = nanoid(8);
    yield URL.create({
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
});
export const handleGetURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shortId = req.params.shortID;
    const url = yield URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    });
    if (!url)
        return res.status(400).json({
            error: "Incorrect URL"
        });
    return res.redirect(url.redirectURL);
});
export const handleGetAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shortId = req.params.shortID;
    const result = yield URL.findOne({
        shortId
    });
    if (!result)
        return res.status(400).json({
            error: "Incorrect ID",
        });
    return res.status(200).json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
});
