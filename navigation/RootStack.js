import React, {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import {CredentialsContext} from '../components/CredentialsContext'
// import { House, ArrowsLeftRight, Lightning,RocketLaunch, UserCircle, HouseLine } from "phosphor-react-native";

// Import the welcome and guest pages
import Welcome from "../screens/guest/Welcome";
import Register from '../screens/auth/Register';
import Login from '../screens/auth/Login';
// import EmailVerification from '../screens/auth/EmailVerification';
// import CompleteRegistration from '../screens/auth/CompleteRegistration';



const Stack = createNativeStackNavigator();

const RootStack = () => {
   return (
         <NavigationContainer>
           <Stack.Navigator initialRouteName="Welcome" options={{ headerShown: false }} screenOptions={{ gestureEnabled: true }}>
                 <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
                 <Stack.Screen name="Register"  component={Register} options={{ headerShown: false }} />
                 <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
           </Stack.Navigator>
         </NavigationContainer>
   );
}



export default RootStack;