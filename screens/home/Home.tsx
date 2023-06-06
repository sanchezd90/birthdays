import React from "react"
import { View } from "react-native"

export const Home = () => {
    return (
        <View style={{flex:10}}>
            <View style={styles.mainView}>            
            
            </View>
        </View>
    )
}

export default Home

const styles = {
    mainView: {
        flex: 10,
        backgroundColor: '#0A0A0A',
        padding: 10,
        gap: 20
      }, 
      another:{
        flex:2
      } 
}