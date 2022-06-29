import React, { Component, useCallback, useState, useEffect, useContext } from 'react';
import {ImageBackground, Image, StyleSheet, View, ScrollView, Text,  SafeAreaView, Linking, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/native-stack";
import { Bell } from "phosphor-react-native";
import Icon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from '../../../../components/CredentialsContext';
import colors from '../../../../assets/colors';

import { TextInput, Button, List, Title, Caption, Headline, Paragraph } from 'react-native-paper';

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return <Button title={children} onPress={handlePress} />;
};
  

const Call = ({ route, navigation }) => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    return(
        <React.Fragment>
            <View style={styles.container}>
                <View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image}
                            resizeMode="contain"
                            source={require('../../../../assets/online-support.png')}
                        />
                    </View>

                    
                </View>
                <View style={styles.textContainer}>
                    <Title style={styles.text}>{"Hi, let's help you today"}</Title>
                    <Paragraph style={styles.text}>Phone lines are available between 8:00am and 5:00pm on weekdays</Paragraph>
                    
                    <Paragraph style={styles.text}>Tap the number to call</Paragraph>
                   
                    <TouchableOpacity onPress={async() =>{
                        await Linking.openURL('tel:07035209477');

                        }}>
                        <Text style={styles.number}>
                            07035209477
                        </Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </React.Fragment>
    );
}



const styles = StyleSheet.create({
    container:{
        flex: 1, 
        alignItems: 'center', 
        // justifyContent: 'center', 
        paddingRight: 25,
        paddingLeft: 25,
        backgroundColor: 'white'
    },

    image:{
        // flex: 1,
        width: '100%',
        height: 200,
        // marginLeft: 15,
        marginTop:35,
        // marginRight:15
    },
    imageContainer:{
        marginTop:50,
        height: 200,
        width: 200,
        borderRadius: 150,
        backgroundColor: colors.theme,
        overflow: 'hidden'
    },
    textContainer:{
        textAlign: 'center',
        marginTop: 50
    },
    text:{
        textAlign: 'center',
        paddingBottom:10
    },
    number:{
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.theme,
        fontSize: 20
    }



});

export default Call;