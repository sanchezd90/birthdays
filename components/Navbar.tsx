import React from 'react'
import { StyleSheet, View, Text, Pressable, Image } from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

export const Navbar = () => {

    const handleButtonPress = (action:string) => {
        console.log(`${action} is being pressed`)
      }

    return (
        <View style={styles.navbar}>
        
        <Pressable 
            style={({pressed})=> pressed ? styles.pressedButtonWrapper : styles.buttonWrapper}
            onPress={()=>handleButtonPress('Geburtstage')}
        >
          <View>
            <View style={{alignItems:'center'}}>
              <MaterialIcons name='cake' size={40} color={'#285afc'}/>
            </View>
            <Text style={styles.text}>
              Geburtstage
            </Text>
          </View>
        </Pressable>
        
        <Pressable 
            style={({pressed})=> pressed ? styles.pressedButtonWrapper : styles.buttonWrapper}
            onPress={()=>handleButtonPress('kalendar')}
        >
          <View>
            <View style={{alignItems:'center'}}>
            <MaterialIcons name='calendar-today' size={40} color={'#285afc'}/>
            </View>
            <Text style={styles.text}>
              Kalendar
            </Text>
          </View>
        </Pressable>
        <Pressable 
            style={({pressed})=> pressed ? styles.pressedButtonWrapper : styles.buttonWrapper}
            onPress={()=>handleButtonPress('einstellungen')}
        >
          <View>
            <View style={{alignItems:'center'}}>
              <MaterialIcons name='settings' size={40} color={'#285afc'}/>
            </View>
            <Text style={styles.text}>
              Einstellungen
            </Text>
          </View>
        </Pressable>
        <Pressable 
            style={({pressed})=> pressed ? styles.pressedButtonWrapper : styles.buttonWrapper}
            onPress={()=>handleButtonPress('mehr')}
        >
          <View>
            <View style={{alignItems:'center'}}>
              <MaterialIcons name='more-horiz' size={40} color={'#285afc'}/>
            </View>
            <Text style={styles.text}>
              Mehr
            </Text>
          </View>
        </Pressable>
      </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    navbar: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        borderTopWidth: 0.2,
        borderTopColor: '#8c8b8b',
        flexDirection: 'row',
      },
      buttonWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        marginVertical: 5
      },
      pressedButtonWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor:'#4a4a4a'
      },
      text: {
        color: '#285afc',
        textAlign: 'center'
      },
})