import React, { useState } from 'react';
import { Box, Tooltip,Text, MenuButton,Menu, MenuItem, MenuDivider, DrawerOverlay, DrawerHeader, DrawerBody,Input,useToast } from '@chakra-ui/react';
import {Button} from "@chakra-ui/button";
import {Avatar} from "@chakra-ui/avatar"
import { BellIcon, ChevronDownIcon} from "@chakra-ui/icons";
import ProfileModal from './ProfileModal';
import {useHistory} from "react-router-dom";



const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const {user, setSeletedChat, chats, setChats} = ChatState();
    const history = useHistory();;

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.pushState("/");
    };

    const toast = useToast()

    const handleSearch = async() => {

        if(!search) {
            toast({
                title: "Please Enter somthing in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position : "top-left",
            });
            return;
        }
   

    try {
        setLoading(true);
        const config = {
            headers:{
            Authorization: `Bearer ${user.token}`,
        }
    };


    const {data} = await axios.get(`/api/user?search=${search}`,config);

    setLoading(false);
    setLoading(data);

   }   catch(error){
    toast({
        title: "Error Occured!",
        description: "Failed to load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",

    });
    }
    
};

const accessChat = async (userId) => {
    try{
        setLoadingChat(true)

        const config = {
            headers:{
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        };
        const{ data } = await axios.post("/api/chat",{userId}, config);
        setSeletedChat(data);
        setLoadingChat(false);
        onClose();

    }catch(error){
        toast({
            title: "Error fetching the chat",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",

    })

    }

}
     
 
    return (
        <>
            <Box>
                <Tooltip label="Search Users to chat" hasArrow placeContent="bottom-end">
                    <Button>
                        <i className="fas fa-search"></i>
                        <Text display={{ base: "none", md: "flex" }} px="4">
                            Search User
                        </Text>
                    </Button>
                </Tooltip>

                <Text fontSize="2xl" fontFamily="Work-sans" >
                    Talk-A-Tive

                </Text>

                <div>
                    <Menu>
                        <MenuButton p={1} >
                            <BellIcon fontSize="2xl" m={1} />

                        </MenuButton>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} >
                            <Avatar size="sm" cursor='pointer' name={user.name} />

                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user} >
                            <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider/>
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                            
                        </MenuList>
                    </Menu>
                </div>
            </Box>
           <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
            <DrawerOverlay>
                <DrawerHeader borderBottomWidth="1px" >Search Users </DrawerHeader>
            </DrawerOverlay>
            <DrawerHeader borderBottomWidth="1px" >
                Search User </DrawerHeader>
                <DrawerBody>
                    <Box d="flex" pb={2} >
                        <Input
                        placeholder="Search by name or email"
                        mr={2}
                        value={search}
                        onChange={(e) => search(e.target.value)}
                        
                        />
                        <Button 
                        onClick={handleSearch}
                         >Go</Button>
                    </Box>

                    {loading ?( <ChatLoading/>
                  ) :  (
                        searchResult?.map ((user) => (
                            <UserListItem
                            key={user.id}
                            user={user}
                            handleFunction={()=> accessChat(user._id)}
                            />

                        ))
                    
                   
                )}
                </DrawerBody>
            </Drawer> 
        </>
    );
};

export default SideDrawer;


