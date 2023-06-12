import React, { createContext, useState } from "react";
import { IContact } from "../../interfaces/contacts";

export const ContactsContext = createContext({
    activeContact:'',
    contacts:[],
    setActiveContact: (id:string) => {},
    addContact: (contact:IContact) => {},
    updateContact: (contact:IContact) => {},
    removeContact: (id:string) => {},
})

const ContactsContextProvider = ({children}) =>{

    const [activeContact,setActiveContact] = useState<string>('')
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

    const updateContact = (contact:IContact) => {
        const i = contacts.findIndex(c=>c.id===contact.id)
        const newContacts=[...contacts]        
        newContacts[i]=contact
        setContacts(newContacts)
    }

    const removeContact = (id:string) => {
        setContacts((currentContacts)=>currentContacts.filter(currentContact=>currentContact.id!==id))
    }

    const value = {
        activeContact:activeContact,
        setActiveContact:setActiveContact,
        contacts:contacts,
        addContact:addContact,
        updateContact:updateContact,
        removeContact:removeContact
    }

    return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>
}

export default ContactsContextProvider