import React from "react";
import {AddIcon} from "@chakra-ui/icons"
import {useToast} from "@chakra-ui/toast";
import axios from "axios";
import {useEffect, useState} from "react";
//import {getSender} from "../config/ChatLogics";
import GroupChatModal from "./miscellanous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import React, {useState} from "react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState(); 
    const { selectedChat,setSelectedChat, user, chats, setChats  } = ChatState();

    const toast = useToast({
        title: "Error Occured",
        description: "Failed to Load the chats",
        
    });

    const fetchChats = async() => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer $(user.token)`,
                }
            }

            const {data} = await axios.get("/api/chat",config);
            setChats(data);
        } catch(error) {
            toast({
                title: "Error Occured!!!",
                description: "Failed to load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();

    }, [fetchAgain]);

    return (
        <Box 
        d={{ base:selectedChat ? "none": "flex", md: "flex"}}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
     >
        <Box 
        pb={3}
        px={3}
        fontSize={{base: "28px", md:"30px"}}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        >
            My chats
            <GroupChatModal>
                <Button
                d="flex"
                fontSize={{base:"17px", md:"10px", lg:"17px"}}
                rightIcon={<AddIcon/>}
                >New Group Chat </Button>
            </GroupChatModal>
        </Box>
        <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        borderRadius="lg"
        overflowY="hidden"
        
        >
             {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                  
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};
export default MyChats;