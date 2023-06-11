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
app.listen(5000, '0.0.0.0', () => {
    captureRouters();
    console.log('server running on port 5000');
});
export default app;

function captureRouters() {
    const routers: any[] = [];
    console.log(app._router.stack);
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
