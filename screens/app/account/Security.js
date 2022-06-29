import React, {
  Component,
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  Pressable,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity, ActivityIndicator
} from "react-native";

import colors from "../../../assets/colors";
import Icon from 'react-native-vector-icons/Feather'
import axios from 'axios';
import  css  from '../../../assets/css/Styles'
import { CredentialsContext } from "../../../components/CredentialsContext";
import { TextInput, Button, Headline, Subheading } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";

const Security = ({ route, navigation }) => {
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isOldSecureEntry, setIsOldSecureEntry] = useState(true);
  const [isSecureEntry, setSecureEntry] = useState(true);
  const [isConfirmSecureEntry, setConfirmSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const validateOldPassword = (oldPassword) => {
    handleMessage(null)
    setInvalid(true)
    if(oldPassword.length == 0 ){
        handleMessage('Please enter your old password')
        return;
    }
    if(passwordConfirmation.length != 0 && password !== passwordConfirmation){
        handleMessage('Password confirmation do not match')
        return;
    }

    if(oldPassword.length != 0 &&  
        password.length != 0 && 
        passwordConfirmation.length != 0 
        && password == passwordConfirmation){
        setInvalid(false)
    }
  }
  const validatePassword = (password) => {
    handleMessage(null)
    setInvalid(true)
    if(password.length == 0 || password.length < 6){
        handleMessage('Please enter a valid password')
        return;
    }
    if(passwordConfirmation.length != 0 && password !== passwordConfirmation){
        handleMessage('Password confirmation do not match')
        return;
    }

    if(oldPassword.length != 0 &&  
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

    if(oldPassword.length != 0 &&  password.length != 0 &&  passwordConfirmation.length != 0 
    && password == passwordConfirmation){
        setInvalid(false)
    }
  }

  
  const handleMessage = (message, type = 'failed') => {
    setMessage(message);
    setMessageType(type)
  }

  const changePassword = () =>{
    setLoading(true);
    
    const url = 'https://app.carlosexchange.com/api/user/changepassword';
    const data = {
      email: storedCredentials.user.email,
      oldPassword: oldPassword,
      password: password,
      passwordConfirmation: passwordConfirmation,
    }
    axios.post(`${url}`, data, {
      headers:{
        Authorization: `Bearer  ${storedCredentials.token}`,
        'auth-token': storedCredentials.token
        
      }
    })
      .then(res => {
        setLoading(false);
        console.log(res.status);
        handleMessage('Password changed successfully', 'success')
        setInvalid(true)
      }).catch(err => {
        setLoading(false);
        handleMessage(err.response.data.message)
      }).finally(() => {
        setLoading(false);
      }
      )
  }


  return (
    <React.Fragment>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
        <Headline style={styles.headline}>Change Password</Headline>
       
          <View style={styles.footer}>
          <View>
              <Text style={css.danger}>
                   {message}
              </Text>
          </View>
          <View style={styles.action}>
              <TextInput
                  label="Old Password"
                  value={oldPassword}
                  secureTextEntry={isOldSecureEntry}
                  style={styles.input}
                  mode='outlined'
                  onChangeText={(value) => {
                      setOldPassword(value)
                      validateOldPassword(value)
                  }}
                  placeholderTextColor="#7B8794"
                  left={<TextInput.Icon name="lock"  color={colors.lightBlue}/>}
                  right={<TextInput.Icon 
                    name={isOldSecureEntry? 'eye' : 'eye-off'}  
                    onPress={() => {setIsOldSecureEntry((prev) => !prev)}}
                    color={colors.lightBlue}/>}
                  theme={{ colors: { text: colors.text } }}
                  outlineColor={colors.lightBlueBg}
                  activeOutlineColor={colors.theme}
                  />
              
          </View>

          <View style={styles.action}>
              <TextInput
                  label="New Password"
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
              onPress={() => changePassword()}
              color={colors.theme}
              loading={loading}
              mode="contained"
              disabled={invalid}
              contentStyle={css.buttonStyle}
              labelStyle={css.buttonStyle}
              style={{ width: "100%", color: colors.white }}>
              Proceed
          </Button>
        </View>
          
      </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 12,
    paddingRight: 32,
    paddingLeft: 32,
    paddingBottom: 22,
    // backgroundColor: '#fff'
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    // borderWidth: 2,
    // borderColor: 'red'
  },

  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  toast: {
    marginTop: -15,
    marginBottom: 15,
  },

  success: {
    color: colors.green,
  },

  error: {
    color: colors.red,
  },

  info: {
    color: colors.yellow,
  },
  action:{
    marginBottom: 10,
  },
  button:{
    marginTop: 10,
  },
  headline:{
    fontSize: 20
  }
});
export default Security;
