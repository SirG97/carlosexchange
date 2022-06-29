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

  StyleSheet,
  Pressable,
  View,
  Text,
  SafeAreaView,
  Linking,
  KeyboardAvoidingView,
} from "react-native";

import { TextInput, Button, List } from 'react-native-paper';

import colors from "../../../assets/colors";

import { CredentialsContext } from "../../../components/CredentialsContext";

import { ScrollView } from "react-native-gesture-handler";

const Contact = ({ route, navigation }) => {
  return (
    <React.Fragment>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
        <List.Item
            style={styles.listItem}
            title="Call"
            titleStyle={styles.listItemTitle}
            description='Contact call center'
            descriptionStyle={styles.listItemDescription}
            left={props => <List.Icon {...props} style={styles.leftListIcon} color={colors.blue} icon="phone" />}
            right={props => <List.Icon {...props} style={styles.rightListIcon} color={colors.blue} icon="chevron-right" />}
            onPress={() => {navigation.navigate('Call')}}
        />

        <List.Item
            style={styles.listItem}
            title="Send an Email"
            titleStyle={styles.listItemTitle}
            description={'We\'ll reply as soon as possible'}
            descriptionStyle={styles.listItemDescription}
            left={props => <List.Icon {...props} style={styles.leftListIcon} color={colors.blue} icon="email-outline" />}
            right={props => <List.Icon {...props} style={styles.rightListIcon} color={colors.blue} icon="chevron-right" />}
            onPress={async() => {
              await Linking.openURL('mailto: carlosfx.com@gmail.com');
            }}
        />
        <List.Item
            style={styles.listItem}
            title="Chat us"
            titleStyle={styles.listItemTitle}
            description='Send as in-app chat'
            descriptionStyle={styles.listItemDescription}
            left={props => <List.Icon {...props} style={styles.leftListIcon}  color={colors.blue} icon="forum-outline" />}
            right={props => <List.Icon {...props} style={styles.rightListIcon} color={colors.blue} icon="chevron-right" />}
            onPress={() => {}}
        />
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
    paddingTop: 32,
    paddingRight: 25,
    paddingLeft: 25,
    backgroundColor: 'white'
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

  listItemTitle:{
    fontFamily: 'Inter-Medium',
    marginLeft: -7
},
listItemDescription:{
    fontFamily: 'Inter-Regular',
    marginLeft: -7,
    marginRight: -10
},
listItem:{
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: colors.lightBlueBg,
    paddingTop: -10,
    paddingBottom: -10,
    marginBottom:12
},
leftListIcon:{
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: colors.lightBlueBg,
    marginLeft: -2,
    
},
rightListIcon:{
    borderRadius: 15,
    // borderWidth: 1.5,
    borderColor: colors.lightBlueBg,
    marginRight: -10
}
});
export default Contact;
