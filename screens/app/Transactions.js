import React, { Component, useEffect, useState, useContext } from 'react';
import {ImageBackground, Image, StyleSheet, View, Text,  SafeAreaView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from "@react-navigation/native-stack";
// import { Bell } from "phosphor-react-native";
import {Shadow} from 'react-native-shadow-2';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {CredentialsContext} from '../../components/CredentialsContext';
// import Icon from 'react-native-vector-icons/Feather';
// import DropShadow from "react-native-drop-shadow";
import colors from '../../assets/colors';
import pattern from '../../assets/patterns/pattern';
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { List, ActivityIndicator,} from 'react-native-paper';
import css  from '../../assets/css/Styles'
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
import moment from "moment";


const Transactions = ({navigation, route}) => {
    const [loading, setLoading] = useState(true);
    const [completedTransactions, setCompletedTransactions] = React.useState(0);
    const [transactions, setTransactions] = React.useState([]);

    const getToken = async() => {
        await AsyncStorage.getItem('CarlosexchangeCredentials')
         .then((result) => {
           if(result !== null){
             result = JSON.parse(result)
             
             const {token, user} = result


             getTransactions(token)
           }else{
             console.log('Nothing found')
           }
         })
         .catch(err => {
             console.log('Error is from here', err)
         })
     }
 
     const getTransactions = async(token) => {
         // console.log('token is ',token)
         const config = {
             headers:{
               Authorization: `Bearer  ${token}`,
               'auth-token': token
               
             }
           };
         const url = 'https://app.carlosexchange.com/api/user/transactions';
         await axios.get(url, config).then((response) => {
             const result = response.data
             console.log('Transaction result ',result)
           
             setCompletedTransactions(result.data.completedTransactions| 0)
            
             setTransactions(result.data.transactions)
             setLoading(false)
             console.log(result.data)  
         }).catch((err) =>{
             console.log('Transaction error info: ', err)
         })
 
     }
 
     const renderTransactions = ({item}) => {
         return(
             
             <List.Item
                     title={item.transaction_type === 'sell'? `${item.coin} sell order`: `${item.coin} buy order`}
                     description={moment(item.created_at).format("YYYY-MM-DD h:mm:ss a")}
                     left={props => <List.Icon 
                                         color={colors.white} 
                                         style={item.transaction_type === 'sell'? styles.debit: styles.credit} 
                                         icon={item.transaction_type === 'sell'? 'arrow-down': 'arrow-up'}
                                         titleStyle={styles.listTitleStyle} />}
                     right={props =>
                         <View style={styles.flex}>
                             <Text>
                                     <CurrencyFormat value={item.amount_usd} 
                                     decimalScale={2}
                                     fixedDecimalScale={true}
                                     displayType={'text'} 
                                     thousandSeparator={true} 
                                     prefix={'$'}
                                     renderText={value => <Text>{value}</Text>}  />
                             </Text>
                             <Text style={[item.status == 'success'? css.successPill : item.status == 'pending'? css.warningPill : css.dangerPill]}>{item.status == 'success'? `success`: item.status == 'pending'? `pending` : `error`}</Text>
                         </View>
                     }
 
                     onPress={() => {
                        navigation.navigate('Transaction', {data: {transaction: item}})
                     }}
                 />
               
             
         )
       }
 
     useEffect( () => {
        getToken();
       }, [])

    return(
        <React.Fragment>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.pageTitleContainer}>
                        <Text style={styles.pageTitle}>Transactions</Text>
                    </View>
                    
                </View>
                <View style={styles.overviewContainer}>
                    <Shadow
                        distance={5}
                        startColor={'#00000010'}
                        containerViewStyle={{marginVertical: 0}}
                        radius={8}>
                        <View style={[styles.card, {marginVertical: 0}]}>
                        
                        <ImageBackground 
                            source={pattern.dashboard} 
                            style={styles.dashboardBg} 
                            resizeMode="cover"
                            imageStyle={{ resizeMode: 'repeat' }}>
                            <View style={styles.balance}>
                                <View style={{flex: 1, height: 80, marginLeft: 16, justifyContent: 'center'}}>
                                    <Text style={styles.balTitle}>Trade Completed</Text>
                                    <Text style={styles.balFigure}>{completedTransactions}</Text> 
                                </View>
                            </View>
                        </ImageBackground>
                    
                        </View>
                    </Shadow>
                </View>


               
               <View >
                    <Text style={styles.titleText}>Your Transactions</Text>
                    <Text>All activities in your account</Text>
                </View>

               <View style={styles.listContainer}>
                    {loading ? <ActivityIndicator/> : (
                        <View>
                        {transactions == false ? 
                            <View style={styles.emptyRecent}>
                                <Text>No activity yet</Text>
                            </View>: 
                            (
                                <FlatList
                                    scrollEnabled={true}
                                    showsVerticalScrollIndicator={false}
                                    data={transactions}
                                    keyExtractor={({ id }, index) => id}
                                    renderItem={renderTransactions}
                                    />
                               
                               
                            )
                        }
                        </View>
                    )}
                </View>
              
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    flex:{
        flex: 1, 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
    },
    container:{
        flex: 1, 
        // alignItems: 'center', 
        // justifyContent: 'center', 
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15,
       
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

    overviewContainer:{
        marginTop: 31,
        marginBottom: 10,
        width: '100%'
    },

    dashboardBg:{
        width: '100%',
        height: 80,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.23,
        shadowRadius: 7.62,

        elevation: 4,
    },

    balance: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    heading: {
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
        marginBottom: 13,
        width: '100%',
        borderColor: 'red',
    },
    card: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: '100%',
    marginVertical: 10,
    },
    elevation: {
    elevation: 20,
    shadowColor: '#000000',
    },

    shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    },

    balTitle:{
        fontFamily: 'Inter-Regular',
        color: 'white',
        fontSize: 16,
        lineHeight: 32
    },
    balFigure:{
        fontFamily: 'Inter-Bold',
        color: 'white',
        fontSize: 32
    },

    lastContribution:{
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom:16,
        borderRadius: 8,
        elevation: 4,
        marginBottom: 30
    },

    lastContributionbalTitle:{
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
    lineHeight: 32
    },
    lastContributionbalFigure:{
        fontFamily: 'Inter-Bold',
        color: 'black',
        fontSize: 32
    },
    titleText:{
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: colors.grey800
    },

    listContainer:{
       flex: 1,
        marginLeft: -16,
        marginRight: -8,
    },


    debit:{
        backgroundColor: colors.red,
        borderRadius: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },

    credit:{
        
        backgroundColor: colors.green,
        borderRadius: 10
    },

});

export default Transactions;