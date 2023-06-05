import React, {useState, useEffect} from "react"
import {View, StyleSheet, Text, FlatList, SectionList} from 'react-native'
import ContactCard from '../../components/ContactCard';
import {contacts} from '../../contacts.json'
import ActionBar from '../../components/ActionBar';
import NewContactModal from "../../components/NewContactModal";
import { months, groupByMonth, belongsToMonth } from "../../utils/common";

export const Geburtstage = () => {

    const [showNewContactModal, setShowNewContactModal] = useState<boolean>(false)
    const [groupedContacts, setGroupedContacts] = useState([]) 

    const handleNewContactAction = () => {
        setShowNewContactModal(true)
        console.log('show modal');
    }

    const handleCloseModal = () => {
        setShowNewContactModal(false)
    }    

    useEffect(() => {
      setGroupedContacts(groupByMonth(contacts) as any)      
    }, [])    

    return <View style={{flex:10}}>
        <ActionBar handleNewContactAction={handleNewContactAction}/>
        <NewContactModal show={showNewContactModal} onClose={handleCloseModal}/>
        <View style={styles.mainView}>            
            <SectionList
                sections={groupedContacts}
                keyExtractor={(item, index) => item + index}
                renderItem={(itemData)=>{
                    return (<View style={styles.contact}>
                        <ContactCard contact={itemData.item}/>
                    </View>
                    )
                }}
                renderSectionHeader={({section: {name}}) => (
                    <Text style={styles.monthTitle}> 
                        {name}                   
                    </Text>  
                )}                                
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