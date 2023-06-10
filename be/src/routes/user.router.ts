import { Router } from 'express';
import { verifyToken } from 'use-case/auth-middleware';
import { getCurrentUser } from 'use-case/user/user.ctrl';

const router = Router();
router.get('/get-current-user', verifyToken, getCurrentUser);
router.post('/', verifyToken, getCurrentUser);
router.put('/', verifyToken, getCurrentUser);
router.delete('/', verifyToken, getCurrentUser);
export default router;
