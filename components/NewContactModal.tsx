import React, {useState} from "react"
import {StyleSheet,View,Modal,Text,Pressable, Platform, Button} from 'react-native'
import { Switch, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

interface NewContactModalProps {
    show:boolean,
    onClose:()=>void
}

export const NewContactModal = ({show,onClose}:NewContactModalProps) => {

    const [firstName,setFirstName] = useState<string>('')
    const [lastName,setLastName] = useState<string>('')
    const [date, setDate] = useState(new Date());
    const [hasReminder,setHasReminder] = useState<boolean>(false)    

    const onChange = (event:any, selectedDate:any) => {
        const currentDate = selectedDate;        
        setDate(currentDate);
    };

    const handleSubmit = () => {
        const payload = {
            firstName,
            lastName,
            date,
            hasReminder
        }
        console.log(payload);
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
                    <Pressable style={styles.headerOption} disabled={!firstName||!lastName} onPress={handleSubmit}>
                        <Text style={{...styles.headerText,color:firstName&&lastName?'white':'gray'}}>Fertig</Text>
                    </Pressable>                                     
                </View>
                <View style={styles.formWrapper}>
                    <Text style={styles.labels}>Vorname</Text>                    
                    <TextInput 
                        style={styles.textInput}
                        placeholder='Vorname'
                        value={firstName}
                        onChangeText={setFirstName}
                        mode='outlined'   
                        outlineColor="gray"                         
                        activeOutlineColor="#285afc"
                        textColor='white'
                    />            
                    <Text style={styles.labels}>Nachname</Text>                             
                    <TextInput 
                        style={styles.textInput}
                        placeholder='Nachname'
                        value={lastName}
                        onChangeText={setLastName} 
                        mode='outlined'    
                        outlineColor="gray"   
                        activeOutlineColor="#285afc"   
                        textColor='white'                    
                    />             
                    <Text style={styles.labels}>Geburtstag Datum</Text>                                                                                                            
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    onChange={onChange}
                    style={styles.datePicker}
                    /> 
                    <Text style={styles.labels}>Benachrichtigung</Text>                   
                    <Switch value={hasReminder} onValueChange={()=>setHasReminder(!hasReminder)} color="#285afc" style={{marginTop:4}}/>
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