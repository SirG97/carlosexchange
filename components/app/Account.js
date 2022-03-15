import React, { Component } from 'react';
import {ImageBackground, Image, StyleSheet, View, Text,  SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/native-stack";
import { Bell } from "phosphor-react-native";
import Icon from 'react-native-vector-icons/Feather'

import colors from '../../assets/colors';

import { TextInput, Button } from 'react-native-paper';


const Account = () => {
    return(
        <React.Fragment>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.pageTitleContainer}>
                        <Text style={styles.pageTitle}>Account</Text>
                    </View>
                    
                    <View style={styles.notificationContainer}>
                        <Bell weight="fill" color={colors.lightBlue} size={28}/>
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
});

export default Account;