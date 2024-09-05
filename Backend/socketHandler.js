import * as ChatService from './services/realtimechat.services.js';
import generateChatRoomID from './utils/generatechatroomID.utils.js';

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log(`User Connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id);
        });

        socket.on('joinRoom', async ({ senderID, receiverID }) => {
            const chatroomID = generateChatRoomID(senderID, receiverID);
            socket.join(chatroomID);
            console.log(`User joined room: ${chatroomID}`);
        });

        socket.on('sendMessage', async (data) => {
            try {
              const { senderID, receiverID, message } = data;
              const chatroomID = generateChatRoomID(senderID, receiverID);
              // Call the sendMessage service with correct parameters
              const savedMessage = await ChatService.sendMessage(chatroomID , senderID, receiverID, message);
              console.log(savedMessage)
              // Emit the message to the receiver's room
              io.to(chatroomID).emit('receiveMessage', savedMessage);
              
            } catch (error) {
              console.error('Error sending message:', error);
            }
          });
    });
};

export default socketHandler;
