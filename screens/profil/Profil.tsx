import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { CLIENT_ID, IOS_CLIENT_ID } from "@env";
import { Button } from "react-native-paper";
import { UsersContext } from "../../store/context/users-context";

WebBrowser.maybeCompleteAuthSession();

export const Profil = () => {
  const { activeUser, setActiveUser } = useContext(UsersContext);
  const [accesToken, setAccessToken] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    expoClientId: CLIENT_ID,
  });

  const handleLoginClick = () => {
    promptAsync();
  };

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accesToken && fetchUserInfo();
    }
  }, [response, accesToken]);

  const fetchUserInfo = async () => {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });
    const userInfo = await response.json();
    setActiveUser(userInfo);
  };

  return (
    <View style={{ flex: 10 }}>
      <View style={styles.titleWrapper as any}>
        <Text style={styles.header as any}>Profil</Text>
      </View>
      <View style={styles.mainView}>
        {activeUser ? (
          <View style={styles.formWrapper}>
            <View style={styles.nameWrapper}>
              <Image source={{uri: activeUser?.picture}} style={styles.image}/>
              <Text style={styles.labels}>{activeUser.name}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.formWrapper}>
            <Text style={styles.labels}>Anmelden mit Google</Text>
            <Button
              mode="outlined"
              onPress={handleLoginClick}
              style={{ borderColor: "#285afc", width: "50%", marginTop: 10 }}
              textColor="#285afc"
            >
              Anmelden
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default Profil;

const styles = {
  mainView: {
    flex: 10,
    backgroundColor: "#0A0A0A",
    padding: 10,
    gap: 20,
  },
  titleWrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#1c1c1c",
  },
  header: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
  formWrapper: {
    flex: 10,
    padding: 20,
    gap: 3,
  },
  labels: {
    color: "white",
    fontSize: 18,
    marginTop: 5,
  },
  image:{
    height:50,
    width:50,
    borderRadius:25
  },
  nameWrapper:{
    flexDirection:'row',
    alignItems:'center',
    gap:10
  },  
};
