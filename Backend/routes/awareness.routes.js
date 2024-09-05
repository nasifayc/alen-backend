import { Router } from 'express';
const router = Router();

import { createAwareness, getAwarenesses, getAwarnessById, updateAwareness, deleteAwareness } from '../controllers/awareness.controllers.js';

router.post('/createAwareness', createAwareness);

router.get('/getAwarenesses', getAwarenesses);

router.get('/getAwarnessById', getAwarnessById);

router.put('/updateAwareness', updateAwareness);

router.delete('/deleteAwareness', deleteAwareness);

export default router;