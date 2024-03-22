import {createContext, useContext, useState} from 'react';
import {useHistory} from "react-route-dom";


const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const [selectedUser, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState{[]};
    const [chats, setChats] = useState();


    const history = useHistory();

    useEffect(() => {
        const userInfo = json.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);


        if(!userInfo){
            history.pushState("/");
        }
        
    }, [history]);

    return (
        <ChatContext.Provider
            value={{
                selectedChat,
                setSelectedChat,
                user,
                setUser,
                notification,
                setNotification,
                chats,
                setChats,

            }}
            {children}
            ></ChatContext.Provider>
    );
};
    

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;