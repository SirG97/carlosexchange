import React, { Component } from  'react';
import {StyleSheet, Dimensions, Platform, Text, View,StatusBar, 
            Image, TouchableOpacity, ImageBackground, } from 'react-native';
import { createStackNavigator } from "@react-navigation/native-stack";
import {LinearGradient} from 'expo-linear-gradient';
import { TextInput, Button } from 'react-native-paper';
import { IconContext, EnvelopeSimple, Heart, Cube } from "phosphor-react-native";
import colors from '../../assets/colors';
import pattern from '../../assets/patterns/pattern';
import * as Animatable from 'react-native-animatable';
// import FontAwesome from 'react-native-vecotr-icons/';
import Icon from 'react-native-vector-icons/Feather'
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
var width = Dimensions.get('window').width; //full width
// var height = Dimensions.get('window').height; //full height


const Login = ({navigation}) => {
  
    const [credentials, setCredentials] = React.useState({
        email: '',
        password: '',
        secureTextEntry: true
    });

    const handleEmail = (email) => {
        setCredentials({
            ...credentials,
            email: email
        });
    }

    const handlePassword = (password)=>{
        setCredentials({
            ...credentials,
            password: password 
        });
    }

    const togglePasswordView = ()=>{
        setCredentials({
            ...credentials,
            secureTextEntry: !credentials.secureTextEntry
        });
    }
    return(
        <React.Fragment>
            <View style={styles.container}>
            <StatusBar backgroundColor={colors.theme} barStyle="light-content"/>
                <View style={styles.header}>
                <ImageBackground source={pattern.bg} style={styles.image} resizeMode='stretch' />
                    <View style={styles.headerPad}>
                        <Text style={styles.text_header}>Welcome!</Text>
                    </View>
                    
            
                </View>
                    <View style={styles.footer}>
                        
                        <View style={styles.action}>
                            <TextInput
                                label="Email"
                                // value={email}
                                style={styles.input}
                                mode='outlined'
                                onChangeText={(email) => handlePassword(email)}
                                placeholderTextColor="#7B8794"
                                left={<TextInput.Icon name="email"  color={colors.text}/>}
                                theme={{ colors: { text: colors.text } }}
                                activeOutlineColor={colors.theme}/>
                            
                        </View>

                        <View style={styles.action}>
                            <TextInput
                                label="Password"
                                // value={password}
                                style={styles.input}
                                secureTextEntry={credentials.secureTextEntry? true : false}
                                mode='outlined'
                                onChangeText={(password) => handlePassword(password)}
                                placeholderTextColor="#7B8794"
                                left={<TextInput.Icon name="lock"  color={colors.text}/>}
                                right={<TextInput.Icon 
                                        name={credentials.secureTextEntry? 'eye' : 'eye-off'}  
                                        onPress={togglePasswordView}
                                        color={colors.text}/>}
                                theme={{ colors: { text: colors.text } }}
                                activeOutlineColor={colors.theme}/>
                            
                        </View>
                        
                        <View style={styles.button}>
                            <TouchableOpacity onPress={()=> navigation.navigate('Welcome')}>
                                <LinearGradient
                                    style={styles.signIn}
                                    colors={['#4a42cf','#4a42cf']}>
                                    <Text style={styles.textSign}>Login</Text>
                                
                                </LinearGradient>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity 
                            style={styles.signUpLink}
                            onPress={()=> navigation.navigate('Register')}>
                            <Text style={styles.signUpLinkText}>{"Don't have an account? Sign up here"}</Text>
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
        marginTop: 10,
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
        marginTop: 50,
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
        // marginBottom: 41,
        color: colors.text,
        fontWeight: 'bold',
        
      },
  });
export default Login;