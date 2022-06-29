import React, {useState} from 'react'
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

// import { House, ArrowsLeftRight, Lightning,RocketLaunch, UserCircle, HouseLine } from "phosphor-react-native";
// import { BottomNavigation } from 'react-native-paper';
// import * as SplashScreen from 'expo-splash-screen';
import AppLoading from 'expo-app-loading';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {CredentialsContext} from './components/CredentialsContext'
import { useFonts } from 'expo-font';
// import Icon from 'react-native-vector-icons/Feather'
import RootStack from './navigation/RootStack'



const App =  () => {
  const [appReady, setAppReady] = useState(false)
  const [storedCredentials, setStoredCredentials] = useState("")
  // Import fonts for the project
  let [fontsLoaded] = useFonts({
    'Inter-SemiBold': 'https://rsms.me/inter/font-files/Inter-SemiBold.otf?v=3.12',
    'Inter-Bold': 'https://rsms.me/inter/font-files/Inter-Bold.otf?v=3.12',
    'Inter-Black': 'https://rsms.me/inter/font-files/Inter-Black.otf?v=3.12',
    'Inter-Regular': 'https://rsms.me/inter/font-files/Inter-Regular.otf?v=3.12',
    'Inter-Medium': 'https://rsms.me/inter/font-files/Inter-Medium.otf?v=3.12',
  });

  // const checkLoginCredentials = () =>{
  //     AsyncStorage.getItem('CarlosexchangeCredentials')
  //                 .then((result) => {
  //                   if(result !== null){
  //                     console.log(JSON.parse(result))
  //                     setStoredCredentials(JSON.parse(result));
  //                   }else{
  //                     setStoredCredentials(null)
  //                   }
  //                 })
  //                 .catch(err => {})
  // }

  if (!fontsLoaded & appReady) {
    return (
        <AppLoading />
      );
  } else {
    return (
        // <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}> 
          <RootStack/>
        // </CredentialsContext.Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
