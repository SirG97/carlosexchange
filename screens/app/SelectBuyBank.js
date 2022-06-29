import React, { Component, useState,useRef, useEffect, useContext } from 'react';
import {ImageBackground, StyleSheet, Pressable, View, Text,  SafeAreaView, ScrollView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from "@react-navigation/native-stack";
import { Bell } from "phosphor-react-native";
// import {Shadow} from 'react-native-shadow-2';
// import Icon from 'react-native-vector-icons/Feather';
// import DropShadow from "react-native-drop-shadow";
import colors from '../../assets/colors';
import RBSheet from "react-native-raw-bottom-sheet";
// import pattern from '../../assets/patterns/pattern';
// import {Octicons, Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from '../../components/CredentialsContext';
import { TextInput, Button, List, Divider} from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler'
import css  from '../../assets/css/Styles'
// import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
// import moment from "moment";
// import BouncyCheckbox from "react-native-bouncy-checkbox";


const SelectBuyBank = ({ navigation, route}) => {
console.log(route.params.data.bank)
    const [banks, setBanks] = useState(route.params.data.bank)
    const [bank, setBank] = React.useState('')
    const [accountName, setAccountName] = React.useState('');
    const [accountNumber, setAccountNumber] = React.useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const [invalid, setInvalid] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState();
    const refRBSheet = useRef();

    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    
    const [coins, setCoins] = React.useState([]);
    const [coinNetwork, setCoinNetwork] = React.useState(['BTC','ERC-20', 'TRC-20', 'BEP-20','LTC', 'BEP-2', 'SOL','XRP','DOGE']);
    const[config, setConfig] = React.useState()

    const getCoins = async() =>{
        setIsLoading(true)
        console.log('Stored credential is ', storedCredentials)
        const header = {
            headers:{
              Authorization: `Bearer  ${storedCredentials.token}`,
              'auth-token': storedCredentials.token
              
            }
          };
      const url = 'https://app.carlosexchange.com/api/user/sell'
      try {
        
        await axios.get(url, header).then((response) => {
          const result = response.data;
          const {message, status, data} = result;
         
          if(status !== 'success'){
              setCoins([])
          }else{ 
            setCoins(data.coins) 

          }
          
        }).catch(err => {
            console.log(err)
           
        });
      } catch (err) {
        console.log(`The error is ${err}`)
      }finally{
        setIsLoading(false);
      }
      
    }

    const renderBanks = ({item}) => {
    
      return(
          <View>
                <List.Item
                    title={item.name}
                    style={{ padding: 14}}
                    titleStyle={{ textTransform: 'uppercase', fontWeight: 'bold', color: colors.text}}
                    onPress={() => {
                      refRBSheet.current.close()
                      setBank(item.name)
                      setAccountNumber(item.account_number)
                      setAccountName(item.account_name)
                      validateInput(item.name)
                    }}
                    />
            <Divider />
          </View>
      )
    }


    const handleMessage = (message, type = 'error') => {
      setMessage(message);
      setMessageType(type)
    }

    const validateInput = (bank) =>{
        if(bank == ''){
            setInvalid(true)
        }else{
            setInvalid(false)
        }
    }

    const ProceedToPending = async() => {
      // setLoading(false)
      //  const url = 'https://app.carlosexchange.com/api/user/buy/order';
      //  const header = {
      //   headers:{
      //     Authorization: `Bearer  ${storedCredentials.token}`,
      //     'auth-token': storedCredentials.token
          
      //   }
      // };

       const details = {
            bank: bank,
            account_name: accountName,
            account_number: accountNumber,
           
       }
       console.log('Details sent to pending buy are ',details);
       try{
        navigation.navigate('PendingBuyTransaction', {transaction: route.params.data.transaction, details: details})
       }catch(err){
        console.log(err)
       }
       
      //  console.log('Details sent are ', details);

      // await axios.post(url, details, header).then((response) => {
      //      const result = response.data;
      //      const {message, status, data} = result;
      //  //    console.log(`The message is ${message}, \nStatus is  ${status}, \n User ID is ${data.user_id}`);
      //      if(status !== 'success'){
      //          console.log('The result is ', result)
      //          handleMessage(message, 'error')
      //      }else{
      //         console.log('the data returned is ', data)
      //       //   handleMessage(message, 'error')
      //       //   persistLogin({...data}, message, status)
      //        navigation.navigate('PendingBuyTransaction', {data: data})
      //      }
      //      setLoading(false)
            
      //  }).catch(err => {
      //      handleMessage(err.stack,'error')
      //      setLoading(false)
      //      console.log('The start transaction error is ', err.stack)
      //  });
   }

   const persistLogin = async (credentials, message, status) =>{

    await AsyncStorage.setItem('CarlosexchangeCredentials', JSON.stringify(credentials))
                .then(() => {
                    console.log('credentials are ', credentials)
                    setStoredCredentials(credentials)
                })
                .catch((error) => {
                    console.log('Persisting login error is ', error)
                    handleMessage('Persisting login failed')
                })
    }

    // useEffect(() => {
    //   getCoins();
    // }, [])
    return(
        <React.Fragment>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.pageTitleContainer}>
                        <Text style={styles.pageTitle}>Buy</Text>
                    </View>
                    
                    <View style={styles.notificationContainer}>
                        <Bell weight="fill" color={colors.lightBlue} size={28}/>
                    </View>
                </View>
                <View style={styles.authFormContainer} itemStyle={styles.input}>
                    <Text style={ [styles.toast, messageType =='success'? 
                                  styles.success: messageType == 'error'? styles.error: styles.info ]}>
                         {message}
                      </Text>
                      <Text style={[styles.toast, styles.error]}>
                        Select a bank that is convenient for you from the option below to make payment
                      </Text>
            <Text style={[styles.toast, styles.error]}>
            Third party payments are not allowed. Payments must be made from your personal account, matching your verified name on your profile.
            </Text>

            <Text style={[styles.toast, styles.error]}>
                For a successful transaction, do not enter any crypto related terms (BTC, USDT, etc.) in your payment narration.
            </Text>

            <Text style={[styles.toast, styles.error]}>
                Opening orders without making payment is not allowed. It can lead to banning you from the platform.
            </Text>
            <Text style={[styles.toast, styles.error]}>
                Failure to comply with the above stated terms leads to limitation on your Carlosexchange account and total loss of paid amount.
            </Text>

                <Pressable 
                    onPress={() => refRBSheet.current.open()}
                    style={{ alignItems: 'center', justifyContent: 'center', width: '100%'}}>
            
                    <TextInput
                    label="Select Bank"
                    value={bank}
                    style={styles.input}
                    mode='outlined'
                    onChangeText={(bank)=>{
                        validateInput(bank)
                    }}
                    placeholderTextColor="#7B8794"
                    left={<TextInput.Icon name="wan"  color={colors.text}/>}
                    right={<TextInput.Icon name="chevron-down" onPress={() => refRBSheet.current.open()}  color={colors.text}/>}
                    theme={{ colors: { text: colors.text } }}
                    editable={false}
                    activeOutlineColor={colors.theme}/>

                </Pressable>
                        <View style={styles.button}>
                            <Button 
                            onPress={()=> ProceedToPending()}    
                            color={colors.theme}
                            loading={loading}
                            mode='contained'
                            disabled={invalid}
                            contentStyle={css.buttonStyle}
                            labelStyle={css.buttonStyle}
                            style={{ width: '100%', color: colors.white }}>
                                Continue
                            </Button>

                        </View>
            </View>

            <RBSheet
                ref={refRBSheet} 
                height={400}
                closeOnDragDown={false}
                closeOnPressMask={true}
                customStyles={{
                wrapper: {
                    backgroundColor: "transparent",
                    borderTopLeftRadius: 7
                },
                draggableIcon: {
                    backgroundColor: "#000"
                }
                }}>
                <View>
                
                    <FlatList
                        data={banks}
                        keyExtractor={({ id }, index) => id}
                        renderItem={renderBanks}
                    />
                
                </View>
            </RBSheet>
            
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
        // backgroundColor: '#fff'
       
    },

    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 22,
        // borderWidth: 2,
        // borderColor: 'red'
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
    }
});

export default SelectBuyBank;