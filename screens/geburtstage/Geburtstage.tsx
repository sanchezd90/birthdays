import React, {useState, useEffect, useContext} from "react"
import {View, StyleSheet, Text, SectionList, Pressable} from 'react-native'
import ContactCard from '../../components/ContactCard';
import ActionBar from '../../components/ActionBar';
import ContactModal from "../../components/ContactModal";
import { groupByMonth } from "../../utils/common";
import { ContactsContext } from "../../store/context/contacts-context";

export const Geburtstage = () => {
    const {setActiveContact,contacts} = useContext(ContactsContext)
    const [showNewContactModal, setShowNewContactModal] = useState<boolean>(false)
    const [groupedContacts, setGroupedContacts] = useState([])     

    const handleNewContactAction = () => {  
        setActiveContact('')      
        setShowNewContactModal(true)        
    }

    const handleCloseModal = () => {
        setShowNewContactModal(false)
    }    

    const handleContactPress = (id) => {    
      setActiveContact(id)       
      setShowNewContactModal(true)
    }

    useEffect(() => {    
      setGroupedContacts(groupByMonth(contacts))           
    }, [contacts])    

    return <View style={{flex:10}}>
        <ActionBar handleNewContactAction={handleNewContactAction}/>
        <ContactModal show={showNewContactModal} onClose={handleCloseModal}/>
        <View style={styles.mainView}>            
            <SectionList
                sections={groupedContacts}
                keyExtractor={(item, index) => item + index}
                renderItem={(itemData)=>{
                    return (<View style={styles.contact}>
                        <Pressable onPress={()=>{handleContactPress(itemData.item.id)}}>
                          <ContactCard contact={itemData.item}/>
                        </Pressable>
                    </View>
                    )
                }}
                renderSectionHeader={({section}) => {
                  if(section.data.length>0)return(                    
                    <Text style={styles.monthTitle}> 
                        {section.name}                   
                    </Text>  
                )}}                                
                />                          
        </View>
    </View>
}

export default Geburtstage

const styles = StyleSheet.create({
    mainView: {
        flex: 10,
        backgroundColor: '#0A0A0A',
        padding: 10,
        gap: 20
      },  
      titleWrapper: {
        flex: 3,
        justifyContent: 'center'
      },
      text: {
        color: '#285afc',
        textAlign: 'center'
      },
      monthTitle: {
        color: 'white',
        textAlign: 'left',
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: 15,    
        marginTop:15,
        marginBottom:10    
      },  
      contact:{
        marginBottom:15
      }           
})