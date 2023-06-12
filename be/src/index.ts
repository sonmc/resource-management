import Koa from 'koa';
import Router from '@koa/router';
import { get_routes, post_routes, delete_routes } from 'route';
import { createConnection } from 'typeorm';
import bodyParser from 'koa-bodyparser';
import { syncAllRouter } from 'database/sync_all_router';
const app = new Koa();
const router = new Router({
    prefix: '/api',
});
createConnection()
    .then(async (connection) => {
        app.use(bodyParser());
        app.use(router.routes()).use(router.allowedMethods());

        get_routes.map(({ path: path, ctrl: ctrl }) => router.get(path, ctrl));
        post_routes.map(({ path: path, ctrl: ctrl }) => router.post(path, ctrl));
        delete_routes.map(({ path: path, ctrl: ctrl }) => router.delete(path, ctrl));

        app.listen(5000, () => {
            console.log('Server started on port 5000');
            syncAllRouter(router, connection);
        });
    })
    .catch((error: any) => console.log('TypeORM connection error:', error));
