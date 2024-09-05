import { Router } from 'express';
const router = Router();

import { registerClient, loginClient, addJournal, getJournals, updateJournal, deleteJournal } from '../controllers/client.controllers.js';

router.post('/registerClient', registerClient);
router.post('/loginClient', loginClient);

router.post('/addJournal', addJournal);
router.get('/getJournals', getJournals);
router.put('/updateJournal', updateJournal);
router.delete('/deleteJournal', deleteJournal);

export default router;