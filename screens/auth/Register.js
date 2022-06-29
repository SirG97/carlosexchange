import React, { Component, useState } from  'react';
import {StyleSheet, Dimensions, Platform, Text, View,StatusBar, 
            Image, TouchableOpacity, ImageBackground,  ActivityIndicator} from 'react-native';
// import { createStackNavigator } from "@react-navigation/native-stack";
// import {LinearGradient} from 'expo-linear-gradient';
import { TextInput, Button } from 'react-native-paper';
// import { IconContext, EnvelopeSimple, Heart, Cube } from "phosphor-react-native";
import colors from '../../assets/colors';
import pattern from '../../assets/patterns/pattern';
// import * as Animatable from 'react-native-animatable';

// import Icon from 'react-native-vector-icons/Feather'
import axios from 'axios';
import  css  from '../../assets/css/Styles'
// var width = Dimensions.get('window').width; //full width


const Register = ({route, navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isSecureEntry, setSecureEntry] = useState(true);
    const [isConfirmSecureEntry, setConfirmSecureEntry] = useState(true);
    const [loading, setLoading] = useState(false);
    const [invalid, setInvalid] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();


    const handleMessage = (message, type = 'failed') => {
        setMessage(message);
        setMessageType(type)
    }
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validateEmail = (email) => {
        handleMessage(null)
        setInvalid(true)
        if(regex.test(email) == false){
            handleMessage('Please enter a valid email')
            return;
        }

        if(regex.test(email) == true && 
            password.length != 0 && 
            passwordConfirmation.length != 0 && 
            password == passwordConfirmation){
            setInvalid(false)
        }
    }

    const validatePassword = (password) => {
        handleMessage(null)
        setInvalid(true)
        if(password.length == 0){
            handleMessage('Please enter a valid password')
            return;
        }
        if(passwordConfirmation.length != 0 && password !== passwordConfirmation){
            handleMessage('Password confirmation do not match')
            return;
        }

        if(regex.test(email) == true &&  
            password.length != 0 && 
            passwordConfirmation.length != 0 
            && password == passwordConfirmation){
            setInvalid(false)
        }
    }

    const validatePasswordConfirmation = (passwordConfirmation) => {
        handleMessage(null)
        setInvalid(true)
        if(password !== passwordConfirmation){
            handleMessage('Password confirmation does not match')
            return;
        }

        if(regex.test(email) == true &&  password.length != 0 &&  passwordConfirmation.length != 0 
        && password == passwordConfirmation){
            setInvalid(false)
        }
    }

    const handleRegister = () => {

        if(password !== passwordConfirmation) {
            handleMessage('Password confirmation does not match', 'danger');
            return;
        }
       setLoading(true)
        const url = 'https://app.carlosexchange.com/api/user/register';

        const data = {
            email: email, 
            password: password,
           
        }

        axios.post(url, data).then((response) => {
            const result = response.data;
            const {message, status, data} = result;
        //    console.log(`The message is ${message}, \nStatus is  ${status}, \n User ID is ${data.user_id}`);
            if(status !== 'success'){
                console.log(result)
                handleMessage(message, 'danger')
            }else{
                console.log(result)
               console.log('message is',message)
                navigation.navigate('EmailVerification', {email: data.email, id: data.user_id})
            }
            setLoading(false)
             
        }).catch(err => {
            handleMessage(err.response.data.message,'danger')
            setLoading(false)
            console.log('register error', err.response)
        });
    }

    return(
        <React.Fragment>
            <View style={styles.container}>
            <StatusBar backgroundColor={colors.theme} barStyle="light-content"/>
                <View style={styles.header}>
                <ImageBackground source={pattern.bg} style={styles.image} resizeMode='stretch' />
                    <View style={styles.headerPad}>
                        <Text style={styles.text_header}>Register</Text>
                    </View>
                    
            
                </View>
                    <View style={styles.footer}>
                        <View>
                            <Text style={css.danger}>
                                 {message}
                            </Text>
                        </View>
                        <View style={styles.action}>
                            <TextInput
                                label="Email"
                                value={email}
                                style={styles.input}
                                mode='outlined'
                                onChangeText={(email) => {
                                    setEmail(email)
                                    validateEmail(email)
                                }}
                                placeholderTextColor="#7B8794"
                                left={<TextInput.Icon name="email"  color={colors.lightBlue}/>}
                                theme={{ colors: { text: colors.text } }}
                                outlineColor={colors.lightBlueBg}
                                activeOutlineColor={colors.theme}
                                />
                            
                        </View>

                        <View style={styles.action}>
                            <TextInput
                                label="Password"
                                value={password}
                                style={styles.input}
                                secureTextEntry={isSecureEntry}
                                mode='outlined'
                                onChangeText={(password) => {
                                    setPassword(password)
                                    validatePassword(password)
                                }}
                                placeholderTextColor="#7B8794"
                                left={<TextInput.Icon name="lock"  color={colors.lightBlue}/>}
                                right={<TextInput.Icon 
                                        name={isSecureEntry? 'eye' : 'eye-off'}  
                                        onPress={() => {setSecureEntry((prev) => !prev)}}
                                        color={colors.lightBlue}/>}
                                theme={{ colors: { text: colors.text } }}
                                outlineColor={colors.lightBlueBg}
                                activeOutlineColor={colors.theme}
                                />
                            
                        </View>

                        <View style={styles.action}>
                            <TextInput
                                label="Confirm Password"
                                value={passwordConfirmation}
                                style={styles.input}
                                secureTextEntry={isConfirmSecureEntry}
                                mode='outlined'
                                onChangeText={(passwordConfirmation) => {
                                    setPasswordConfirmation(passwordConfirmation)
                                    validatePasswordConfirmation(passwordConfirmation)}}
                                placeholderTextColor="#7B8794"
                                left={<TextInput.Icon name="lock"  color={colors.lightBlue}/>}
                                right={<TextInput.Icon 
                                        name={isConfirmSecureEntry? 'eye' : 'eye-off'}  
                                        onPress={() => {setConfirmSecureEntry((prev) => !prev)}}
                                        color={colors.lightBlue}/>}
                                theme={{ colors: { text: colors.text } }}
                                outlineColor={colors.lightBlueBg}
                                activeOutlineColor={colors.theme}/>
                            
                        </View>
               
                        <View style={styles.button}>
                            <Button
                            onPress={() => handleRegister()}
                            color={colors.theme}
                            loading={loading}
                            mode="contained"
                            disabled={invalid}
                            contentStyle={css.buttonStyle}
                            labelStyle={css.buttonStyle}
                            style={{ width: "100%", color: colors.white }}>
                          Register
                        </Button>
                      </View>
                    
                        <TouchableOpacity 
                            style={styles.signUpLink}
                            onPress={()=> navigation.navigate('Login')}>
                            <Text style={styles.signUpLinkText}>{"Already have an account? Login"}</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
           
        </React.Fragment>

    )
    
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#4a42cf'
    },
    header: {
        flex: 2,
        justifyContent: 'flex-end',

    },
    headerPad:{
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 30,
        opacity: 0.9
    },
    image: {
        flex: 2,
        justifyContent: "center",
        position: 'absolute',
        width: '100%', 
        height: '100%',
        opacity: 0.1,
       

      },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 1,
        // borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        // paddingBottom: 5
    },
    
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        width: '100%',
        marginTop: 15,
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
        color: colors.theme,
        fontSize: 16
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
        marginRight: 12,
        marginLeft: 12,
        marginBottom: 15,
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
        // marginBottom: 41,
        color: colors.text,
        // fontWeight: 'bold',
        
      },
  });
export default Register;