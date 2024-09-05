import { Router } from 'express';
const router = Router();

import { registerAdmin, loginAdmin } from '../controllers/admin.controllers.js';

router.post('/registerAdmin', registerAdmin);
router.post('/loginAdmin', loginAdmin);

export default router;