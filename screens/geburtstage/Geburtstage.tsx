import React, {useState} from "react"
import {View, StyleSheet, Text, Button, FlatList} from 'react-native'
import ContactCard from '../../components/ContactCard';
import {contacts} from '../../contacts.json'
import ActionBar from '../../components/ActionBar';
import NewContactModal from "../../components/NewContactModal";

export const Geburstage = () => {

    const [showNewContactModal, setShowNewContactModal] = useState<boolean>(false)

    const handleNewContactAction = () => {
        setShowNewContactModal(true)
        console.log('show modal');
    }

    const handleCloseModal = () => {
        setShowNewContactModal(false)
    }

    return <View style={{flex:10}}>
        <ActionBar handleNewContactAction={handleNewContactAction}/>
        <NewContactModal show={showNewContactModal} onClose={handleCloseModal}/>
        <View style={styles.mainView}>        
            <View style={styles.monthWrapper}>
            <Text style={styles.monthTitle}>
                März 2023
            </Text>
            <View>
                <FlatList
                data={contacts}                
                renderItem={(itemData)=>{
                    return (
                    <ContactCard contact={itemData.item}/>
                    )
                }}
                keyExtractor={item=>{
                    return item.id
                }}
                />              
            </View>
            </View>                
        </View>
    </View>
}

export default Geburstage

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
        paddingLeft: 15
      },
      
      monthWrapper: {
    
      }
})