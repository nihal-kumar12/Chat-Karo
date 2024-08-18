import React, { useEffect, useState } from 'react';
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessage, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            if (selectedConversation && selectedConversation._id) {
                try {
                    const res = await axios.get(`/message/get/${selectedConversation._id}`);
                    setMessage(res.data);
                } catch (error) {
                    console.error("Error in getting messages:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // Ensure loading is set to false if no conversation is selected
            }
        };

        getMessages();
    }, [selectedConversation, setMessage]); // Removed `messages` from dependencies

    return { loading, messages };
};

export default useGetMessage;
