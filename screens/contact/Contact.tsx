import React, {useState,useEffect} from "react"
import {View, Text} from 'react-native'
import {contacts} from '../../contacts.json'

const initialContactValues = {
    id:'',
    firstName:'',
    lastName:'',
    birthdate:''
}

export const Contact = ({route}:any) => {
    const contactId = route.params.id

    const [contact, setContact] = useState(initialContactValues)

    const fillContactData = () => {
        const currentContact = contacts.find(contact=>contact.id===contactId)
        setContact(currentContact as any)
    }

    useEffect(() => {
      fillContactData()
          
    }, [])
    

    return <View style={{flex:10}}>
        <Text style={{ color: 'black', fontSize: 18 }}>{contact.firstName} {contact.lastName}</Text>
    </View>
}