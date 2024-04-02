import { ViewIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import {useDisclosure} from "@chakra-ui/hooks"
import React, { useState } from "react";
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, Box} from "@chakra-ui/react";
import UserBadgeItem from "../UserAvatar/UserBadgeItem"
const UpdateGroupChatModal = ({fetchAgain, setFetchAgain}) => {
    const {isOpen, onOpen, inClose} = useDisclosure() 
    const [groupChatName, setGroupChatName] = useState();
    const [search, SetSearch] = useState("")
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const {selectedChat, setSelectedChat, user} = ChatState();
    const handleRemove =() => {}

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
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
};
export default UpdateGroupChatModal;