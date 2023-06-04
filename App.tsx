import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Navbar from './components/Navbar'
import {useFonts} from 'expo-font'
import AppLoading from 'expo-app-loading'


import Geburstage from './screens/geburtstage/Geburtstage';

export default function App() {

  const [fontsLoaded] = useFonts({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading/>
  }

  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      <SafeAreaView style={{flex:1}}>        
        <Geburstage/>
        <Navbar/>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },  
});
