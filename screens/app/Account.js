import React, { Component, useState, useEffect, useContext } from 'react';
import {ImageBackground, Image, StyleSheet, View, ScrollView, Text,  SafeAreaView, TouchableOpacity } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from "@react-navigation/native-stack";
// import { Bell } from "phosphor-react-native";
// import Icon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from '../../components/CredentialsContext';
import colors from '../../assets/colors';

import { List } from 'react-native-paper';


const Account = ({ route, navigation }) => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    return(
        <React.Fragment>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.pageTitleContainer}>
                        <Text style={styles.pageTitle}>Account</Text>
                    </View>
                </View>
                <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.body}>
                    <List.Item
                        style={styles.listItem}
                        title="Profile"
                        titleStyle={styles.listItemTitle}
                        description='Access profile and bank details'
                        descriptionStyle={styles.listItemDescription}
                        left={props => <List.Icon {...props} style={styles.leftListIcon} color={colors.blue} icon="account-outline" />}
                        right={props => <List.Icon {...props} style={styles.rightListIcon} color={colors.blue} icon="chevron-right" />}
                        onPress={() => {navigation.navigate('Profile')}}
                    />
          
                    <List.Item
                        style={styles.listItem}
                        title="Referrals"
                        titleStyle={styles.listItemTitle}
                        description='Refer friends and earn money'
                        descriptionStyle={styles.listItemDescription}
                        left={props => <List.Icon {...props} style={styles.leftListIcon} color={colors.blue} icon="tag-multiple-outline" />}
                        right={props => <List.Icon {...props} style={styles.rightListIcon} color={colors.blue} icon="chevron-right" />}
                        onPress={() => {navigation.navigate('Referrals')}}
                    />
                    <List.Item
                        style={styles.listItem}
                        title="Notifications"
                        titleStyle={styles.listItemTitle}
                        description='Get instant notifications'
                        descriptionStyle={styles.listItemDescription}
                        left={props => <List.Icon {...props} style={styles.leftListIcon}  color={colors.blue} icon="bell-outline" />}
                        right={props => <List.Icon {...props} style={styles.rightListIcon} color={colors.blue} icon="chevron-right" />}
                        onPress={() => {navigation.navigate('Notifications')}}
                    />
                    <List.Item
                        style={styles.listItem}
                        title="FAQ"
                        titleStyle={styles.listItemTitle}
                        description='Questions you might have about us'
                        descriptionStyle={styles.listItemDescription}
                        left={props => <List.Icon {...props} style={styles.leftListIcon} color={colors.blue} icon="chat-outline" />}
                        right={props => <List.Icon {...props} style={styles.rightListIcon} color={colors.blue} icon="chevron-right" />}
                        onPress={() => {navigation.navigate('FAQ')}}
                    />
                    <List.Item
                        style={styles.listItem}
                        title="Terms & Conditions"
                        titleStyle={styles.listItemTitle}
                        description='Read our terms and conditions'
                        descriptionStyle={styles.listItemDescription}
                        left={props => <List.Icon {...props} style={styles.leftListIcon} color={colors.blue} icon="exclamation-thick" />}
                        right={props => <List.Icon {...props} style={styles.rightListIcon} color={colors.blue} icon="chevron-right" />}
                        onPress={() => {navigation.navigate('Terms')}}
                     />
                    <List.Item
                        style={styles.listItem}
                        title="Contact us"
                        titleStyle={styles.listItemTitle}
                        description='Contact us if you have any questions'
                        descriptionStyle={styles.listItemDescription}
                        left={props => <List.Icon {...props} style={styles.leftListIcon} color={colors.blue} icon="card-account-phone-outline" />}
                        right={props => <List.Icon {...props} style={styles.rightListIcon} color={colors.blue} icon="chevron-right" />}
                        onPress={() => {navigation.navigate('Contact')}}
                    />
                    <List.Item
                        style={styles.listItem}
                        title="Security"
                        titleStyle={styles.listItemTitle}
                        description='Change your password'
                        descriptionStyle={styles.listItemDescription}
                        left={props => <List.Icon {...props} style={styles.leftListIcon} color={colors.blue} icon="account-lock-outline" />}
                        right={props => <List.Icon {...props} style={styles.rightListIcon} color={colors.blue} icon="chevron-right" />}
                        onPress={() => {navigation.navigate('Security')}}
                    />
                    <List.Item
                        style={styles.listItem}
                        title="Sign out"
                        titleStyle={styles.listItemTitle}
                        description='Logout of this device'
                        descriptionStyle={styles.listItemDescription}
                        left={props => <List.Icon {...props} style={styles.leftListIcon} color={colors.blue} icon="logout" />}
                        right={props => <List.Icon {...props} style={styles.rightListIcon} color={colors.blue} icon="chevron-right" />}
                        onPress={() =>{
                            AsyncStorage.removeItem('CarlosexchangeCredentials')
                                        .then(() => {
                                            setStoredCredentials('')
                                        })
                                        .catch((err) =>{

                                        })
                        }}
                        />
                </ScrollView>

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
        paddingRight: 15,
        paddingLeft: 15,
        backgroundColor: 'white'
       
    },
    body:{
        marginTop: 10,
        // borderWidth: 1,
    },

    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: 'white',
        paddingRight: 0,
        paddingLeft: 0,
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
        paddingLeft: 10,
        paddingRight: 10,
    },
    listItemTitle:{
        fontFamily: 'Inter-Medium',
        marginLeft: -7
    },
    listItemDescription:{
        fontFamily: 'Inter-Regular',
        fontSize: 13,
        marginLeft: -7,
        marginRight: -10
    },
    listItem:{
        borderWidth: 1.5,
        borderRadius: 5,
        borderColor: colors.lightBlueBg,
        paddingTop: -10,
        paddingBottom: -10,
        marginBottom:12
    },
    leftListIcon:{
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: colors.lightBlueBg,
        marginLeft: -2,
        
    },
    rightListIcon:{
        borderRadius: 15,
        // borderWidth: 1.5,
        borderColor: colors.lightBlueBg,
        marginRight: -10
    }

});

export default Account;