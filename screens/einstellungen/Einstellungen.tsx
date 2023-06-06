import React from "react"
import { View, Text } from "react-native"

export const Einstellungen = () => {
    return (
        <View style={{flex:10}}>
            <View style={styles.titleWrapper as any}>
                <Text style={styles.header as any}>
                    Einstellungen
                </Text>
            </View>                            
            <View style={styles.mainView}>                
            </View>            
        </View>
    )
}

export default Einstellungen

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
}