import React, {useState, useEffect} from "react"
import { Pressable, View } from "react-native"
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import {CLIENT_ID,IOS_CLIENT_ID} from '@env'
import { Button } from "react-native-paper"

WebBrowser.maybeCompleteAuthSession();

export const Anmeldung = () => {
  
    const [accesToken, setAccessToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [request,response,promptAsync] = Google.useAuthRequest({      
      iosClientId:IOS_CLIENT_ID,
      expoClientId:CLIENT_ID,
    })
    
    const handleLoginClick = () => {         
      promptAsync()
    }

    useEffect(() => {
      if(response?.type === 'success'){        
        setAccessToken(response.authentication.accessToken)
        accesToken && fetchUserInfo()
      }
    }, [response, accesToken])
    
    const fetchUserInfo = async() => {
      let response = await fetch("https://www.googleapis.com/userinfo/v2/me",{
        headers: {
          Authorization: `Bearer ${accesToken}`}
      });
      const userInfo = await response.json();
      console.log(userInfo);
      setUserInfo(userInfo)
    }

    return (
        <View>
          <Pressable onPress={handleLoginClick}>
            <Button disabled={!request}>Sign in with google</Button>
          </Pressable>
        </View>
    )
}

export default Anmeldung