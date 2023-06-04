import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Navbar from './components/Navbar'
import {useFonts} from 'expo-font'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Geburstage from './screens/geburtstage/Geburtstage';
import { Contact } from './screens/contact/Contact';

const Stack = createNativeStackNavigator()

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
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Geburtstage' component={Geburstage}/>
            <Stack.Screen name='Contact' component={Contact}/>
          </Stack.Navigator>          
        </NavigationContainer>        
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