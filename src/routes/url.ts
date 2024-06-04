import express, { Request, Response } from 'express';
import { handleGenerateShortURL, handleGetAnalytics } from '../controllers/url.js';

export const router = express.Router();

router.post('/', handleGenerateShortURL);

router.get('/analytics/:shortID', handleGetAnalytics)