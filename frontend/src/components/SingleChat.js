import React from "react";
import {ChatState} from "../Context/ChatProvider";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {Box, Text} from "@chakra-ui/layout";
import {getSender, getSenderFull} from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import { Spinner, Formcontrol, Input } from "@chakra-ui/react";
import { sendMessage } from "../../../backend/controllers/messageController";


const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState();

    const toast = useToast()

    const {user, selectedChat, setSelectedChat} = ChatState();
    const fetchMessages = async() => {
        if(!selectedChat) return;
        try {
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`,
                }
            };

            setLoading(true);
            const {data} = await axios.get(`/api/message/${selectedChat._id}`, config);


            console.log(messages);
            setMessages(data);
            setLoading(false);


        } catch (error) {
           toast({
            title: "Error Occured!",
            description: "Failed to Load the Messages",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",

           })
            };
    }

    useEffect(() => {
        fetchMessages();
    }, [selectedChat]);


    const sendMessage = async(event) => {
        if(event.key === "Enter" && newMessage){
            try {
                const config = {
                    headers: {
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${user.token}`,
                    }
                };

                const {data} = await axios.post('/api/message', {
                    content: newMessage,
                    chatId: selectedChat._id,
                },
            config
         );

         console.log(data);

         setNewMessage("");
         setMessages([...messages, data]);

            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",

                });
                
            }
             
        }
    }
    const typingHandler = (e) => {
        setNewMessage(e.target.value);
        //Typing Indicator Logic
    }

    return (<>

        {selectedChat ? (
            <>
            <Text
            fontSize={{ base:"28px", md:"30px"}}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between"}}
            alignItems="center"
            >
                <IconButton
                d={{ base: "flex", md:"none"}}
                icon={<ArrowBackIcon/>}
                onClick={() => setSelectedChat("")}
                />
                {!selectedChat.isGroup ? (
                    <>
                    {getSender(user, selectedChat.users)}
                    <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                    </>
                ) : (
                    <>
                {selectedChat.chatName.toUpperCase()}
                {

                }
                    </>
                )}
            </Text>
            <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
            
            >
                {loading ? (
                    <Spinner
                    size="x1"
                    w={20}
                    h={20}
                    alignSelf="center"
                    margin="auto"
                    />
                ):(
                    <div> {} </div>
                )}
                <Formcontrol onKeyDown={sendMessage} isRequired mt={3} >
                    <Input 
                    varient="filled"
                    bg="E0E0E0"
                    placeholder="Enter a message...."
                    onChange={typingHandler}
                    value={newMessage}
                    > </Input>
                </Formcontrol>

            </Box>
            
            </>
        ):(
            <Box d="flex" alignItems="center" justifyContent="center" h="100%" >
                <Text fontSize="3x1" pb={3} fontFamily="Work sans" >
                    Click on a user to start chatting
                    </Text>
                     </Box>
        )}
        
   </>
 );
};
export default SingleChat;
