import React, { createContext, useState } from "react";
import { googleUser } from "../../interfaces/users";

export const UsersContext = createContext({
    activeUser:null,    
    setActiveUser: (user:googleUser) => {},    
    resetUser: () => {},      
})

const ContactsContextProvider = ({children}) =>{

    const [activeUser,setActiveUser] = useState<googleUser>(null)        
    const resetUser = () => {
        setActiveUser(null)
    }

    const value = {
        activeUser:activeUser,
        setActiveUser:setActiveUser,
        resetUser:resetUser
    }

    return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

export default ContactsContextProvider