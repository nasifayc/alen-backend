import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    chatroomID: {
        type: String,
        required: true,
    },
    senderID: {
        type: String,
        required: true,
    },
    receiverID: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const ChatModel = mongoose.model('RealtimeChat', chatSchema);

export default ChatModel;
