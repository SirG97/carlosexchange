import React, {  useState } from  'react';
import {StyleSheet, Dimensions, Platform, Text, View,StatusBar, 
            Image, TouchableOpacity, } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import colors from '../../assets/colors';
// import pattern from '../../assets/patterns/pattern';
import {Octicons} from '@expo/vector-icons'
import  css  from '../../assets/css/Styles'
import ResendTimer from '../../components/ResendTimer';
import MessageModal from '../../components/modals/MessageModal';
import axios from 'axios';
// var width = Dimensions.get('window').width; //full width
// var height = Dimensions.get('window').height; //full height
// <StatusBar backgroundColor={colors.theme} barStyle="light-content"/>
// {route.params.email}
const EmailVerification = ({navigation, route}) => {
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [activeResend, setActiveResend] = useState(false);
    const [resendStatus, setResendStatus] = useState('Resend');
    const [resendingEmail, setResendingEmail] = useState(false);
    // modalVisible, buttonHandler, type,headerText, message, buttonText
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessageType, setModalMessageType] = useState('');
    const [headerText, setHeaderText] = React.useState('')
    const [buttonText, setButtonText] = React.useState('')
    const [modalMessage, setModalMessage] = useState('')
    const buttonHandler = () => {
        if(modalMessageType === 'success'){
             navigation.navigate('CompleteRegistration',{id: route.params.id})
        }
        setModalVisible(false)
    }

    const showModal = (type,headerText, message, buttonText) => {
        setModalMessageType(type);
        setHeaderText(headerText);
        setModalMessage(message)
        setButtonText(buttonText)
        setModalVisible(true)
    }

    const handleMessage = (message, type = 'failed') => {
        setMessage(message);
        setMessageType(type)
    }
    const verifyEmail = () => {
        // setVerifying(true);
        setLoading(true)
         const url = 'https://app.carlosexchange.com/api/user/verify';
         console.log(route.params.id, token)
 
         const data = {
             id: route.params.id,
            token: token, 
         }
 
         axios.post(url, data).then((response) => {
             const result = response.data;
             const {message, status, data} = result;
             console.log(result)
                console.log(message);
             if(status !== 'success'){
                 console.log(message);
                 handleMessage(message, status)
             }else{
                
                return showModal('success', 'Success', message, 'OK')
                
             }
             
             setLoading(false)
              
         }).catch(err => {
             console.log(url, data)
             setLoading(false)
             return showModal('failed', 'Failed', err.response.data.message, 'Try again')
            //  handleMessage(err.response.data.message,'danger')
            
            //  console.log(err.response.data.message)
         });
        // setLoading(false)
        // return showModal('success', 'Success', 'Email verified successfully', 'OK')
    }

     const resendEmail = (triggerTimer) => {
        
         try{
            setResendingEmail(true)
            const url = 'https://app.carlosexchange.com/api/user/resend';
            const data = {

            }

            setResendingEmail(false)

            setTimeout(() => {
                setResendStatus('Resend')
                setActiveResend(false)
                triggerTimer();
            }, 5000)
         }catch(err){
             setResendingEmail(false)
            setResendStatus('failed')
            alert('Email resend failed'+ error.message)
         }
        

     }
    return(
      
            <View style={styles.container}>
         
                <View style={styles.header}>     
                    <View style={styles.iconbg}>
                        <Octicons name='mail-read' size={125} color={colors.blue} />
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.pageTitle}>Account Verification</Text>
                    <View>
                        <Text style={css.danger}>
                            {message}
                        </Text>
                    </View>
                    <View>
                      
                        <View style={styles.action}>
                            <TextInput
                                label="Code"
                                value={token}
                                style={styles.input}
                                mode='outlined'
                                onChangeText={(token) => setToken(token)}
                                placeholderTextColor="#7B8794"
                                left={<TextInput.Icon name="shield"  color={colors.text}/>}
                                theme={{ colors: { text: colors.text } }}
                                outlineColor={colors.lightBlueBg}
                                activeOutlineColor={colors.theme}/>
                            
                        </View>
                    </View>
                    
                    <View style={styles.button}>
                        <TouchableOpacity disabled={loading} style={styles.button} onPress={() => verifyEmail()}>
                            <Button 
                                color={colors.white}
                                loading={loading}
                                disabled={loading}
                                contentStyle={css.buttonStyle}
                                labelStyle={css.btnLableStyle}
                                >
                                Verify
                            </Button>
                        </TouchableOpacity>



                        <MessageModal modalVisible={modalVisible} 
                                    buttonHandler={buttonHandler}
                                    type={modalMessageType}
                                    headerText={headerText}
                                    message={modalMessage}
                                    buttonText={buttonText}/>    
                    </View>
                    <ResendTimer 
                        activeResend={activeResend} 
                        setActiveResend={setActiveResend} 
                        resendStatus={resendStatus}
                        resendingEmail={resendingEmail}
                        resendEmail={resendEmail}/>
                </View>
            </View>
       

    )
    
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff',
      padding: 25
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center'

    },

    footer: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },

    iconbg:{
        
        backgroundColor: 'rgba(105, 98, 218, 0.1)',
        width: 250,
        height: 250,
        borderRadius: 250,
        justifyContent: 'center',
        alignItems: 'center'
       
    },

    pageTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10,
        textAlign: 'center',
        color: colors.blue
    },
    infoText: {
        color: colors.text,
        fontSize: 15
    },
    emphasize: {
        fontWeight: 'bold'
    },
    noWrap: {
           },

    button: {
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 10,
        width: '100%',
        height:55,
        backgroundColor: colors.theme,
        borderRadius: 7
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
       
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        
    },
    signUpLink:{
        marginTop: 20,
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        
    },
    signUpLinkText:{
        fontWeight: 'bold',
        color: colors.text,
        fontSize: 16
    },
  });
export default EmailVerification;