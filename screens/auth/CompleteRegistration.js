import React, { Component, useState, useRef, useEffect, useContext } from  'react';
import {StyleSheet, Dimensions, Platform, Text, View,StatusBar, Pressable,
            Image, TouchableOpacity, ImageBackground, TouchableHighlight,  ActivityIndicator, SafeAreaView} from 'react-native';
// import { createStackNavigator } from "@react-navigation/native-stack";
// import {LinearGradient} from 'expo-linear-gradient';
import { TextInput, Button, RadioButton, List, Divider, TouchableRipple } from 'react-native-paper';
// import { IconContext, EnvelopeSimple, Heart, Cube } from "phosphor-react-native";
import colors from '../../assets/colors';
// import pattern from '../../assets/patterns/pattern'
// import * as Animatable from 'react-native-animatable'
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from 'react-native-vector-icons/Feather'
// import {Octicons} from '@expo/vector-icons'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from '../../components/CredentialsContext' 
import  css  from '../../assets/css/Styles'

// import SelectDropdown from 'react-native-select-dropdown'
// var width = Dimensions.get('window').width; //full width
// var height = Dimensions.get('window').height; //full height



const CompleteRegistration = ({navigation, route}) =>{
    const [selectedBank, setSelectedBank] = React.useState("")
    const [selectedBankCode, setSelectedBankCode] = React.useState(0)
    const [account, setAccount] = React.useState('');
    const [name, setName] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(true)
    const [invalid, setInvalid] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState();
    const refRBSheet = useRef();
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    
    const [banks, setBanks] = React.useState([]);
    const getBanks = async() =>{
      const url = 'https://app.carlosexchange.com/api/user/banks'
      try {
        
        await axios.get(url).then((response) => {
          const result = response.data;
          const {message, status, data} = result;
      
          if(status !== 'success'){
              setBanks([])
          }else{
            setBanks(data)
          }
          
        }).catch(err => {
            
            banks = [];
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
                    titleStyle={{ textTransform: 'uppercase', color: colors.text}}
                    onPress={() => {
                      refRBSheet.current.close()
                      setSelectedBank(item.name)
                      setSelectedBankCode(item.code)
                      
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
    const resolveAccount =  (acc = account) =>{
      // Set name to empty and valid to false to disable the save button
        setInvalid(true);
       
        if(acc != false && selectedBankCode != false) {
          const url = 'https://app.carlosexchange.com/api/user/account/resolve';
  
          const data = {
              account_number: acc, 
              bank_code: selectedBankCode,
          }
          
          handleMessage('Resolving please wait...', 'info')
          axios.post(url, data).then((response) => {
              const result = response.data;
              const {message, status, data} = result;
        
              if(status == false){
                  // setMessageType('error')
                  handleMessage(message, 'error')
              }else{
                // setMessageType('success')
                setName(data.account_name)
                setInvalid(false)
                handleMessage(message, 'success')
                  // navigation.navigate('EmailVerification', {email: data.email, id: data.user_id})
              }
              // setLoading(false)
               
          }).catch(err => {
              // setMessageType('error')
              handleMessage('An error occurred please try again', 'error')
              setInvalid(true)
              console.log(err)
          });
        }
        
    }

    const handleCompleteRegister = async() => {
      setLoading(true)
       const url = 'https://app.carlosexchange.com/api/user/register/complete';

       const details = {
           bank: selectedBank, 
           bank_code: selectedBankCode,
           account_number: account,
           name: name,
           id: route.params.id
          
       }

      await axios.post(url, details).then((response) => {
           const result = response.data;
           const {message, status, data} = result;
       //    console.log(`The message is ${message}, \nStatus is  ${status}, \n User ID is ${data.user_id}`);
           if(status !== 'success'){
               console.log(result)
               handleMessage(message, 'danger')
           }else{
              console.log(message)
              persistLogin({...data}, message, status)
              //  navigation.navigate('Dashboard', {token: token})
           }
           setLoading(false)
            
       }).catch(err => {
          //  handleMessage(err.response.data.message,'danger')
           setLoading(false)
           console.log(err.response)
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
      getBanks();
    }, [])



    return (
      <React.Fragment>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <View style={styles.closeBtnContainer}>
            <Icon
              name="x"
              size={30}
              color={colors.text}
              onPress={() => navigation.navigate("Welcome")}
            />
          </View>
          <View style={styles.registerTextContainer}>
            <Text style={styles.loginTitle}>Complete Registration</Text>
          </View>
          <View style={styles.authFormContainer} itemStyle={styles.input}>
            <Pressable
              onPress={() => refRBSheet.current.open()}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <TextInput
                label="Select bank"
                value={selectedBank}
                style={styles.input}
                mode="outlined"
                onChangeText={() => {
                  resolveAccount();
                }}
                placeholderTextColor="#7B8794"
                left={
                  <TextInput.Icon name="office-building" color={colors.text} />
                }
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
                value={account}
                color="#7B8794"
              
                onChangeText={(account) => {
                  setAccount(account);
                  console.log("Account in text input", account);
                  if (account != false && account.length == 10) {
                    resolveAccount(account);
                  } else {
                    setName("");
                    setMessage("");
                  }
                }}
                keyboardType="numeric"
                keyboardShouldPersistTaps="handled"
                placeholder="Account number"
                placeholderTextColor="#7B8794"
                left={<TextInput.Icon name="numeric" color={colors.text} />}
                theme={{ colors: { text: colors.text } }}
                outlineColor={colors.lightBlueBg}
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
                placeholder="Name"
                placeholderTextColor="#7B8794"
                left={<TextInput.Icon name="account" color={colors.text} />}
                value={name}
                editable={false}
                theme={{ colors: { text: colors.text } }}
              ></TextInput>
            </View>
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
            <View style={styles.button}>
              <Button
                onPress={() => handleCompleteRegister()}
                color={colors.theme}
                loading={loading}
                mode="contained"
                disabled={invalid}
                contentStyle={css.buttonStyle}
                labelStyle={css.buttonStyle}
                style={{ width: "100%", color: colors.white }}
              >
                Save
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
            <View>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  data={banks}
                  keyExtractor={({ id }, index) => id}
                  renderItem={renderBanks}
                />
              )}
            </View>
          </RBSheet>
        </SafeAreaView>
      </React.Fragment>
    );
}

const styles = StyleSheet.create({
    closeBtnContainer:{
        paddingTop: 100,
        paddingLeft: 32
    },

      authFormContainer:{
        alignItems: 'flex-start', 
        justifyContent: 'center',
        width: '85%',
 
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
        fontSize: 30,
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

      titleStyle:{
        textTransform: 'uppercase',
      },
      button: {
        alignItems: 'center',
        width: '100%',
    },

    toast:{
      marginTop: -20,
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

})

export default CompleteRegistration;