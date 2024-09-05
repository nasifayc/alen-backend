import express from 'express';
import * as chatController from '../controllers/realtimechat.controllers.js';

const router = express.Router();

router.post('/sendMessage', chatController.sendMessage);
router.get('/getMessages/:chatroomID', chatController.getMessages);
router.get('/clients/:receiverID', chatController.getClientList);

export default router;
