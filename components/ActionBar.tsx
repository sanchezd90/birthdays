import React from 'react'
import { StyleSheet, View, Text, Pressable} from 'react-native'
import {AntDesign} from '@expo/vector-icons'

interface ActionBarProps {
    handleNewContactAction:()=>void
}

const ActionBar = ({handleNewContactAction}:ActionBarProps) => {

    const handleButtonPress = (action:string) => {        
        if(action==='new-contact') handleNewContactAction()
      }

    return (
        <View style={styles.actionsSection}>
             
            <View style={styles.titleWrapper}>
                <Text style={styles.header}>
                    Geburtstage
                </Text>
            </View>
            <View style={{position:'absolute',top:10,right:10}}>
                <Pressable 
                    onPress={()=>handleButtonPress('new-contact')}  
                    style={({pressed})=>pressed ? styles.pressedActionWrapper : styles.actionWrapper}
                >
                    <AntDesign name='plus' size={40} color={'white'}/>            
                </Pressable>        
            </View>            
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
        position:'relative'        
    },
    actionWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',        
    },
    pressedActionWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
       
        backgroundColor:'#4a4a4a'
    },
    header: {        
        color: 'white',        
        fontSize: 18,
        textAlign: 'center',
        fontFamily:'open-sans-bold'
    },
    titleWrapper: {
        flex: 1,
        justifyContent: 'center'
    },
})