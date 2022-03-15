import React, { Component, useState } from  'react';
import {StyleSheet, Dimensions, Platform, Text, View,StatusBar, 
            Image, TouchableOpacity, ImageBackground,  ActivityIndicator, SafeAreaView} from 'react-native';
import { createStackNavigator } from "@react-navigation/native-stack";
import {LinearGradient} from 'expo-linear-gradient';
import { TextInput, Button } from 'react-native-paper';
import { IconContext, EnvelopeSimple, Heart, Cube } from "phosphor-react-native";
import colors from '../../assets/colors';
import pattern from '../../assets/patterns/pattern';
import * as Animatable from 'react-native-animatable';
// import FontAwesome from 'react-native-vecotr-icons/';
import Icon from 'react-native-vector-icons/Feather'
import {Octicons, Ionicons} from '@expo/vector-icons'
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
var width = Dimensions.get('window').width; //full width
// var height = Dimensions.get('window').height; //full height


const CompleteRegistration = ({navigation}) =>{
    const [name, setName] = useState();
    const [text, onChangeText] = React.useState("");
    const [password, onChangePassword] = React.useState('');
    return (
        <React.Fragment>

        <SafeAreaView style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <View style={styles.closeBtnContainer}>
                <Icon name="x" 
                        size={30} 
                        color={colors.text}
                        onPress={() => navigation.navigate('Welcome')}/>
                
            </View>
            <View style={styles.registerTextContainer}>
                <Text style={styles.loginTitle}>Complete Registration</Text>
            </View>
            <View style={styles.authFormContainer}>

                
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    {/* <View style={styles.inputWithIcon}> */}
                      
                    <TextInput
                    label="Name"
                    value={name}
                    style={styles.input}
                    mode='outlined'
                    onChangeText={(name) => setName(name)}
                    placeholderTextColor="#7B8794"
                    left={<TextInput.Icon name="account"  color={colors.text}/>}
                    theme={{ colors: { text: colors.text } }}
                    editable={false}
                    activeOutlineColor={colors.theme}/>
                       
                        
                

                </View>

                
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <TextInput
                    label="Name"
                    value={text}
                    style={styles.input}
                    mode='outlined'
                    onChangeText={(name) => setName(name)}
                    placeholderTextColor="#7B8794"
                    left={<TextInput.Icon name="account"  color={colors.text}/>}
                    theme={{ colors: { text: colors.text } }}
                    editable={false}
                    activeOutlineColor={colors.theme}/>
                </View>

                <View>
                    <Text style={styles.emailLabel}>Phone</Text>
                </View>
                
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    
                      
                        <TextInput
                                style={styles.input}
                                mode='outlined'
                                // label='Enter your email'
                                color='#7B8794'
                                outlineColor='#7B8794'
                                
                                onChangeText={onChangePassword}
                                placeholder="********"
                                placeholderTextColor="#7B8794"
                                left={<TextInput.Icon name="phone" color={colors.text}/>}
                                value={password}
                                theme={{ colors: { text: colors.text } }}
                            >
                        </TextInput>
                </View>
                <View style={styles.button}>
                  <TouchableOpacity onPress={() => navigation.navigate('CompleteRegistration')}>
                  
                      <LinearGradient
                          style={styles.signIn}
                          colors={['#4a42cf','#4a42cf']}>
                          <Text style={styles.textSign}>Verify<Text> </Text>
                          <Ionicons name="arrow-forward-circle" size={20} />
                          </Text>
                      </LinearGradient>
                  </TouchableOpacity>
                </View>
            </View>
         
        </SafeAreaView>
        </React.Fragment>

    )
}

const styles = StyleSheet.create({
    flexbox:{

    },

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
})

export default CompleteRegistration;