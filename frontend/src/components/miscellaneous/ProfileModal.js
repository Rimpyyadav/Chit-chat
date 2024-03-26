
import { useDisclosure } from '@chakra-ui/hooks';
import {Modal, ModalBody, ModalContent, ModalCloseButton,ModalFooter,ModalHeader,ModalOverlay} from "@chakra-ui/react"
import { Button,IconButton } from '@chakra-ui/button';
import {Image, Text } from "@chakra-ui/react"
import { ViewIcon } from '@chakra-ui/icons';
import React from 'react'

const ProfileModal = ({user, children}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
       <>
       {children ? (
        <span onClick={onOpen}>{children} </span>
       ) : (
        <IconButton
        d={{ base: "flex"}}
        icon={<ViewIcon/>}
        onClick={onOpen}
        
        />
       ) }
      
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize="40px"
          fontFamily="Work sans"
          d="flex"
          justifyContent="center"
          
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            alt={user.name}

            />
            <Text
                fontSize={{ base:"28px", md: "30px" }}
                fontFamily="Work sans"
                >
                    Email: {user.email}
            </Text>

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
       </>
    )
  }

export default ProfileModal;