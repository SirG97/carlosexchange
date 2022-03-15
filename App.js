import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { House, ArrowsLeftRight, Lightning,RocketLaunch, UserCircle, HouseLine } from "phosphor-react-native";
import { BottomNavigation } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import AppLoading from 'expo-app-loading';

import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Feather'

// Import the welcome and guest pages
import Welcome from './components/guest/Welcome';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import EmailVerification from './components/auth/EmailVerification';
import CompleteRegistration from './components/auth/CompleteRegistration';

// The authenticated pages
import Dashboard from './components/app/Dashboard';
import Transactions from './components/app/Transactions';
import Buy from './components/app/Buy';
import Sell from './components/app/Sell';
import Account from './components/app/Account';
import colors from './assets/colors';

// Create a stack for our navigation
const Stack = createNativeStackNavigator();

// Create the bottom navigation
bottomNav = BottomNavigation.SceneMap({

});

const Tab = createMaterialBottomTabNavigator();

const AppNavigator = () => {
  
  return(
    <Tab.Navigator 
          iconContainerSize={30}
          labelFontSize={30}
          barStyle={{ backgroundColor: colors.blue, paddingBottom: 10, paddingTop: 10, color: colors.altBlue}}
          activeColor="#F5A623"
          initialRouteName='Buy'
          inactiveColor={colors.text}
          shifting={false}
          >
        <Tab.Screen name='Home' 
                    title="Home"
                    component={Dashboard} 
                    // barStyle={{ backgroundColor: colors.blue, 
                    //   // width: '100%',
                    //   paddingBottom: 10, 
                    //   paddingTop: 10,
                    //   borderColor: "red",
                    //   color: colors.altBlue
                    // }}
                  
                    options={{
                      tabBarIcon: ({ color }) => (
                        <HouseLine weight="fill" color={color} style="bold" size={26} />
                      )}}
          />
        <Tab.Screen name='Transactions' 
                    component={Transactions} 
                    options={{headerShown:false,
                      tabBarIcon: ({ color }) => (
              <ArrowsLeftRight weight="fill" color={color} size={26} />
          )}}
          />
        <Tab.Screen name='Buy' 
                    component={Buy} 
                    options={{headerShown:false,
                      tabBarIcon: ({ color }) => (
                          <Lightning weight="fill" color={color} size={26} />
                       )}
          }/>
        <Tab.Screen name='Sell' 
                    component={Sell}       
                    options={{headerShown:false,
                              tabBarIcon: ({ color }) => (
                                <RocketLaunch weight="fill" color={color} size={26} />
                            )}
          }/>
        <Tab.Screen name='Account' 
                    component={Account}       
                    options={{headerShown:false,
                              tabBarIcon: ({ color }) => (
                                <UserCircle weight="fill" color={color} size={26} />
                )}
          }/>
    </Tab.Navigator>
  );
}

// // Delay the splash screen a little but
// SplashScreen.preventAutoHideAsync();
// setTimeout(SplashScreen.hideAsync, 2000);

const App =  () => {
  // Import fonts for the project
  let [fontsLoaded] = useFonts({
    'Inter-SemiBold': 'https://rsms.me/inter/font-files/Inter-SemiBold.otf?v=3.12',
    'Inter-Bold': 'https://rsms.me/inter/font-files/Inter-Bold.otf?v=3.12',
    'Inter-Black': 'https://rsms.me/inter/font-files/Inter-Black.otf?v=3.12',
    'Inter-Regular': 'https://rsms.me/inter/font-files/Inter-Regular.otf?v=3.12',
    'Inter-Medium': 'https://rsms.me/inter/font-files/Inter-Medium.otf?v=3.12',
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
     
        <NavigationContainer>
      
            <Stack.Navigator initialRouteName='Register' options={{headerShown:false}}
              screenOptions={{
                gestureEnabled: true
              }}
          >
                {/* Add different pages created to the stack */}
                <Stack.Screen
                  name="Dashboard"
                  component={AppNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name='Welcome' component={Welcome} options={{headerShown:false}}/>
                <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/>
                <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
                <Stack.Screen name='EmailVerification' component={EmailVerification} options={{headerShown:false}}/>
                <Stack.Screen name='CompleteRegistration' component={CompleteRegistration} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
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
