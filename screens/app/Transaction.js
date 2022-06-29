import React, { Component, useState,useRef, useEffect, useContext } from 'react';
import {ImageBackground, Image, StyleSheet, Pressable, View, Text,  SafeAreaView, ScrollView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from "@react-navigation/native-stack";
// import { Bell } from "phosphor-react-native";
// import {Shadow} from 'react-native-shadow-2';
// import Icon from 'react-native-vector-icons/Feather';
// import DropShadow from "react-native-drop-shadow";
import colors from '../../assets/colors';
// import RBSheet from "react-native-raw-bottom-sheet";
// import pattern from '../../assets/patterns/pattern';
// import {Octicons, Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from '../../components/CredentialsContext';
import { TextInput, Button, RadioButton, List, Divider, Checkbox, TouchableRipple,  DataTable, Card, Subheading, Caption, Headline, Title, Paragraph, ActivityIndicator} from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler'
import css  from '../../assets/css/Styles'
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
// import moment from "moment";

import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import MessageModal from '../../components/modals/MessageModal';
const Transaction = ({ route, navigation }) => {
    const { transaction, coin } = route.params.data
    // console.log(transaction, coin, 'The route param is ', route.params)

    return(
        <React.Fragment>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{overflow: 'visible'}} contentContainerStyle={{padding: 1}}>
                    <View style={styles.authFormContainer} itemStyle={styles.input}>
                        <View style={styles.amountContainer}>
                        <Card style={styles.amountCard} elevation={1}>
                            <Card.Content style={styles.amountCardContent} >
                                <Title style={styles.amountCardTitle}>${transaction.amount_usd} {transaction.coin}</Title>
                                <Paragraph style={styles.amountCardParagraph}>Crypto Widthrawal</Paragraph>
                            </Card.Content>
                        </Card>
                        </View>
                        <View style={styles.txnInfoContainer}>
                           
                            <Subheading>Transaction Details</Subheading>
                            <View style={styles.txnList}>
                                <View style={styles.txnContent}>
                                    <View style={styles.txnKey}>
                                        <Text style={styles.txnKeyText}>Transaction ref</Text>
                                    </View>
                                    <View style={styles.txnVal}>
                                        <Text style={styles.txnValText}>{transaction.trx_ref}</Text>
                                    </View>
                                </View>
                                <View style={styles.txnContent}>
                                    <View style={styles.txnKey}>
                                        <Text style={styles.txnKeyText}>Status</Text>
                                    </View>
                                    <View style={[styles.txnVal]}>
                                        <View>
                                        <Text style={[styles.txnValText, transaction.status == 'success'? css.successPill : transaction.status == 'pending'? css.warningPill : css.dangerPill]}>
                                                {transaction.status}
                                        </Text>
                                          
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.txnContent}>
                                    <View style={styles.txnKey}>
                                        <Text style={styles.txnKeyText}>Transaction</Text>
                                    </View>
                                    <View style={styles.txnVal}>
                                        <Text style={[styles.txnValText,styles.capitalize]}>{transaction.transaction_type}</Text>
                                    </View>
                                </View>
                                <View style={styles.txnContent}>
                                    <View style={styles.txnKey}>
                                        <Text style={styles.txnKeyText}>Coin</Text>
                                    </View>
                                    <View style={styles.txnVal}>
                                        <Text style={styles.txnValText}>{transaction.coin}</Text>
                                    </View>
                                </View>

                                <View style={styles.txnContent}>
                                    <View style={styles.txnKey}>
                                        <Text style={styles.txnKeyText}>Coin Network</Text>
                                    </View>
                                    <View style={styles.txnVal}>
                                        <Text style={styles.txnValText}>{transaction.coin_network}</Text>
                                    </View>
                                </View>

                                <View style={styles.txnContent}>
                                    <View style={styles.txnKey}>
                                        <Text style={styles.txnKeyText}>Address</Text>
                                    </View>
                                    <View style={styles.txnVal}>
                                        <View>
                                            <Text style={styles.txnValText}>{ transaction.wallet_address} </Text>
                                            
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.txnContent}>
                                    <View style={styles.txnKey}>
                                        <Text style={styles.txnKeyText}>Bank</Text>
                                    </View>
                                    <View style={styles.txnVal}>
                                        <Text style={styles.txnValText}>{transaction.bank_name}</Text>
                                    </View>
                                </View>

                                <View style={styles.txnContent}>
                                    <View style={styles.txnKey}>
                                        <Text style={styles.txnKeyText}>A/C Number</Text>
                                    </View>
                                    <View style={styles.txnVal}>
                                        <Text style={styles.txnValText}>{transaction.account_number}</Text>
                                    </View>
                                </View>
                                <View style={styles.txnContent}>
                                    <View style={styles.txnKey}>
                                        <Text style={styles.txnKeyText}>A/C Name</Text>
                                    </View>
                                    <View style={styles.txnVal}>
                                        <Text style={styles.txnValText}>{transaction.account_name}</Text>
                                    </View>
                                </View>
                                <View style={styles.txnContent}>
                                    <View style={styles.txnKey}>
                                        <Text style={styles.txnKeyText}>Amount</Text>
                                    </View>
                                    <View style={styles.txnVal}>
                                        <CurrencyFormat value={transaction.amount} 
                                            displayType={'text'} 
                                            thousandSeparator={true} 
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            isNumericString={true}
                                            prefix={'₦'}
                                            renderText={value => <Text style={styles.txnValText}>{value}</Text>}  />
                                    </View>
                                </View>
                          
                            </View>
                                
                        </View>  
                       
                    </View>
                
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
        paddingTop: 0,
        paddingRight: 15,
        paddingLeft: 15,
        backgroundColor: '#fff',
        paddingBottom: 30
       
    },
    amountContainer: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    amountCard:{
        width: '100%',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        paddingLeft: -40,
        paddingRight: -40,
        alignItems: 'center',
    },

    amountCardContent:{
        textAlign: 'center',
        margin: 'auto',
        width: '100%',

    },

    amountCardTitle:{
        fontWeight: '600',
        fontSize: 40,
        color: colors.text,
        height: 60,
        width: 250,
        paddingTop: 25,
        textAlign: 'center'
    },

    amountCardParagraph:{
        fontWeight: '500',
        fontSize: 16,
        color: colors.text,
        textAlign: 'center',
       
    },

    txnInfoMsg:{
        paddingTop: 5,
        // marginTop: 15,
        fontWeight: '400',
        fontSize: 15,
        color: colors.red,
        textAlign: 'left'
    },
    txnInfoContainer: {
        // borderWidth: 1,
        width: '100%'
    },

    txnContent:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddf',
        paddingTop: 12,
        paddingBottom: 12
        
    },

    txnList:{
    //    marginLeft: -32,
    //    marginRight: -32
        
    },

    txnValContainer:{
        borderWidth: 1,
        marginRight:24,
        justifyContent: 'center', 
        alignItems: 'center'
    },

    txnKeyContainer:{
        marginLeft: 24
    },
    txnKey:{
        fontWeight: '700',
        color: '#000',
        fontSize: 18,
        // borderWidth:1
    },

    txnKeyText:{
        fontWeight: '700',
        color: '#444', 
        fontSize: 16,
    },

    txnValText:{
        fontWeight: '700',
        color: colors.text, 
        fontSize: 16,
        width: '100%',
        textAlign: 'right'
    },

    txnVal:{
       
        width: 220,
        textAlign: 'left',
        margin: 'auto',
        // borderWidth: 1,
        flexGrow:1,
        alignItems: 'flex-end'
    },

    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 22,
    },

    conversion:{
       marginTop: 9,
       
    },
    conversionText:{
        fontWeight: 'bold', 
        color: colors.text
    },
    radiobuttonView:{
        // flex:1,
        flexDirection: 'row',
        // alignSelf: 'flex-end',
        justifyContent: 'space-between', 
        
        width: '100%',
        borderColor: '#000',
        // borderWidth: 1,
        marginTop: -15
    },
    radiobutton:{
        flexDirection: 'row',
        borderColor: '#000',
        // borderWidth: 1,
    },

    agreeButton:{
        flexDirection: 'row',
        // marginLeft: -1,
        width: '100%',
        marginBottom: 15
    },

    agreeButtonText:{
        fontSize:14,
        color: colors.text,
        marginTop: 5,
        width: '100%',
        paddingRight: 35
    
    },

    radiobuttonInner:{
        flexDirection: 'row',
        borderColor: '#000',
        // borderWidth: 1,
    },

    radioText:{
        marginTop: 9,
        color: colors.text,
        fontWeight: 'bold',
    },

    radioButton:{
        color: colors.theme,
        backgroundColor: colors.primary
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
        marginBottom: 15,
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

      button: {
        alignItems: 'center',
        width: '100%',
    },

    toast:{
      marginTop: -10,
      marginBottom: 15
    },

    success:{
      color: colors.green
    },

    error:{
      color: colors.red
    },

    info:{
      color: colors.yellow
    },
    listTitleStyle:{
        fontWeight: 'bold',
        fontSize: 18
    },
    pill:{
        borderRadius: 20,
        paddingLeft: 10,
        marginLeft: 5,
        borderWidth: 1,
        backgroundColor: colors.red
    },
    capitalize:{
        textTransform: 'capitalize'
    }
});

export default Transaction;