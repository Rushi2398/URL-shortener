import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { router } from './routes/url.js';
import { staticRouter } from './routes/staticRouter.js';
import { userRouter } from './routes/user.js';
import { connectMongoDB } from './connection.js';
import { handleGetURL } from './controllers/url.js';
import { logFunction } from './middlewares/log.js';
import { restrictToLoggedUserOnly } from './middlewares/auth.js';

const app = express();
const PORT = 8001;

connectMongoDB('mongodb://127.0.0.1:27017/url-shortener');

// server-side rendering : view engine needs to be set
app.set("view engine", "ejs");
app.set("views", path.resolve('./dist/views'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRouter);
app.use('/url', restrictToLoggedUserOnly, router);
app.use('/ssr', staticRouter);

app.use(logFunction("log.txt"));

app.get('/:shortID', handleGetURL);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))