import React from 'react';
import { Container,Box,Heading,Tab,TabList,TabPanel,TabPanels,Tabs, } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import { useHistory } from "react-router";
import { useEffect } from "react";
import Signup from '../components/Authentication/Signup';



function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);


    return <Container maxW="x1" centerContent >
        <Box
        d="flex"
        justifyContent = "center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        >
            <Heading fontSize="4x1" fontFamily="Work sans" color="black" >Talk-A-Tive</Heading>
        </Box>

        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" >
        <Tabs isFitted variant="soft-rounded">
     <TabList mb="1em">
    <Tab>Login</Tab>
    <Tab >SignUp</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
        </Box>

    </Container>
    
}

export default Homepage;