import { Router } from 'express';
const router = Router();

import { registerInstitution, loginInstitution } from '../controllers/institution.controllers.js';

router.post('/registerInstitution', registerInstitution);
router.post('/loginInstitution', loginInstitution);

export default router;