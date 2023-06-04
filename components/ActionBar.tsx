import React from 'react'
import { StyleSheet, View, Text, Pressable} from 'react-native'
import {AntDesign} from '@expo/vector-icons'

interface ActionBarProps {
    handleNewContactAction:()=>void
}

const ActionBar = ({handleNewContactAction}:ActionBarProps) => {

    const handleButtonPress = (action:string) => {
        console.log(`${action} is being pressed`)
        if(action==='new-contact') handleNewContactAction()
      }

    return (
        <View style={styles.actionsSection}>
            <Pressable 
                onPress={()=>handleButtonPress('a')}  
                style={({pressed})=>pressed ? styles.pressedActionWrapper : styles.actionWrapper}
            >
              
            </Pressable>
            <Pressable 
                onPress={()=>handleButtonPress('b')}  
                style={({pressed})=>pressed ? styles.pressedActionWrapper : styles.actionWrapper}
            >
              
            </Pressable>   
        <View style={styles.titleWrapper}>
          <Text style={styles.header}>
            Geburtstage
          </Text>
        </View>
            <Pressable 
                onPress={()=>handleButtonPress('c')}  
                style={({pressed})=>pressed ? styles.pressedActionWrapper : styles.actionWrapper}
            >
                
            </Pressable>
            <Pressable 
                onPress={()=>handleButtonPress('new-contact')}  
                style={({pressed})=>pressed ? styles.pressedActionWrapper : styles.actionWrapper}
            >
                <AntDesign name='plus' size={40} color={'white'}/>            
            </Pressable>        
      </View>
    )
}

export default ActionBar

const styles = StyleSheet.create({
    actionsSection: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#1c1c1c',
        borderBottomWidth: 0.2,
        borderBottomColor: '#8c8b8b',
    },
    actionWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        borderColor: '#8c8b8b',
        borderWidth: 0.2
    },
    pressedActionWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        borderColor: '#8c8b8b',
        borderWidth: 0.2,
        backgroundColor:'#4a4a4a'
    },
    header: {
        color: 'white',        
        fontSize: 18,
        textAlign: 'center',
        fontFamily:'open-sans-bold'
    },
    titleWrapper: {
        flex: 3,
        justifyContent: 'center'
    },
})