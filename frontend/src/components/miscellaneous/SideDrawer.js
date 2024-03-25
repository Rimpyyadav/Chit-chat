import React, { useState } from 'react';
import { Box, Tooltip,Text, MenuButton, MenuItem } from '@chakra-ui/react';
import {Button} from "@chakra-ui/button";
import {Avatar} from "@chakra-ui/avatar"
import { BellIcon, ChevronDownIcon} from "@chakra-ui/icons";



const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

     

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
                            <MenuItem></MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
        </>
    );
};

export default SideDrawer;


