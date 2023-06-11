import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import { Router } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from 'routes/auth.router';
import userRouter from 'routes/user.router';

const app = express();
const router = Router();
router.use('/auth', authRouter);
router.use('/users', userRouter);

createConnection()
    .then(async () => {
        app.use(express.json());
        app.use(cookieParser());
        app.use(
            cors({
                allowedHeaders: ['Content-Type'],
                credentials: true,
                origin: ['http://localhost:4200'],
            })
        );
        // captureRouters(router);
    })
    .catch((error) => console.log(error));
app.listen(5000, '0.0.0.0', () => {
    console.log('server running on port 5000');
});

function captureRouters(router: any) {
    const routers: any[] = [];

    // app._router.stack.forEach((middleware: any) => {
    //     if (middleware) {
    //         if (middleware.methods && middleware.methods.length > 0) {
    //             const routeHandler = middleware.stack[0];
    //             routers.push({
    //                 endpoint: middleware.path,
    //                 funtion_name: routeHandler.name,
    //             });
    //         }
    //     }
    // });

    // routers.forEach((path) => {
    //     console.log(path);
    // });
}
