import { Router } from 'express';
const router = Router();

import { authenticateToken } from '../middleware/authenticateToken.middleware.js';
import { logout, verifyToken } from '../controllers/auth.controllers.js';

router.post('/logout', authenticateToken, logout);
router.post('/verify-token', authenticateToken, verifyToken);

export default router;