import React, { Component, useState, useEffect, useRef, useContext } from 'react';
import {ImageBackground, StyleSheet, View, Text,  SafeAreaView, ScrollView, Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
// import { createStackNavigator } from "@react-navigation/native-stack";
import { Bell } from "phosphor-react-native";
import {Shadow} from 'react-native-shadow-2';
// import Icon from 'react-native-vector-icons/Feather';
// import DropShadow from "react-native-drop-shadow";
import colors from '../../assets/colors';
import pattern from '../../assets/patterns/pattern';
// import {Octicons, Ionicons} from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from '../../components/CredentialsContext';
import { List, ActivityIndicator } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler'
import css  from '../../assets/css/Styles'
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
import moment from "moment";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import MainContainer from '../../components/containers/MainContainer';

const Dashboard = ({navigation, route}) => {
    const [name, setName] = React.useState('');
    const [totalTrade, setTotalTrade] = React.useState(0);
    const [pendingTrade, setPendingTrade] = React.useState(0);
    const [tradeVolume, setTradeVolume] = React.useState('0');
    const [referralBalance, setReferralBalance] = React.useState('0');
    const [loading, setLoading] = useState(true);
    const [transactions, setRecentTransactions] = React.useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    const notificationListener = useRef();
    const responseListener = useRef();
    const isFocused = useIsFocused()
    const [notification, setNotification] = useState(false);
    const refresh = () =>{

    }

    const getSellDetails = async() => {

    }

    const buySellDetails = async() => {
        
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
    }
    const getUserDetails = async() => {
    //    await AsyncStorage.getItem('CarlosexchangeCredentials')
    //     .then((result) => {
    //       if(result !== null){
    //         result = JSON.parse(result)
            
    //         const {token, user} = result
            console.log(storedCredentials.user)
        
            // console.log('The data is in dashboard', user)
            // console.log('Full result is ', result)
            if(storedCredentials.user.name != null){
                setName(storedCredentials.user.name.split(' ')[0]);
            
            }else{
                setName(storedCredentials.user.first_name)
            }

            // console.log(result.data.token)
            dashboardInfo(storedCredentials.token)
        //   }else{
        //     console.log('Nothing found')
        //   }
        // })
        // .catch(err => {
        //     console.log('Error is from here', err)
        // })
    }

    const dashboardInfo = async(token) => {
        // console.log('token is ',token)
        const config = {
            headers:{
              Authorization: `Bearer  ${token}`,
              'auth-token': token
            }
          };
        const url = 'https://app.carlosexchange.com/api/user/dashboard';
        await axios.get(url, config).then((response) => {
            const result = response.data
           
            setTotalTrade(result.data.totalTransaction)
            setPendingTrade(result.data.pendingTransaction);
            setTradeVolume(result.data.totalVolume| 0)
            setReferralBalance(referralBalance == false ? '0': referralBalance)
            setRecentTransactions(result.data.transactions)
            setLoading(false)
            // console.log(result.data.transactions)
        }).catch((err) =>{
            console.log('Dashboard info: ', err)
        })

    }

    const saveExpoTokenToDB = async(token) => {
        // console.log('token is ',token)
        const url = 'https://app.carlosexchange.com/api/user/savetoken';
        const config = {
            headers:{
              Authorization: `Bearer  ${storedCredentials.token}`,
              'auth-token': storedCredentials.token
            }
          };
        const data = {
            expo_token : token
        }
        await axios.post(url, data, config).then((response) => {
            const result = response.data
            console.log('Notification token saved successfully')
        }).catch((err) =>{
            console.log('Error saving expo token: ', err)
        })

    }

    const renderRecentTransaction = ({item}) => {
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
                        // if(item.status !== 'pending'){
                            navigation.navigate('Transaction', {data: {transaction: item}})
                        // }else{
                        //     if(item.transaction_type === 'sell'){

                        //         navigation.navigate('PendingSellTransaction', {data: {transaction: item}})
                        //     }else{
                        //         navigation.navigate('SelectBuyBank',{data: {transaction: item}})
                        //     }
                        // }
                        console.log('Transaction ',item)
                    }}
                />
              
            
        )
      }

    useEffect( () => {
       getUserDetails();

      }, [])

      useEffect(() => {
        if(isFocused){
            getUserDetails();
        }
      }, [isFocused])

      useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            // setExpoPushToken(token)
            if(token !== storedCredentials.user.expo_token){
                // This means our expo token column is empty so lets update item
                saveExpoTokenToDB(token)
            }else{
                console.log('we good bro')
            }

        });
    
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);

    return(
    
            <MainContainer>
                <View style={styles.header}>
                    <View style={styles.pageTitleContainer}>
                        <Text style={styles.pageTitle}>Hello {name}</Text>
                    </View>
                    
                    <View style={styles.notificationContainer}>
                        <Bell weight="fill" color={colors.lightBlue} size={28}/>
                    </View>
                </View>
                <View style={styles.overviewContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} vertical={true}>
                        <View style={styles.overviewItems}>
                            <Shadow
                                distance={5}
                                startColor={'#00000010'}
                                containerViewStyle={{marginVertical: 0}}
                                radius={8}>
                                <View style={[styles.card, {marginVertical: 0, width: 250}]}>
                                
                                <ImageBackground 
                                    source={pattern.dashboard} 
                                    style={styles.dashboardBg} 
                                    resizeMode="cover"
                                    imageStyle={{ resizeMode: 'repeat' }}>
                                    <View style={styles.balance}>
                                        <View style={{flex: 1, height: 130, marginLeft: 16, justifyContent: 'center'}}>
                                            <Text style={styles.balTitle}>Total trades</Text>
                                            <Text style={styles.balFigure}>{totalTrade}</Text> 
                                        </View>
                                    </View>
                                </ImageBackground>
                            
                                </View>
                            </Shadow>
                            </View>
                            <View style={styles.overviewItems}>
                                <Shadow
                                    distance={5}
                                    startColor={'#00000010'}
                                    containerViewStyle={{marginVertical: 0}}
                                    radius={8}>
                                    <View style={[styles.card, {marginVertical: 0, width: 250}]}>
                                    
                                    <ImageBackground 
                                        source={pattern.dashboard} 
                                        style={styles.dashboardBg} 
                                        resizeMode="cover"
                                        imageStyle={{ resizeMode: 'repeat' }}>
                                        <View style={styles.balance}>
                                            <View style={{flex: 1, height: 130, marginLeft: 16, justifyContent: 'center'}}>
                                                <Text style={styles.balTitle}>Pending trade</Text>
                                                <Text style={styles.balFigure}>{pendingTrade}</Text> 
                                            </View>
                                        </View>
                                    </ImageBackground>
                                
                                    </View>
                                </Shadow>
                            </View>
                            <View style={styles.overviewItems}>
                                <Shadow
                                    distance={5}
                                    startColor={'#00000010'}
                                    containerViewStyle={{marginVertical: 0}}
                                    radius={8}>
                                    <View style={[styles.card, {marginVertical: 0, width: 250}]}>
                                    
                                    <ImageBackground 
                                        source={pattern.dashboard} 
                                        style={styles.dashboardBg} 
                                        resizeMode="cover"
                                        imageStyle={{ resizeMode: 'repeat' }}>
                                        <View style={styles.balance}>
                                            <View style={{flex: 1, height: 130, marginLeft: 16, justifyContent: 'center'}}>
                                                <Text style={styles.balTitle}>Trade volume</Text>
                                                
                                                <Text style={styles.balFigure}>
                                                  
                                                   <CurrencyFormat value={tradeVolume} 
                                                                   displayType={'text'} 
                                                                   thousandSeparator={true} 
                                                                   prefix={'₦'}
                                                                   renderText={value => <Text>{value}</Text>}  />
                                                </Text> 
                                            </View>
                                        </View>
                                    </ImageBackground>
                                
                                    </View>
                                </Shadow>
                            </View>
                            <View style={styles.overviewItems}>
                            <Shadow
                                distance={5}
                                startColor={'#00000010'}
                                containerViewStyle={{marginVertical: 0}}
                                radius={8}>
                                <View style={[styles.card, {marginVertical: 0, width: 250}]}>
                                
                                <ImageBackground 
                                    source={pattern.dashboard} 
                                    style={styles.dashboardBg} 
                                    resizeMode="cover"
                                    imageStyle={{ resizeMode: 'repeat' }}>
                                    <View style={styles.balance}>
                                        <View style={{flex: 1, height: 130, marginLeft: 16, justifyContent: 'center'}}>
                                            <Text style={styles.balTitle}>Referral bonus</Text>
                                            <Text style={styles.balFigure}>
                                            <CurrencyFormat value={referralBalance} 
                                                            displayType={'text'} 
                                                            thousandSeparator={true} 
                                                            prefix={'₦'}
                                                            renderText={value => <Text>{value}</Text>}  />
                                           </Text> 
                                        </View>
                                    </View>
                                </ImageBackground>
                            
                                </View>
                            </Shadow>
                        </View>
                     
                    </ScrollView>
                </View>
             
               

               <View style={styles.listContainer}>
                              
                    {loading ? <ActivityIndicator/> : (
                        <View>
                                <View style={styles.listTitle}>
                                        <Text style={styles.titleText}>Recent Transactions</Text>
                                        <Text>Recent activities in your account</Text>
                                </View>
                        {transactions == false ? 
                            <View style={styles.emptyRecent}>
                                <Text>No activity yet</Text>
                            </View>: 
                            (
                                <View>

                                    <FlatList
                                    data={transactions}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={({ id }, index) => id}
                                    renderItem={renderRecentTransaction}
                                    refreshing={refreshing}
                                    onRefresh={refresh}
                                    />
                                </View>
                            )
                        }
                        </View>
                    )}
               </View>
              
            </MainContainer>
      
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
        textTransform: 'capitalize',
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
        marginBottom: 0,
        width: '100%'
    },
    overviewItems:{
        marginRight: 15
    },

    dashboardBg:{
        width: '100%',
        height: 130,
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
        justifyContent: 'center', 
       
        // marginTop: -5,
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
        paddingVertical: -10,
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
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 18
    },
    balFigure:{
        fontFamily: 'Inter-Bold',
        color: 'white',
        fontSize: 32
    },

    lastContribution:{
        paddingLeft: 16,
        marginLeft: 15,
        width:230,
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
    listTitle:{
        marginLeft: 15
    },
    titleText:{
        fontSize: 20,
        fontFamily: 'Inter-SemiBold',
        color: colors.grey800
    },

    listContainer:{
        flex:1,
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

    listTitleStyle:{
        fontWeight: 'bold',
        fontSize: 18
    }

});

export default Dashboard;