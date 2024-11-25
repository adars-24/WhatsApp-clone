import Message from '../models/Message.js';

import Conversation from '../models/Conversation.js';


export const newMessage = async (request, response) => {
    
console.log(request.body);


    const newMessage = new Message(request.body);
    try {
        console.log('blabla')
        await newMessage.save();
       
        await Conversation.findByIdAndUpdate(request.body.conversationId, { message: request.body.text });
        console.log('amannnnnnnnn')
        response.status(200).json("Message has been sent successfully");
    } catch (error) {
        console.log(error);
        response.status(500).json(error.message);
    }

}

export const getMessage = async (request, response) => {
    try {
        const messages = await Message.find({ conversationId: request.params.id });
        response.status(200).json(messages);
    } catch (error) {
        response.status(500).json(error);
    }

}