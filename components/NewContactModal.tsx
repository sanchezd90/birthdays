import React, {useContext, useState} from "react"
import {StyleSheet,View,Modal,Text,Pressable} from 'react-native'
import { Switch, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ContactsContext } from "../store/context/contacts-context";
import { IContact } from "../interfaces/contacts";

interface NewContactModalProps {
    show:boolean,
    onClose:()=>void
}

const initialFormData = {
    firstName:'',
    lastName:'',
    birthdate:new Date().toISOString(),
    hasReminder:false
}

export const NewContactModal = ({show,onClose}:NewContactModalProps) => {
    const {addContact} = useContext(ContactsContext)    
    const [contact,setContact] = useState<IContact>(initialFormData)    

    const onDateChange = (event, selectedDate) => {        
        setContact((currentContact)=>({...currentContact,birthdate:selectedDate}))
    };

    const handleChange = (field,value) => {
        setContact((currentContact)=>({...currentContact,[field]:value}))
    }

    const handleSubmit = () => {
        const payload = {
            ...contact,
            birthdate:contact.birthdate.toISOString().split('T')[0],
            id:Date.now().toString(),            
        }              
        addContact(payload);
        setContact(initialFormData)
        onClose()
    }

    return (
        <Modal style={styles.modalWrapper} visible={show} animationType='slide'>
            <View style={styles.modalWrapper}>
                <View style={styles.header}>
                    <Pressable style={styles.headerOption} onPress={onClose}>
                        <Text style={{...styles.headerText,color:'#285afc'}}>Abbrechen</Text>
                    </Pressable>
                    <View style={styles.headerOption}>
                        <Text style={{...styles.headerText,color:'white'}}>Info</Text>
                    </View>   
                    <Pressable style={styles.headerOption} disabled={!contact.firstName||!contact.lastName} onPress={handleSubmit}>
                        <Text style={{...styles.headerText,color:contact.firstName&&contact.lastName?'white':'gray'}}>Fertig</Text>
                    </Pressable>                                     
                </View>
                <View style={styles.formWrapper}>
                    <Text style={styles.labels}>Vorname</Text>                    
                    <TextInput 
                        style={styles.textInput}
                        placeholder='Vorname'
                        value={contact.firstName}
                        onChangeText={(value)=>handleChange('firstName',value)}
                        mode='outlined'   
                        outlineColor="gray"                         
                        activeOutlineColor="#285afc"
                        textColor='white'
                    />            
                    <Text style={styles.labels}>Nachname</Text>                             
                    <TextInput 
                        style={styles.textInput}
                        placeholder='Nachname'
                        value={contact.lastName}
                        onChangeText={(value)=>handleChange('lastName',value)}
                        mode='outlined'    
                        outlineColor="gray"   
                        activeOutlineColor="#285afc"   
                        textColor='white'                    
                    />             
                    <Text style={styles.labels}>Geburtstag Datum</Text>                                                                                                            
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(contact.birthdate)}
                    mode={'date'}
                    is24Hour={true}
                    onChange={onDateChange}
                    style={styles.datePicker}
                    /> 
                    <Text style={styles.labels}>Benachrichtigung</Text>                   
                    <Switch value={contact.hasReminder} onValueChange={()=>handleChange('hasReminder',!contact.hasReminder)} color="#285afc" style={{marginTop:4}}/>
                </View>
            </View> 
        </Modal>
    )
}

export default NewContactModal

const styles = StyleSheet.create({
    modalWrapper:{
        flex:1,
        backgroundColor: '#0A0A0A',
        paddingTop: 50,
    },
    header:{
        flex:1,
        backgroundColor: '#1c1c1c',
        flexDirection:'row',
        alignItems:'center'
    },
    formWrapper:{
        flex:10,
        padding:20,
        gap:3
    },
    headerOption:{        
        flex:1,
        height:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'        
    },
    headerText:{              
        flex:1,  
        fontSize:20,   
        textAlign:'center'
    },
    customInput:{
        backgroundColor:'#303030',
        padding:5,
        height:40,
        color:'white'        
    },
    textInput:{
        backgroundColor:'#303030',
        fontSize:20,            
    },
    datePicker:{
        marginTop:5,
        backgroundColor:'#303030', 
        width:75
    },
    labels:{
        color:'white',
        fontSize:18,
        marginTop:5
    }
})