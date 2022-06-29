import React, { Component, useState,useRef, useEffect, useContext } from 'react';
import {ImageBackground,Dimensions, StyleSheet, Pressable, View, Text,  SafeAreaView, ScrollView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from "@react-navigation/native-stack";
// import { Bell } from "phosphor-react-native";
// import {Shadow} from 'react-native-shadow-2';
// import Icon from 'react-native-vector-icons/Feather';
// import DropShadow from "react-native-drop-shadow";
import colors from '../../assets/colors';
import RBSheet from "react-native-raw-bottom-sheet";
// import pattern from '../../assets/patterns/pattern';
// import {Octicons, Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from '../../components/CredentialsContext';
import { TextInput, Button, RadioButton, List, Divider, Checkbox, TouchableRipple, ActivityIndicator} from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler'
import css  from '../../assets/css/Styles'
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
// import moment from "moment";
// import BouncyCheckbox from "react-native-bouncy-checkbox";


const Buy = ({ navigation }) => {
    const [selectedCoin, setSelectedCoin] = React.useState("")
    const [selectedCoinCode, setSelectedCoinCode] = React.useState('')
    const [selectedCoinNetwork, setSelectedCoinNetwork] = React.useState('')
    const [wallet, setWallet] = React.useState('')
    const [amount, setAmount] = React.useState('');
    const [currency, setCurrency] = React.useState('USD');
    const [optionalNote, setOptionalNote] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(true)
    const [invalid, setInvalid] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState();
    const refRBSheet = useRef();
    const refRBCoinNetwork = useRef('j');
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    // "BTC", "ERC-20", "TRC-20", "BEP-20", "LTC", "BEP-2", "SOL", "XRP", "DOGE";
        const coinNet = [
          {
            id: "1",
            name: "BTC",
          },
          {
            id: "2",
            name: "ERC-20",
          },
          {
            id: "3",
            name: "TRC-20",
          },
          {
            id: "4",
            name: "BEP-20",
          },
          {
            id: "5",
            name: "LTC",
          },
          {
            id: "6",
            name: "BEP-20",
          },
          {
            id: "7",
            name: "SOL",
          },
          {
            id: "8",
            name: "XRP",
          },
          {
            id: "9",
            name: "DOGE",
          },
          {
            id: "10",
            name: "None",
          },
        ];
    
    const [coins, setCoins] = React.useState([]);
    const [coinNetwork, setCoinNetwork] = React.useState(coinNet);
    const[config, setConfig] = React.useState()
    const[configBuyRate, setConfigBuyRate] = React.useState(0)
    const [dynamicAmount, setDynamicAmount] = React.useState('')
    const [sign, setSign] = React.useState('₦')
    const [checked, setChecked] = React.useState();
    const [checkboxState, setCheckboxState] = React.useState(false);
    const { height: SCREEN_HEIGHT } = Dimensions.get("window");
    const MAX_TRANSALATE_Y = SCREEN_HEIGHT - 300;
    const getCoins = async() =>{
        
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
            setConfig(data.config) 
            setConfigBuyRate(data.config.buy_rate) 
            // console.log('Config is ',data.config) 
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

    const renderCoins = ({item}) => {
      return (
        <View style={styles.bottomSheet}>
          <List.Item
            title={item.name}
            style={{ padding: 14 }}
            titleStyle={{
            //   textTransform: "uppercase",
              fontWeight: "bold",
              color: colors.text,
            }}
            onPress={() => {
              refRBSheet.current.close();
              setSelectedCoin(item.name);
              setSelectedCoinCode(item.coin_id);
              validateInput(item.name, selectedCoinNetwork, amount);
            }}
          />
          <Divider />
        </View>
      );
    }

    const renderCoinNetworks = ({item}) => {
        return(
            <View>
                  <List.Item
                      title={item.name}
                      style={{ padding: 14}}
                      titleStyle={{ textTransform: 'capitalize', fontFamily: 'Inter-Medium', color: colors.text}}
                      onPress={() => {
                        refRBCoinNetwork.current.close()
                        setSelectedCoinNetwork(item.name);
                        // setSelectedCoinCode(item.coin_id)
                        validateInput(selectedCoin, item.coin_id, amount)
                        
                      }}
                      />
              <Divider />
            </View>
        )
      }

    const convert = (currency, amount) => {
        // console.log('Currency passed is ', currency, 'Amount is ', amount)
        let rate = config.buy_rate

           if(currency === 'NGN'){
              
                setSign('$')
                
            }else if(currency === 'USD'){
            
                setSign('₦')
            }
        if(amount != false){
            if(currency === 'NGN'){
                let e = amount / rate
                setDynamicAmount(e)
                
                
            }else if(currency === 'USD'){
                let i = amount * rate
                setDynamicAmount(i)
               
            }

        }else{
            setDynamicAmount('')
        }
    }

    const handleMessage = (message, type = 'error') => {
      setMessage(message);
      setMessageType(type)
    }

    const validateInput = (selectedCoin, selectedCoinNetwork, amount) =>{

        if(selectedCoin == '' || selectedCoinNetwork == ''|| wallet == '' || amount == false){
            setInvalid(true)
        }else{
            setInvalid(false)
        }
    }

    const startBuyTransaction = async() => {
      setLoading(true)
       const url = 'https://app.carlosexchange.com/api/user/buy/order';
       const header = {
        headers:{
          Authorization: `Bearer  ${storedCredentials.token}`,
          'auth-token': storedCredentials.token
          
        }
      };

       const details = {
            coin: 'BTC',
            coin_network: selectedCoinNetwork,
            rate: configBuyRate,
            currency: currency,
            amount: amount,
            wallet_address: wallet
       }

       console.log('Details sent are ', details);

      await axios.post(url, details, header).then((response) => {
           const result = response.data;
           const {message, status, data} = result;
       //    console.log(`The message is ${message}, \nStatus is  ${status}, \n User ID is ${data.user_id}`);
           if(status !== 'success'){
               console.log('The result is ', result)
               handleMessage(message, 'error')
           }else{
              console.log('the data returned is ', data)
            //   handleMessage(message, 'error')
            //   persistLogin({...data}, message, status)
             navigation.navigate('SelectBuyBank', {data: data})
           }
           setLoading(false)
            
       }).catch(err => {
           handleMessage(err.stack,'error')
           setLoading(false)
           console.log('The start transaction error is ', err.stack)
       });
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

    useEffect(() => {
      getCoins();
    }, [])
    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.pageTitleContainer}>
              <Text style={styles.pageTitle}>Buy</Text>
            </View>

          </View>
          <View style={styles.authFormContainer} itemStyle={styles.input}>
            <Text
              style={[
                styles.toast,
                messageType == "success"
                  ? styles.success
                  : messageType == "error"
                  ? styles.error
                  : styles.info,
              ]}
            >
              {message}
            </Text>
            <Pressable
              onPress={() => refRBSheet.current.open()}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <TextInput
                label="Coin"
                value={selectedCoin}
                style={styles.input}
                mode="outlined"
                onChangeText={(selectedCoin) => {
                  console.log("This sshould walk");
                  validateInput(
                    selectedCoin,
                    selectedCoinNetwork,
                    wallet,
                    amount
                  );
                }}
                placeholderTextColor="#7B8794"
                left={<TextInput.Icon name="bitcoin" color={colors.text} />}
                right={
                  <TextInput.Icon
                    name="chevron-down"
                    onPress={() => refRBSheet.current.open()}
                    color={colors.text}
                  />
                }
                theme={{ colors: { text: colors.text } }}
                editable={false}
                outlineColor={colors.lightBlueBg}
                activeOutlineColor={colors.theme}
              />
            </Pressable>

            <Pressable
              onPress={() => refRBCoinNetwork.current.open()}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <TextInput
                label="Coin Network"
                value={selectedCoinNetwork}
                style={styles.input}
                mode="outlined"
                onChangeText={(selectedCoinNetwork) => {
                  validateInput(
                    selectedCoin,
                    selectedCoinNetwork,
                    wallet,
                    amount
                  );
                }}
                placeholderTextColor="#7B8794"
                left={<TextInput.Icon name="wan" color={colors.text} />}
                right={
                  <TextInput.Icon
                    name="chevron-down"
                    onPress={() => refRBSheet.current.open()}
                    color={colors.text}
                  />
                }
                theme={{ colors: { text: colors.text } }}
                editable={false}
                outlineColor={colors.lightBlueBg}
                activeOutlineColor={colors.theme}
              />
            </Pressable>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <TextInput
                style={styles.input}
                mode="outlined"
                value={amount}
                color="#7B8794"
                keyboardType="numeric"
                keyboardShouldPersistTaps="handled"
                outlineColor={colors.lightBlueBg}
                activeOutlineColor={colors.theme}
                onChangeText={(amount) => {
                  setAmount(amount);
                  convert(currency, amount);
                  console.log("Account in text input", amount);
                  if (amount == false) {
                    setInvalid(true);
                  } else {
                    validateInput(
                      selectedCoin,
                      selectedCoinNetwork,
                      wallet,
                      amount
                    );
                  }
                }}
                placeholder="Amount"
                placeholderTextColor="#7B8794"
                left={
                  <TextInput.Icon
                    name={currency == "USD" ? "currency-usd" : "currency-ngn"}
                    color={colors.text}
                  />
                }
                theme={{ colors: { text: colors.text } }}
              ></TextInput>
              <View style={styles.radiobuttonView}>
                <View style={styles.conversion}>
                  <Text style={styles.conversionText}>
                    <CurrencyFormat
                      value={dynamicAmount}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      isNumericString={true}
                      prefix={sign}
                      suffix={`  Rate: ₦${configBuyRate}/$1`}
                      renderText={(value) => <Text>{value}</Text>}
                    />
                  </Text>
                </View>
                <RadioButton.Group
                  onValueChange={(newValue) => {
                    setCurrency(newValue);
                    console.log("The new value is ", newValue);
                    convert(newValue, amount);
                  }}
                  value={currency}
                >
                  <View style={styles.radiobutton}>
                    <View style={styles.radiobuttonInner}>
                      <Text style={styles.radioText}>USD</Text>
                      <RadioButton color={colors.theme} value="USD" />
                    </View>
                    <View style={styles.radiobuttonInner}>
                      <Text style={styles.radioText}>NGN</Text>
                      <RadioButton color={colors.theme} value="NGN" />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <TextInput
                style={styles.input}
                mode="outlined"
                color="#7B8794"
                outlineColor={colors.lightBlueBg}
                activeOutlineColor={colors.theme}
                placeholder="Wallet Address"
                placeholderTextColor="#7B8794"
                left={<TextInput.Icon name="wallet" color={colors.text} />}
                value={wallet}
                onChangeText={(wallet) => {
                  if (wallet == false) {
                    setInvalid(true);
                  } else {
                    validateInput(
                      selectedCoin,
                      selectedCoinNetwork,
                      wallet,
                      amount
                    );
                  }

                  setWallet(wallet);
                }}
                theme={{ colors: { text: colors.text } }}
              ></TextInput>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <TextInput
                style={styles.input}
                mode="outlined"
                color="#7B8794"
                outlineColor={colors.lightBlueBg}
                activeOutlineColor={colors.theme}
                placeholder="Message (Optional)"
                placeholderTextColor="#7B8794"
                left={
                  <TextInput.Icon name="message-text" color={colors.text} />
                }
                value={optionalNote}
                onChangeText={(optionalNote) => {
                  setOptionalNote(optionalNote);
                }}
                theme={{ colors: { text: colors.text } }}
              ></TextInput>
            </View>

            <Text style={[styles.toast, styles.error]}>
              Due to price fluctuations, there may be a slight difference
              between the amount you receive and the estimated amount. Only
              screenshot from payment app is accepted.
            </Text>

            <View style={styles.button}>
              <Button
                onPress={() => startBuyTransaction()}
                color={colors.theme}
                loading={loading}
                mode="contained"
                disabled={invalid}
                contentStyle={css.buttonStyle}
                labelStyle={css.buttonStyle}
                style={{ width: "100%", color: colors.white }}
              >
                Agree & Proceed
              </Button>
            </View>
          </View>

          <RBSheet
            ref={refRBSheet}
            height={600}
            closeOnDragDown={false}
            closeOnPressMask={true}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent",
              },
              container: {
                borderRadius: 20,
              },
              draggableIcon: {
                backgroundColor: "#000",
              },
            }}
          >
            <View style={styles.bottomSheet}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  data={coins}
                  keyExtractor={({ id }, index) => id}
                  renderItem={renderCoins}
                />
              )}
            </View>
          </RBSheet>

          <RBSheet
            ref={refRBCoinNetwork}
            height={600}
            closeOnDragDown={false}
            closeOnPressMask={true}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent",
                borderTopLeftRadius: 7,
              },
              container: {
                borderRadius: 20,
              },
              draggableIcon: {
                backgroundColor: "#000",
              },
            }}
          >
            <View style={styles.bottomSheet}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  data={coinNetwork}
                  keyExtractor={({ id }, index) => id}
                  renderItem={renderCoinNetworks}
                />
              )}
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
        paddingRight: 15,
        paddingLeft: 15,
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
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        // borderWidth: 0.5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15,
        marginTop: 5,
        color: colors.text,
        // fontWeight: 'bold',
        
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
    bottomSheet:{
        color: 'red',
        // backgroundColor: colors.red,
        borderRadius: 30
    }
});

export default Buy;