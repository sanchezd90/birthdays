import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useFonts} from 'expo-font'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Geburtstage from './screens/geburtstage/Geburtstage';
import Einstellungen from './screens/einstellungen/Einstellungen';
import Kontakte from './screens/kontakte/Kontakte';
import Profil from './screens/profil/Profil'
import { NavigationContainer } from '@react-navigation/native';
import {MaterialIcons} from '@expo/vector-icons'
import { PaperProvider } from 'react-native-paper';
import ContactsContextProvider from './store/context/contacts-context';
import UsersContextProvider from './store/context/users-context';
import { init } from './utils/database';
import * as Notifications from 'expo-notifications'

const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async() => {
    return {
      shouldPlaySound:false,
      shouldSetBadge:false,
      shouldShowAlert:true
    }
  }
})

export default function App() {
  
  const [dbInitialized, setDbInitialized] = useState(false)  

  useEffect(() => {
    init().then(()=>{
      console.log('db initialized');
      setDbInitialized(true)      
    })
    .catch((err)=>{
      console.log(err)
    })    
  }, []) 

  const [fontsLoaded] = useFonts({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return <View></View>
  }
  
  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style='light'/>
        <SafeAreaView style={{flex:1}}>
          <UsersContextProvider>            
          <ContactsContextProvider>            
            <NavigationContainer>              
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: () => {
                    let iconName=''
        
                    if (route.name === 'Home') {
                      iconName = 'calendar-today'                    
                    } else if (route.name === 'Geburtstage') {
                      iconName = 'cake'                
                    } else if (route.name === 'Kontakte') {
                      iconName = 'contacts'
                    } else if (route.name === 'Einstellungen') {
                      iconName = 'settings'
                    } else if (route.name === 'Profil') {
                      iconName = 'person'
                    } 
                    

                    return <MaterialIcons name={iconName as any} size={25} color={'#285afc'}/>
                  },
                  tabBarStyle: { backgroundColor: '#1c1c1c' },
                  headerShown:false
                })}
              >              
                <Tab.Screen name="Geburtstage" component={Geburtstage} />
                <Tab.Screen name="Kontakte" component={Kontakte} />
                <Tab.Screen name="Einstellungen" component={Einstellungen} />
                <Tab.Screen name="Profil" component={Profil} />
              </Tab.Navigator>
            </NavigationContainer>                        
          </ContactsContextProvider>
          </UsersContextProvider> 
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
    backgroundColor:'black'
  },  
});
