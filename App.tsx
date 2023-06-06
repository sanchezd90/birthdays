import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Navbar from './components/Navbar'
import {useFonts} from 'expo-font'
import AppLoading from 'expo-app-loading'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Geburtstage from './screens/geburtstage/Geburtstage';
import Home from './screens/home/Home';
import Einstellungen from './screens/einstellungen/Einstellungen';
import { NavigationContainer } from '@react-navigation/native';
import {MaterialIcons} from '@expo/vector-icons'
import { PaperProvider } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading/>
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style='light'/>
        <SafeAreaView style={{flex:1}}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: () => {
                  let iconName=''
      
                  if (route.name === 'Home') {
                    iconName = 'calendar-today'                    
                  } else if (route.name === 'Geburtstage') {
                    iconName = 'cake'                
                  } else if (route.name === 'Einstellungen') {
                    iconName = 'settings'
                  } 
                      
                  return <MaterialIcons name={iconName as any} size={25} color={'#285afc'}/>
                },
                tabBarStyle: { backgroundColor: '#1c1c1c' },
                headerShown:false
              })}
            >
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Geburtstage" component={Geburtstage} />
              <Tab.Screen name="Einstellungen" component={Einstellungen} />
            </Tab.Navigator>
          </NavigationContainer>                        
        </SafeAreaView>
      </View>
    </PaperProvider>
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
