
import { useDisclosure } from '@chakra-ui/hooks';
import {Modal, ModalBody, ModalContent, ModalCloseButton,ModalFooter,ModalHeader,ModalOverlay} from "@chakra-ui/react"
import { IconButton } from '@chakra-ui/react';
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            alt={user.name}
            />

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