import React from 'react'
import {Box} from "@chakra-ui/layout";
import {CloseIcon} from "@chakra-ui/icons";
const UserBadgeItem = ({user, handleFunction }) => {
    return(
        <Box
        px={2}
        py={1}
        borderRadius="lg"
        m={1}
        mb={2}
        variant="solid"
        fontSize={12}
        colorScheme="purple"
        cursor="pointer"
        onClick={handleFunction}
         
        >
            {user.name}
            <CloseIcon p1={1}  />


        </Box>

    )
}

export default UserBadgeItem