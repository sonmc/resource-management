import expressListEndpoints from 'express-list-endpoints';
import { getAllRouter } from 'util/router.util';
import permService from 'service/perm.service';
import app from 'index';

export function syncAllPerm() {
    const capturedRoutes = expressListEndpoints(app);
    const routers = getAllRouter(capturedRoutes);
    permService.updateFromRouter(routers);
}

syncAllPerm();
