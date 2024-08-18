import React, { useState } from 'react';
import useConversation from '../zustand/useConversation.js';
import axios from 'axios';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessage, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await axios.post(
                `/message/send/${selectedConversation._id}`,
                { message }
            );
            setMessage(prevMessages => [...prevMessages, res.data]);
        } catch (error) {
            console.error("Error sending message:", error);
            // Optionally set an error state or display a notification
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
};

export default useSendMessage;
