import React from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";

import colors from "../../../assets/colors";

import { CredentialsContext } from "../../../components/CredentialsContext";

import { ScrollView } from "react-native-gesture-handler";
import { List } from 'react-native-paper';

const FAQ = ({ route, navigation }) => {
  return (
    <React.Fragment>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>  
            <List.AccordionGroup>
              <List.Accordion 
                    style={styles.listItem}
                    title="What happens when I don't pay my dues as at when due"
                    titleNumberOfLines={3}
                    id="1">
                <List.Item 
                  title="Item 1"
                  titleNumberOfLines={10}
                  style={styles.listAnswer}/>
              </List.Accordion>

            <List.Accordion 
                  style={styles.listItem}
                  titleNumberOfLines={3}
                  title="How long does it take for a transaction to be completed" 
                  id="2">
              <List.Item 
                  style={styles.listAnswer}
                  title="If you provide proof of payment immediately, it takes about 5 mins for the transaction to be completed"
                  titleNumberOfLines={10} />
            </List.Accordion>
            <View>
              <List.Accordion 
                  style={styles.listItem}
                  title="Which wallet should I use for fast transactions" 
                  titleNumberOfLines={3}
                  id="3">
                <List.Item title="Lorem Ipso is normally the default asnser we use but I have no clue on what to write here "
                  style={styles.listAnswer}
                  titleNumberOfLines={10}/>
              </List.Accordion>
            </View>
          </List.AccordionGroup>
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
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom:12
},

listAnswer:{
  // borderWidth: 1.5,
  // borderTopLeftRadius: 0,
  // borderTopRightRadius:0,
  borderRadius: 5,
  backgroundColor: colors.lightBlueBg,
  paddingTop: 5,
  paddingBottom: 5,
  marginBottom:12,
  marginTop: -10
},

});
export default FAQ;
