import { Router } from 'express';
import { login, refreshToken, logout } from 'use-case/auth/auth.ctrl';
import { verifyToken } from 'use-case/auth-middleware';
import { getCurrentUser } from 'use-case/user/user.ctrl';

const router = Router();

router.post('/login', login);
router.get('/logout', verifyToken, logout);
router.get('/refresh', verifyToken, refreshToken);
router.get('/get-current-user', verifyToken, getCurrentUser);

export default router;
