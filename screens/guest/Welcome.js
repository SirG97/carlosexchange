import React, { Component } from  'react';
import {StyleSheet, Dimensions, Button, StatusBar, Text, View, Image, TouchableOpacity, ImageBackground, } from 'react-native';
import { createStackNavigator } from "@react-navigation/native-stack";
// import {LinearGradient} from 'expo-linear-gradient';
import colors from '../../assets/colors';
import pattern from '../../assets/patterns/pattern';
// import * as Animatable from 'react-native-animatable';

var width = Dimensions.get('window').width; //full width
// var height = Dimensions.get('window').height; //full height


const Welcome = ({navigation}) => {
    return(
  
        
            <View style={styles.container}>
            <StatusBar backgroundColor={colors.theme} barStyle="light-content"/>
                <View style={styles.header}>
                <ImageBackground source={pattern.bg} style={styles.image} resizeMode='stretch' />
                <Image
                    style={styles.logo}
                    source={require("../../assets/carlogo.png")}
                />
                      
                   
                </View>
                    <View style={styles.footer} >
                        <Text style={styles.title}>Buy and Sell your crypto at the best rate</Text>
                        <Text style={styles.text}>Create a new account or sign in to get started</Text>
                        <View style={styles.button}>
                            <TouchableOpacity 
                                onPress={()=> navigation.navigate('Login')}
                                style={styles.signIn}>
                                <Text style={styles.textSign}>Get Started</Text>
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
      backgroundColor: '#4a42cf'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        justifyContent: "center",
        position: 'absolute',
        width: '100%', 
        height: '100%',
        opacity: 0.1,
       

      },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: colors.blue,
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
  });
export default Welcome;