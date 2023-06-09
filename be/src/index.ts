import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import mainRouter from 'router';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        allowedHeaders: ['Content-Type'],
        credentials: true,
        origin: ['http://localhost:4200'],
    })
);
createConnection()
    .then(async () => {
        app.use(mainRouter);
    })
    .catch((error) => console.log(error));
app.listen(5000, '0.0.0.0', () => console.log('server running on port 5000'));
export default app;
