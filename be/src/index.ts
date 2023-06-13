import Koa from 'koa';
import Router from '@koa/router';
import { get_routes, post_routes, delete_routes } from 'route';
import { createConnection } from 'typeorm';
import bodyParser from 'koa-bodyparser';
import { syncAllRouter } from 'database/sync_all_router';
import 'reflect-metadata';

const app = new Koa();
const router = new Router({
    prefix: '/api',
});
createConnection()
    .then(async (connection) => {
        app.use(bodyParser());
        app.use(router.routes()).use(router.allowedMethods());

        get_routes.map(({ name: name, path: path, ctrl: ctrl }) => router.get(name, path, ctrl));
        post_routes.map(({ name: name, path: path, ctrl: ctrl }) => router.post(name, path, ctrl));
        delete_routes.map(({ name: name, path: path, ctrl: ctrl }) => router.delete(name, path, ctrl));

        app.listen(process.env.SERVER_PORT, () => {
            console.log('Server started on port ' + process.env.SERVER_PORT);
            syncAllRouter(router, connection);
        });
    })
    .catch((error: any) => console.log('TypeORM connection error:', error));
