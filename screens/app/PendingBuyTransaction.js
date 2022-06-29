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
import { Ionicons} from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from '../../components/CredentialsContext';
import { Button, Card, Subheading, Title, Paragraph} from 'react-native-paper';
// import { FlatList } from 'react-native-gesture-handler'
import css  from '../../assets/css/Styles'
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';

import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import MessageModal from '../../components/modals/MessageModal';

const PendingBuyTransaction = ({ route, navigation }) => {
    const { transaction, details } = route.params
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(true)
    const [invalid, setInvalid] = useState(true);
    const [message, setMessage] = useState('');
   
    const [messageType, setMessageType] = useState();
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    const [copiedText, setCopiedText] = React.useState('');
    const [image, setImage] = React.useState({});
    const [fileText, setFilText] = React.useState('select photo')

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessageType, setModalMessageType] = useState('');
    const [headerText, setHeaderText] = React.useState('')
    const [buttonText, setButtonText] = React.useState('')
    const [modalMessage, setModalMessage] = useState('')

    const showModal = (type,headerText, message, buttonText) => {
        setModalMessageType(type);
        setHeaderText(headerText);
        setModalMessage(message)
        setButtonText(buttonText)
        setModalVisible(true)
    }
    const buttonHandler = () => {
        if(modalMessageType === 'success'){
             navigation.navigate('Home')
        }
        setModalVisible(false)
    }
    const copyToClipboard = (value) => {
      Clipboard.setString(value);
    };
  
    const fetchCopiedText = async () => {
      const text = await Clipboard.getStringAsync();
      setCopiedText(text);
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
        });
    
        console.log('Result uri is ',result.uri);
    
        if (!result.cancelled) {
          setImage(result);
          setFilText('File Selected!')
          setInvalid(false)

        }
        // console.log('The image inside pickImage is ', result)
      };

    const handleMessage = (message, type = 'error') => {
      setMessage(message);
      setMessageType(type)
    }

    const startUpload = async() => {
      setLoading(true)
      const formData = new FormData();
      formData.append('image', {
          name: `${Date.now()}_proof.${image.uri.substring(image.uri.lastIndexOf(".") + 1)}`,
          uri: image.uri,
          type: `image/${image.uri.substring(image.uri.lastIndexOf(".") + 1)}`
      });
      formData.append('trx_ref', transaction.trx_ref)
      formData.append('bank', details.bank)
      formData.append('account_number', details.account_number)
      formData.append('account_name', details.account_name)

      console.log('form data is ', formData)
       const url = 'https://app.carlosexchange.com/api/user/buy/order/complete';


      try {
           await axios.post(url, formData, {
            headers:{
                'auth-token': storedCredentials.token,
                'Content-Type': 'multipart/form-data',
              },
              transformRequest: data => data
           })
            .then((response) => {
                const result = response.data;
                const {message, status, data} = result;
                console.log('Upload response is ', result) 
                if(status === 'success'){
                    setLoading(false)
                    return showModal('success', 'Success', message, 'Home')
                }else{
                    setLoading(false)
                    return showModal('failed', 'Failed', message, 'Try Again')
                }
            
            }).catch((err) =>{
                return showModal('failed', 'Failed', err.stack, 'Try Again')
                console.log('Err inside try catch is ',err.stack)
            })

        // .catch(err => {
        //     handleMessage(err.response.data,'error')
        //     setLoading(false)
            // console.log('There is an error here')
        // });
      } catch (error) {
          console.log('the upload error is ', error.stack)
      }

   }


    return(
        <React.Fragment>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{overflow: 'visible'}} contentContainerStyle={{padding: 1}}>
                    <View style={styles.authFormContainer} itemStyle={styles.input}>
                        <View style={styles.amountContainer}>
                        <Card style={styles.amountCard} elevation={1}>
                            <Card.Content style={styles.amountCardContent} >
                                <Title style={styles.amountCardTitle}>                                       
                                 <CurrencyFormat value={transaction.amount} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    isNumericString={true}
                                    prefix={'₦'}
                                    renderText={value => <Text style={styles.amountCardTitle}>{value}</Text>}  /> 
                                    
                                    </Title>
                                <Paragraph style={styles.amountCardParagraph}>Crypto Purchase</Paragraph>
                            </Card.Content>
                        </Card>
                        </View>
                        <View style={styles.txnInfoContainer}>
                            <Paragraph style={styles.txnInfoMsg}>
                                Kindly pay the above amount to the payment details below and send proof of payment to recieve the crypto equivalent
                            </Paragraph>
                            <Subheading>Transaction Details</Subheading>
                            <View style={styles.txnList}>
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
                                        <Text style={styles.txnKeyText}>Amount(USD)</Text>
                                    </View>
                                    <View style={styles.txnVal}>
                                        <CurrencyFormat value={transaction.amount_usd} 
                                            displayType={'text'} 
                                            thousandSeparator={true} 
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            isNumericString={true}
                                            prefix={'$'}
                                            renderText={value => <Text style={styles.txnValText}>{value}</Text>}  />
                                    </View>
                                </View>

                                <View style={styles.txnContent}>
                                    <View style={styles.txnKey}>
                                        <Text style={styles.txnKeyText}>Transaction Rate</Text>
                                    </View>
                                    <View style={styles.txnVal}>
                                        <Text style={styles.txnValText}>₦{transaction.rate}/$ </Text>
                                    </View>
                                </View>
                                
                                <View style={styles.txnContent}>
                                    <View style={styles.txnKey}>
                                        <Text style={styles.txnKeyText}>Bank</Text>
                                    </View>
                                    <View style={styles.txnVal}>
                                        <Text style={styles.txnValText}>{details.bank}</Text>
                                    </View>
                                </View>

                                <View style={styles.txnContent}>
                                    <View style={styles.txnKey}>
                                        <Text style={styles.txnKeyText}>Account number </Text>
                                    </View>
                                    <View style={styles.txnVal}>
                                        <View>
                                        <Text>
                                        <Text style={styles.txnValText}>{details.account_number} </Text>
                                        <Ionicons name="copy" 
                                            onPress={() =>{
                                                alert('Account number copied')
                                                copyToClipboard(details.account_number)
                                            }}
                                    
                                        size={20} color={colors.theme} />
                                        </Text>
                                          
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.txnContent}>
                                    <View style={styles.txnKey}>
                                        <Text style={styles.txnKeyText}>Account name</Text>
                                    </View>
                                    <View style={styles.txnVal}>
                                        <Text style={styles.txnValText}>{details.account_name}</Text>
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
                                <View style={styles.txnContent}>
                                    <View style={styles.txnKey}>
                                        <Text style={styles.txnKeyText}>Payment proof</Text>
                                    </View>
                                    <View style={styles.txnVal}>
                                        <Button 
                                        onPress={pickImage}   
                                        color={colors.theme}
                                        // loading={loading}
                                        mode='contained'
                                        contentStyle={css.buttonStyle}
                                        labelStyle={css.uploadButtonStyle}
                                        style={{ color: colors.white }}>
                                            {fileText}
                                        </Button>
                                    </View>
                                   
                                </View>
                                
                            </View>
                                
                        </View>
                       
                    </View>
                    <View style={styles.button}>
                    <Button 
                        onPress={()=> startUpload()}    
                        color={colors.theme}
                        loading={loading}
                        mode='contained'
                        disabled={invalid}
                        contentStyle={css.buttonStyle}
                        labelStyle={css.buttonStyle}
                        style={{ width: '100%', color: colors.white }}>
                            Upload payment proof
                    </Button>
            </View>
                            <MessageModal modalVisible={modalVisible} 
                            buttonHandler={buttonHandler}
                            type={modalMessageType}
                            headerText={headerText}
                            message={modalMessage}
                            buttonText={buttonText}/>    
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
        paddingLeft: -60,
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
        width: 400,
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
        paddingTop: 10,
        paddingBottom: 10
        
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
    },

    txnVal:{
       
        width: 200,
        textAlign: 'left',
        margin: 'auto',
        // borderWidth: 1,
        flexGrow:2,
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
    }
});

export default PendingBuyTransaction;