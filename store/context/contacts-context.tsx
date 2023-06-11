import React, { createContext, useState } from "react";
import { IContact } from "../../interfaces/contacts";

export const ContactsContext = createContext({
    contacts:[],
    addContact: (contact:IContact) => {},
    removeContact: (contact:IContact) => {},
})

const ContactsContextProvider = ({children}) =>{

    const [contacts, setContacts] = useState<IContact[]>([{
        id:"1",
        firstName:"Matías",
        lastName:"Rodríguez",
        birthdate:"1989-03-24",
        hasReminder:false
    },])

    const addContact = (contact:IContact) => {
        setContacts((currentContacts)=>[...currentContacts,contact])
    }

    const removeContact = (contact:IContact) => {
        setContacts((currentContacts)=>currentContacts.filter(currentContact=>currentContact.id===contact.id))
    }

    const value = {
        contacts:contacts,
        addContact:addContact,
        removeContact:removeContact
    }

    return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>
}

export default ContactsContextProvider