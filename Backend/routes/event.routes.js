import { Router } from 'express';
const router = Router();

import { createEvent, getEvents, getEventById, updateEvent, deleteEvent, rsvpEvent, unRsvpEvent } from '../controllers/event.controllers.js';

router.post('/createEvent', createEvent);

router.get('/getEvents', getEvents);

router.get('/getEventById', getEventById);

router.put('/updateEvent', updateEvent);

router.delete('/deleteEvent', deleteEvent);

router.post('/rsvpEvent', rsvpEvent);

router.post('/unRsvpEvent', unRsvpEvent);

export default router;


