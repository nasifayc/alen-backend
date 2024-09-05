import db from 'mongoose';

const {Schema} = db;
const chatSchema = new Schema({
  userId: {type:String , required:true},
  time: { type: Date, required: true },
  message: { type: String, required: true },
  isSender: { type: Boolean, required: true }
});

const ChatMessage = db.model('ChatMessage', chatSchema);

export default ChatMessage

