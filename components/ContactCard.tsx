import React from 'react'
import { StyleSheet, Text,View } from 'react-native';
import { parseDay } from '../utils/common'
import { FontAwesome } from '@expo/vector-icons'; 

export const ContactCard = ({contact}) =>{  
    return (
        <View style={styles.card}>
                <View style={styles.date}>

                </View>
                <View style={styles.contactContainer}>
                  <View style={{ width: '20%', justifyContent:'center', alignItems:'center', paddingVertical: 10 }}>
                    <Text style={{ color: 'white', fontSize: 30 }}>{parseDay(contact?.birthdate)}</Text>
                  </View>
                  <View style={{ width: '60%', paddingVertical: 10 }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>{contact?.firstName} {contact?.lastName}</Text>
                    <Text style={{ color: '#285afc' }}>{contact?.birthdate}</Text>
                  </View>
                  <View style={{ width: '20%', justifyContent:'center', alignItems:'center' }}>
                    <Text>
                      {contact?.hasReminder && <FontAwesome name="bell" size={24} color="#285afc" />}                    
                    </Text>
                  </View>
                </View>
              </View>
    )
} 


const styles = StyleSheet.create({    
    card: {
      height: 80,
      backgroundColor: '#1c1c1c',
      borderRadius: 10,
    },
    date: {
      backgroundColor: '#285afc',
      height: 20,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },
    contactContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 50,
    },   
  });
  
  export default ContactCard