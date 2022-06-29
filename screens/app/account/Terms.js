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
} from "react-native";

import colors from "../../../assets/colors";

import { CredentialsContext } from "../../../components/CredentialsContext";

import { ScrollView } from "react-native-gesture-handler";
import { TextInput, Button, List, Title, Caption, Headline, Paragraph } from 'react-native-paper';
const Terms = ({ route, navigation }) => {
  return (
    <React.Fragment>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={{marginBottom: 60}}>
            <Headline>Terms and conditions</Headline>
            <Paragraph>These terms and conditions will serve as a basis of your relationship with us,Carlos Exchange. By choosing to open an account with us, you agree to the terms and conditions contained herein. You also confirm that you have provided us with‌ ‌the‌ ‌accurate‌ ‌and‌ ‌complete‌ ‌information‌ ‌required‌ ‌to‌ ‌create‌ ‌your‌ ‌account‌ ‌and‌ ‌that‌ ‌you‌ ‌have‌ ‌supplied‌ ‌all‌ ‌documentation,‌ ‌photographs‌ ‌and‌ ‌information‌ ‌that allow‌ ‌us‌ ‌to‌ ‌comply‌ ‌with‌ ‌our‌ ‌regulatory‌ ‌obligations</Paragraph>
            <Paragraph>If‌ ‌you‌ ‌do‌ ‌not‌ ‌agree‌ ‌to‌ ‌these‌ ‌terms‌ ‌and‌ ‌conditions,‌ ‌please‌ ‌do‌ ‌not‌ ‌proceed‌ ‌and‌ ‌exit‌ ‌the‌ ‌application‌ ‌immediately.‌ ‌Also,‌ ‌please‌ ‌be‌ ‌informed‌ ‌that‌ ‌we‌ ‌can‌ ‌terminate‌ ‌your‌ ‌relationship‌ ‌with‌ ‌us‌ ‌if‌ ‌we‌ ‌believe‌ ‌that‌ ‌you‌ ‌have‌ ‌violated‌ ‌any‌ ‌of‌ ‌these‌ ‌terms</Paragraph>
            <Headline>About us</Headline>
            <Paragraph>Carlos trade is a cryptocurrency exchange service for exchanging your cryptocurrency to fiat or vice versa at cool and affordable rates.
            We operate in a very simple way. Just create an account,verify your bank details and you can start buying and selling crypto.</Paragraph>

            <Headline>Objective of relationship</Headline> 
            <Paragraph>The objective of establishing a relationship with Carlos Exchange is to be able to buy and sell crypto with us. Carlos Exchange will provide a plaform for you to sell your crypto asset an.
                  You can operate and manage your account via our Carlos Exchange app and the prerequisite for opening an account is a smartphone, with an active email, account number and bank, that meets our minimum technology requirements for operating system (iOS/Android) and supports the latest version of our Carlos Exchange app.
              </Paragraph>  
            <Headline>When are these terms applicable?</Headline>   
            <Paragraph>These terms are applicable when you choose to open an account with Carlos Exchange
            We may, at any time, modify the terms and conditions of our relationship but we will not do this without first informing you of such modification. All updates will be detailed on our website and our app. You will be able to access the latest version of our terms at any given time.</Paragraph>    

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
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 72,
    backgroundColor: '#fff',
    

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
});
export default Terms;
