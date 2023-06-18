import React, { useContext, useEffect } from "react"
import { View, Text } from "react-native"
import * as Contacts from 'expo-contacts';
import { parseImportedContacts } from "../../utils/common";
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { fetchContacts, insertContact } from "../../utils/database";
import { ContactsContext } from "../../store/context/contacts-context";

export const Kontakte = () => {
  
  const {updateImportFlag} = useContext(ContactsContext)
  const navigation = useNavigation();

      const importContacts = async () => {
        const contacts = await fetchContacts()        
        const currentImportedContacts = contacts.map(cic=>cic.importedId)         
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Birthday],
        });
        parseImportedContacts(data).map(contact=>{            
            if(!currentImportedContacts.includes(contact.importedId)){
                (async () => {
                await insertContact(contact)
                })()
            }
        })            
        updateImportFlag(true)
        navigation.navigate('Geburtstage')
        }        
      }

    return (
        <View style={{flex:10}}>
            <View style={styles.titleWrapper as any}>
                <Text style={styles.header as any}>
                    Kontakte
                </Text>
            </View>                            
            <View style={styles.mainView}>   
              <View style={styles.formWrapper}>
                <Text style={styles.labels}>Kontakte vom Telefon importieren</Text> 
                <Button mode="outlined" onPress={importContacts} style={{borderColor:'#285afc', width:'50%', marginTop:10}} textColor="#285afc">
                  Importieren
                </Button> 
              </View>             
            </View>            
        </View>
    )
}

export default Kontakte

const styles = {
    mainView: {
        flex: 10,
        backgroundColor: '#0A0A0A',
        padding: 10,
        gap: 20
    },
    titleWrapper: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1c1c1c',
    },  
    header: {        
        color: 'white',        
        fontSize: 18,
        textAlign: 'center',
        fontFamily:'open-sans-bold'
    },
    formWrapper:{
      flex:10,
      padding:20,
      gap:3,      
    },
    labels:{
      color:'white',
      fontSize:18,
      marginTop:5
    }
  } 