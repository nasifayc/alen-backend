import ChatModel from "../models/realtimechat.model.js";
import generateChatRoomID from "../utils/generatechatroomID.utils.js";

export const sendMessage = async (chatroomID,senderID, receiverID, message)=>{
    try{

        const newMessage = new ChatModel({
            chatroomID,
            senderID,
            receiverID,
            message,
            timestamp: new Date().toISOString()
        });
        await newMessage.save();

        return newMessage;;
    }
    catch(error){
        console.error('Error saving message',error);
        throw error;
    }
};

export const getMessages = async(chatroomID) =>{
    try{
        // const chatRoomID = generateChatRoomID(senderID,recieverID);
        const messages = await ChatModel.find({chatroomID}).sort({timestamp:1});
        return messages;
    }
    catch(error){
        console.error('Error fetching messages:', error);
        throw error
    }
}