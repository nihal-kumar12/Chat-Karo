import React, { useEffect } from 'react';
import { useSocketContext } from './SocketContext';
import useConversation from '../zustand/useConversation';
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessage } = useConversation();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            const notification = new Audio(sound);
            notification.play();
            setMessage((prevMessages) => [...prevMessages, newMessage]);
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket, setMessage]);

    // No need to return anything here
};

export default useGetSocketMessage;
