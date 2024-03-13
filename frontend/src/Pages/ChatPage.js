import React, { useEffect } from 'react';
import axios from "axios";

const ChatPage = () => { 
    const fetchChats = async () => {
        const data = await axios.get("/api/chat");
        console.log(data);
    };

    useEffect(() => {
        fetchChats();       
    }, []);

    return <div>chat page</div>;
};

export default ChatPage;
