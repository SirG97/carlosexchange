import React, { Component } from 'react';
import {ImageBackground, Image, StyleSheet, View, Text,  SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/native-stack";
import SelectDropdown from 'react-native-select-dropdown'
import { Bell } from "phosphor-react-native";
import Icon from 'react-native-vector-icons/Feather'

import colors from '../../assets/colors';

import { TextInput, Button } from 'react-native-paper';

const countries = ["Egypt", "Canada", "Australia", "Ireland"]
const Save = () => {
    const [text, onChangeText] = React.useState("");
    const [password, onChangePassword] = React.useState('');
    return(
        <React.Fragment>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.pageTitleContainer}>
                        <Text style={styles.pageTitle}>Sell</Text>
                    </View>
                    
                    <View style={styles.notificationContainer}>
                        <Bell weight="fill" color={colors.lightBlue} size={28}/>
                    </View>
                </View>

                <View style={styles.authFormContainer}>
                <View>
                    <Text style={styles.emailLabel}>Surname</Text>
                </View>
                
                <View style={[styles.dropdown,{ alignItems: 'center', justifyContent: 'center', width: '100%'}]}>
                    {/* <View style={styles.inputWithIcon}> */}
                      
                    <SelectDropdown
                        data={countries}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                        buttonStyle={styles.input}
                    />
                       
                        
                

                </View>

                <View>
                    <Text style={styles.emailLabel}>First name</Text>
                </View>
                
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    {/* <View style={styles.inputWithIcon}> */}
                      
                        <TextInput
                                style={styles.input}
                                mode='outlined'
                                // label='Enter your email'
                                // textContentType='string'
                                color='#7B8794'
                                outlineColor='#7B8794'
                                onChangeText={onChangeText}
                                placeholder="First name"
                                placeholderTextColor="#7B8794"
                                left={<TextInput.Icon name="account"  color={colors.text}/>}
                                value={text}
                                theme={{ colors: { text: colors.text } }}
                            >
                        </TextInput>
                       
                        
                

                </View>

                <View>
                    <Text style={styles.emailLabel}>Phone</Text>
                </View>
                
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    
                      
                        <TextInput
                                style={styles.input}
                                mode='outlined'
                                // label='Enter your email'
                                color='#7B8794'
                                outlineColor='#7B8794'
                                
                                onChangeText={onChangePassword}
                                placeholder="********"
                                placeholderTextColor="#7B8794"
                                left={<TextInput.Icon name="phone" color={colors.text}/>}
                                value={password}
                                theme={{ colors: { text: colors.text } }}
                            >
                        </TextInput>
                        <Button 
                            mode="contained" 
                            onPress={() => navigation.navigate('Dashboard')}
                            style={styles.startedBtn}>
                            Continue
                        </Button>
                        
                      
                </View>

            </View>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        // alignItems: 'center', 
        // justifyContent: 'center', 
        paddingTop: 32,
        paddingRight: 32,
        paddingLeft: 32,
       
    },

    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 22,
        // borderWidth: 2,
        // borderColor: 'red'
    },


    pageTitleContainer:{

    },

    pageTitle:{
        fontFamily: 'Inter-Bold',
        fontSize: 32,
        fontWeight: '300',
        // lineHeight: 24,
        color: colors.blue,
        marginBottom: 3
    },

    notificationContainer:{
        justifyContent: 'center',
        backgroundColor: colors.lightBlueBg,
        borderRadius: 10,
        paddingLeft: 8,
        paddingRight: 8,
    },

    authFormContainer:{
        alignItems: 'flex-start', 
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
      },

      registerTextContainer: {
        margin: 32,
        marginLeft: 32,
        marginBottom: 21,
        // borderColor: '#15169A',
        // borderWidth: 2,
      },
      
      loginTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: 32,
        fontWeight: '300',
        // lineHeight: 24,
        color: colors.blue,
        marginBottom: 3
    
      },

      loginSubTitle:{
        color: '#15169A',
        fontWeight: '400',
        fontFamily: 'Inter-Medium'
      },

      emailLabel:{
        fontSize: 12,
        lineHeight: 12,
        textTransform: 'uppercase',
        fontFamily: 'Inter-Black',
        color: '#323F4B'
      },

      inputWithIcon:{
      
        justifyContent: 'center',
        alignItems: 'center',
      },

      inputIcon:{
        position: 'absolute',
        
      },
      
      input: {
        // height: 52,
        margin: 12,
        width: '100%',
        // borderWidth: 1,
        // padding: 12,
        alignSelf: 'flex-start',
        borderRadius: 8,
        backgroundColor: 'white',
        fontFamily: 'Inter-Black',
        fontSize: 16,
        // borderWidth: 0.5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 25,
        marginTop: 5,
        color: colors.text,
        fontWeight: 'bold',
        
      },
      
      
      startedBtn:{
          width: '100%',
          paddingTop: 15,
          paddingBottom: 15,
          marginBottom: 40,
          borderRadius: 4,
          backgroundColor: colors.blue
      },

      authFooterLink:{
          flexDirection: 'row'
      },

      gotAccount:{
          fontSize: 16,
          fontFamily: 'Inter-SemiBold',
          color: colors.text,
          flexWrap: 'wrap'
      },

      signInLink:{
        paddingLeft: 20
      },

      signInText:{
          fontSize: 16,
          fontFamily: 'Inter-SemiBold',
          color: colors.blue,
          flexWrap: 'wrap'
      },

      forgotPassword:{
        marginTop: 20,
        color: colors.text,
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
      },
});

export default Save;