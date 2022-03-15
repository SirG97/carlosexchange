import React, { Component, useState } from  'react';
import {StyleSheet, Dimensions, Platform, Text, View,StatusBar, 
            Image, TouchableOpacity, ImageBackground, } from 'react-native';
import { createStackNavigator } from "@react-navigation/native-stack";
import {LinearGradient} from 'expo-linear-gradient';
import { TextInput, Button } from 'react-native-paper';
import { IconContext, EnvelopeSimple, Heart, Cube } from "phosphor-react-native";
import colors from '../../assets/colors';
import pattern from '../../assets/patterns/pattern';
import * as Animatable from 'react-native-animatable';
// import FontAwesome from 'react-native-vecotr-icons/';
import Icon from 'react-native-vector-icons/Feather'
import {Octicons, Ionicons} from '@expo/vector-icons'

import axios from 'axios';
var width = Dimensions.get('window').width; //full width
// var height = Dimensions.get('window').height; //full height
// <StatusBar backgroundColor={colors.theme} barStyle="light-content"/>

const EmailVerification = ({navigation}) => {
    const [code, setCode] = useState();
    return(
      
            <View style={styles.container}>
         
                <View style={styles.header}>     
                    <View style={styles.iconbg}>
                        <Octicons name='mail-read' size={125} color={colors.blue} />
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.pageTitle}>Account Verification</Text>
                    <View>
                        <Text style={styles.infoText}>
                            <Text>Enter the code sent to your email </Text>
                            <Text style={styles.emphasize}>sirgittarus@gmail.com</Text> 
                            <Text> to verify your email</Text>
                        </Text>
                        <View style={styles.action}>
                        <TextInput
                            label="Code"
                            value={code}
                            style={styles.input}
                            mode='outlined'
                            onChangeText={(code) => setCode(code)}
                            placeholderTextColor="#7B8794"
                            left={<TextInput.Icon name="shield"  color={colors.text}/>}
                            theme={{ colors: { text: colors.text } }}
                            activeOutlineColor={colors.theme}/>
                        
                    </View>
                    </View>
                    
                    <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('CompleteRegistration')}>
                    
                        <LinearGradient
                            style={styles.signIn}
                            colors={['#4a42cf','#4a42cf']}>
                            <Text style={styles.textSign}>Verify<Text> </Text>
                             <Ionicons name="arrow-forward-circle" size={20} />
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.signUpLink}
                        onPress={()=> navigation.navigate('Login')}>
                        <Text style={styles.signUpLinkText}>{"Didn't receive the email? "} Click <Text>Resend</Text> in 60 second(s)</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
       

    )
    
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff',
      padding: 25
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center'

    },

    footer: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#fff',
    },

    iconbg:{
        
        backgroundColor: 'rgba(105, 98, 218, 0.1)',
        width: 250,
        height: 250,
        borderRadius: 250,
        justifyContent: 'center',
        alignItems: 'center'
       
    },

    pageTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10,
        textAlign: 'center',
        color: colors.blue
    },
    infoText: {
        color: colors.text,
        fontSize: 15
    },
    emphasize: {
        fontWeight: 'bold'
    },
    button: {
        alignItems: 'center',
        marginBottom: 5,
        width: '100%',
        height:55,
        backgroundColor: colors.theme,
        borderRadius: 7
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
       
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        
    },
    signUpLink:{
        marginTop: 20,
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        
    },
    signUpLinkText:{
        fontWeight: 'bold',
        color: colors.text,
        fontSize: 16
    },
  });
export default EmailVerification;