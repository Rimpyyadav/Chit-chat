import { Tooltip } from '@chakra-ui/react'
import React from 'react'
const SideDrawer = () => {
    const [seach, setSearch] = useSate("")
    const [seachResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()
}
return <>
<Box>
    <Tooltip label="Search Users to chat" 
    hasArrow
    placeContent="bottom-end">
        <Button>
        <i class="fas fa-search" ></i>

        </Button>
    </Tooltip>
</Box>

</>

export default SideDrawer;