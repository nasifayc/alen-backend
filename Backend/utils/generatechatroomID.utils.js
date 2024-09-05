const generateChatRoomID = (senderID, receiverID) => {
    const ids = [senderID, receiverID].sort();
    return ids.join('_');
};

export default generateChatRoomID;