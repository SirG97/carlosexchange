import React, { Component, useState, useEffect, useContext } from 'react';
import {ImageBackground, Image, StyleSheet, View, ScrollView, Text,  SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/native-stack";
import { Bell } from "phosphor-react-native";
import Icon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from '../../../../components/CredentialsContext';
import colors from '../../../../assets/colors';

import { TextInput, Button, List } from 'react-native-paper';
// import { WebView } from 'react-native-webview' 

const Chat = ({ route, navigation }) => {
    const html = `
                    <html>
                    <head></head>
                    <body>
                        <script src="//code.tidio.co/wcqmuqd0hj1qewznjknaz9skq0pmakeq.js"></script>
                    </body>
                    </html>
                `;
    return(
        <WebView 
            style={styles.container}
            source={{ html }}
            >

        </WebView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
    },


});

export default Chat;