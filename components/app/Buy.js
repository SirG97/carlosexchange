import React, { Component, useState } from 'react';
import {ImageBackground,TouchableOpacity, Dimensions, Image, StyleSheet, View, Text,  SafeAreaView, Modal, Popover, Alert, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/native-stack";
import SelectDropdown from 'react-native-select-dropdown'
import { Bell } from "phosphor-react-native";
import Icon from 'react-native-vector-icons/Feather'
import {LinearGradient} from 'expo-linear-gradient';
import colors from '../../assets/colors';
import {Octicons, Ionicons} from '@expo/vector-icons'

import { TextInput, Button } from 'react-native-paper';

const countries = ["Bitcoin(BTC)", "Ethereum(ETH)", "Shiba Inu(SHIB)", "Tether(USDT)"]
const networks = ["BEP20", "ERC20", "BEB20", "Bitcoin Cash"]
const Buy = () => {
    const [text, onChangeText] = React.useState("");
    const [password, onChangePassword] = React.useState('');
    const [modalVisible, setModalVisible] = useState(false);
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

                <View style={styles.authFormContainer}>
            
                    <View style={styles.infoText}>
                        <Text style={styles.rate}>Rate: 540/$</Text>
                        <Text style={styles.warning}>NB: Lowest transaction amount is $50</Text>
                    </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    {/* <View style={styles.inputWithIcon}> */}
                      
                    <SelectDropdown
                        data={countries}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        defaultButtonText="Select coin"
                        buttonTextStyle={styles.dropdownText}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}

                        renderDropdownIcon={() =>{
                            return(
                                <Icon name="chevron-down" size={20}  color={colors.text}/>
                            )
                            
                        }}
                        buttonStyle={styles.inputDropdown}
                    />
                       
                        
                

                </View>

              
                <TextInput
                    label="Amount"
                    // value={email}
                    style={styles.input}
                    mode='outlined'
                    onChangeText={(email) => handlePassword(email)}
                    placeholderTextColor="#7B8794"
        
                    theme={{ colors: { text: colors.text } }}
                    activeOutlineColor={colors.theme}/>

                    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    {/* <View style={styles.inputWithIcon}> */}
                      
                    <SelectDropdown
                        data={networks}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        defaultButtonText="Coin network"
                        buttonTextStyle={styles.dropdownText}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}

                        renderDropdownIcon={() =>{
                            return(
                                <Icon name="chevron-down" size={20}  color={colors.text}/>
                            )
                            
                        }}
                        buttonStyle={styles.inputDropdown}
                    />
                       
                        
                

                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                        <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Wallet Address'
                                color='#7B8794'
                                outlineColor='#7B8794'
                                
                                onChangeText={onChangePassword}
                                placeholder=""
                                placeholderTextColor="#7B8794"
                                // left={<TextInput.Icon name="phone" color={colors.text}/>}
                                value={password}
                                theme={{ colors: { text: colors.text } }}
                            >
                        </TextInput>                        
                      
                        <TextInput
                            style={styles.input}
                            mode='outlined'
                            label='Option information'
                            color='#7B8794'
                            outlineColor='#7B8794'
                            multiline = {true}
                            numberOfLines = {4}
                            onChangeText={onChangePassword}
                            placeholder=""
                            placeholderTextColor="#7B8794"
                            // left={<TextInput.Icon name="phone" color={colors.text}/>}
                            value={password}
                            theme={{ colors: { text: colors.text } }}
                        >
                    </TextInput>
                    <Button 
                        mode="contained" 
                        onPress={() => setModalVisible(true)}
                        style={styles.startedBtn}>
                        Continue
                    </Button>
                </View>

            </View>
                
            <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Select a bank from the option to transfer to.</Text>
                    <Text style={styles.modalText}>Third party payments are not allowed. Payments must be made from your personal account, matching your verified name on your profile.</Text>
                    <Text style={styles.modalText}>For a successful transaction, do not enter any crypto related terms (BTC, USDT, etc.) in your payment narration.</Text>
                    <Text style={styles.modalText}>Opening orders without making payment is not allowed. It can lead to banning you from the platform.</Text>
                    <Text style={styles.modalText}>Failure to comply with the above stated terms leads to limitation on your Carlosexchange account and total loss of paid amount.</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    {/* <View style={styles.inputWithIcon}> */}
                      
                    <SelectDropdown
                        data={countries}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        defaultButtonText="Select coin"
                        buttonTextStyle={styles.dropdownText}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}

                        renderDropdownIcon={() =>{
                            return(
                                <Icon name="chevron-down" size={20}  color={colors.text}/>
                            )
                            
                        }}
                        buttonStyle={styles.inputDropdown}
                    />

                </View>
                 
                <View style={styles.confirmBtnContainer}>
                <Button icon="close" 
                        compact={true} 
                        style={styles.confirmBtn}
                        mode="contained" 
                        color={colors.red}
                        onPress={() => console.log('Pressed')}>
                    Cancel
                </Button>
                <Button icon="check" 
                        compact={true} 
                        style={styles.confirmBtn}
                        mode="contained" 
                        color={colors.blue}
                        onPress={() => console.log('Pressed')}>
                    Agree and proceed
                </Button>
             </View>
                </View>
                </View>
            </Modal>
           
            </View>

            </View>
            
        </React.Fragment>
    );
}
const {height, width} = Dimensions.get('screen');
const styles = StyleSheet.create({
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

      rate:{
        fontSize: 16,
        color: colors.text,
        fontWeight: 'bold',
      },

      warning:{
        fontSize: 16,
        color: colors.red,
        fontWeight: 'bold',
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
        marginBottom: 5,
        marginTop: 5,
        color: colors.text,
        fontWeight: 'bold',
        
      },

      inputDropdown: {
        height: 60,
        margin: 12,
        width: '100%',
        borderWidth: 1,
        borderColor: colors.text,
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'flex-start',
        borderRadius: 6,
        backgroundColor: 'white',
        fontFamily: 'Inter-Black',
        fontSize: 16,
        // borderWidth: 0.5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 5,
        marginTop: 5,
        color: '#7B8794',
        fontWeight: 'bold',
        
      },
    
      dropdownText:{
        color: colors.text,
       fontWeight: 'bold',
       fontSize: 14,
       marginLeft: -190,
        
      },

      startedBtn:{
          width: '100%',
          paddingTop: 15,
          paddingBottom: 15,
          marginTop: 20,
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
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 6,
        padding: 5,
        width: 'auto',
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: colors.grey400,
      },
      buttonClose: {
        backgroundColor: colors.grey400,
      },
      textStyle: {
        color: 'white',
        fontWeight: "bold",
        textAlign: "left"
      },
      modalText: {
        marginBottom: 5,
        textAlign: "left",
        color: colors.red,
        fontSize: 16
      },
      button2: {
          flex:1,
        alignItems: 'center',
        marginBottom: 5,
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
    confirmBtnContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',


        
    },
    confirmBtn:{
        padding: 10,
        justifyContent: 'center',
        marginRight: 10
    }

});

export default Buy;