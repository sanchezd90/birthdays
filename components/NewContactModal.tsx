import React, {useState} from "react"
import {StyleSheet,View,Modal,Text,Pressable, TextInput} from 'react-native'

interface NewContactModalProps {
    show:boolean,
    onClose:()=>void
}

export const NewContactModal = ({show,onClose}:NewContactModalProps) => {

    const [firstName,setFirstName] = useState<string>('')
    const [lastName,setLastName] = useState<string>('')    

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
                    <Pressable style={styles.headerOption}>
                        <Text style={{...styles.headerText,color:'gray'}}>Fertig</Text>
                    </Pressable>                                     
                </View>
                <View style={styles.formWrapper}>
                    <View style={styles.customInput}>
                        <TextInput 
                            style={styles.textInput}
                            placeholder='Vorname'
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholderTextColor='white'
                        />
                    </View>
                    <View style={styles.customInput}>
                        <TextInput 
                            style={styles.textInput}
                            placeholder='Nachname'
                            value={lastName}
                            onChangeText={setLastName}
                            placeholderTextColor='white'
                        />
                    </View>
                    <View style={styles.customInput}>
                        <TextInput 
                            style={styles.textInput}
                            placeholder='Name'
                        />
                    </View>
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
        color:'white',
        fontSize:20,                 
    },
})