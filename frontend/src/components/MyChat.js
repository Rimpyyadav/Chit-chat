import React from "react";
import React, {useState} from "react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = () => {
    const [loggedUser, setLoggedUser] = useState(); 
    const { selectedChat,setSelectedChat, user, chats, setChats  } = ChatState();

    const toast = useToast({
        title: "Error Occured",
        description: "Failed to Load the chats",
    });

    return <div>My Chats</div>
}

export default MyChats;
