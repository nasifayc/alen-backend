import ChatMessage from '../models/chat.model.js';
import { getReply } from '../services/chat.services.js';

export async function getChatHistory(req, res) {
  const {userId} = req.query;
  try {
    const chatHistory = await ChatMessage.find({userId}).sort({ time: 1 });
    res.status(200).json(chatHistory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function sendMessage(req, res) {
  const {message, userId}  = req.body;
  const userMessage = new ChatMessage({
    userId,
    time: new Date(),
    message: message,
    isSender: true
  });

  try {
    await userMessage.save();
    const replyMessage = await getReply(message);
    const botMessage = new ChatMessage({
      userId,
      time: new Date(),
      message: replyMessage,
      isSender: false
    });
    await botMessage.save();
    res.status(200).json({ reply: replyMessage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

