import ClientModel from '../models/client.model.js';
import * as chatService from '../services/realtimechat.services.js';
import RealtimeChat from '../models/realtimechat.model.js';


export const sendMessage = async(req,res)=>{
    const {senderID, receiverID , message} = req.body;
    try{
        const savedMessage = await chatService.sendMessage(senderID,receiverID,message);
        res.status(201).json(savedMessage);
    }
    catch(error){
        res.status(500).json({error: 'Failed to send message'});
    }
};

export const getMessages = async(req,res)=>{
    const { chatroomID } = req.params;
    try{
        const messages = await chatService.getMessages(chatroomID);
        res.status(200).json(messages);
    }
    catch (error){
        res.status(500).json({error: 'Failed to get messages'});
    }
};

export const getClientList = async (req, res) => {
    try {
        const { receiverID } = req.params;
        
        // Find all unique senderIDs who have sent messages to the given receiverID
        const uniqueSenderIDs = await RealtimeChat.distinct('senderID', { receiverID });
        const clients = await ClientModel.find({ _id: { $in: uniqueSenderIDs } });
        console.log(clients);
        return res.status(200).json(clients);
    } catch (error) {
        console.error('Error fetching client list:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

