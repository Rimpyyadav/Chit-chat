import { ViewIcon } from "@chakra-ui/icons";
import { FormControl, IconButton } from "@chakra-ui/react";
import {useDisclosure} from "@chakra-ui/hooks"
import React, { useState } from "react";
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, Box,  Spinner, Button,Input,} from "@chakra-ui/react";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import axios from 'axios';



const UpdateGroupChatModal = ({fetchAgain, setFetchAgain, fetchMessages}) => {
    const {isOpen, onOpen, onClose} = useDisclosure() 
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameloading] = useState(false);
    const toast = useToast();
    const {selectedChat, setSelectedChat, user} = ChatState();

    const handleRemove = async(user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
            toast({
              title: "Only admins can remove someone!",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
          }
      
          try {
            setLoading(true);
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
            const { data } = await axios.put(
              `/api/chat/groupremove`,
              {
                chatId: selectedChat._id,
                userId: user1._id,
              },
              config
            );
      
            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
          } catch (error) {
            toast({
              title: "Error Occured!",
              description: error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setLoading(false);
          }
          setGroupChatName("");
        };

        const handleAddUser = async (user1) => {
          if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
              title: "User Already in group!",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
          }
      
          if (selectedChat.groupAdmin._id !== user._id) {
            toast({
              title: "Only admins can add someone!",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
          }
      
          try {
            setLoading(true);
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
            const { data } = await axios.put(
              `/api/chat/groupadd`,
              {
                chatId: selectedChat._id,
                userId: user1._id,
              },
              config
            );
      
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
          } catch (error) {
            toast({
              title: "Error Occured!",
              description: error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setLoading(false);
          }
          setGroupChatName("");
        };

    const handleRename = async() => {
        if(!groupChatName) return
        try{
            setRenameloading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.put('/api/chat/rename', {
                chatId: selectedChat._id,
                chatName: groupChatName,
            },
            );

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameloading(false);
            
                } catch (error) {
                    toast({
                        title: "Error Occured!",
                        description: error.response.data.message,
                        status : "error",
                        isClosable: true,
                        position: "bottom",
                    });
                    setRenameloading(false);

                }
                setGroupChatName("");
         };
      
     const handleSearch = async(query) => {
                setSearch(query);
                if (!query) {
                    return;
                }
        
                try {
                    setLoading(true);
        
                    const config = {
                        headers: {
                            Authorizaton: `Bearer $(user.token)`,
                        }
        
                    };
                    const {data} = await axios.get(`/api/user?search${search}`, config);
                    console.log(data);
                    setSearchResult(data);
                } catch (error) {
                    toast({
                        title: "Error Occured!",
                        description: "Failed to load the Search Results",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom-left",
        
                    })
                }
        
         };

    return (
        <>
          <IconButton d={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}>Open Modal</IconButton>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box>
                    {selectedChat.users.map(u => {
                        <UserBadgeItem
                        key={user._id}
                        user={u}
                        handleFunction={() => handleRemove(u)}
                        />
                    })}
                </Box>
                <FormControl d="flex" >
                    <Input
                    placeholder="Chat Name"
                    mb={3}
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                    />
                    <Button
                    variant="solid"
                    colorScheme="teal"
                    ml={1}
                    isLoading={renameloading}
                    onClick={handleRename}
                    >
                    Update
                    /</Button>
                </FormControl>
                <FormControl>
                    <Input
                    placeholder="Add User to group"
                    mb={1}
                    onChange={(e) => handleSearch(e.target.value)}
                    />
                </FormControl>
                { loading ? (
                    <Spinner size="lg" />
                ) : (
                    searchResult?.map((user) => (
                        <UserListItem 
                        key={user._id}
                        user={user}
                        handleFunction={() => handleAddUser(user)}
                        />
                    ))
                )}
              </ModalBody>
    
              <ModalFooter>
                <Button onClick={() => handleRemove(user)} colorScheme="red">
                  Leave Group
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
};
export default UpdateGroupChatModal;