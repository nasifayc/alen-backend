import { Router } from 'express';
const router = Router();
import { getChatHistory, sendMessage } from '../controllers/chat.controllers.js';

router.get('/chat-history', getChatHistory);
router.post('/send-message', sendMessage);

export default router;
