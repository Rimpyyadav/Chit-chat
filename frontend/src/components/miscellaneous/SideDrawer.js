import React, { useState } from 'react';
import { Box, Tooltip, Button, Text } from '@chakra-ui/react';

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
            </Box>
        </>
    );
};

export default SideDrawer;


