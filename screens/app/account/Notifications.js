import React, { Component, useState, useRef, useMemo, useCallback, useEffect, useContext} from "react";
import { ImageBackground, Image, StyleSheet, Pressable, View,Text, SafeAreaView,KeyboardAvoidingView,Platform, Button
} from "react-native";
import { TextInput, Card, List, ActivityIndicator, Divider, Colors} from 'react-native-paper';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { FlatList } from 'react-native-gesture-handler'
import colors from "../../../assets/colors";
import axios from 'axios';
import { CredentialsContext } from "../../../components/CredentialsContext";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";



const NotificationsPage = ({ route, navigation }) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
  const getNotifications = async() => {
    // console.log('token is ',token)
    const config = {
        headers:{
          Authorization: `Bearer  ${storedCredentials.token}`,
          'auth-token': storedCredentials.token
        }
      };
    const url = 'https://app.carlosexchange.com/api/user/notifications';
    await axios.get(url, config).then((response) => {
        const result = response.data
       
        setNotifications(result.data.notifications)
        console.log(result.data.notifications)
        setLoading(false)

    }).catch((err) =>{
        console.log('Dashboard info: ', err)
    })

  }

  const renderNotifications = ({item}) => {
    let d =  JSON.parse(item.data)
    return(
        <View>
              <List.Item
                  title={d.header}
                  description={moment(item.createdAt).startOf('hour').fromNow()}
                  style={{ paddingTop: 5, paddingBottom: 5}}
                  titleStyle={{  fontFamily: 'Inter-Medium', color: colors.text}}
                  onPress={() => {
                
                    
                  }}
                  />
          <Divider />
        </View>
    )
  }
  useEffect(() => {
    getNotifications();
  }, []);
  return (
    <React.Fragment>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View>
              {loading ? <ActivityIndicator/> : (
                  <View>
                  {notifications == false ? 
                      <View style={styles.emptyRecent}>
                          <Text>No activity yet</Text>
                      </View>: 
                      (
                          <FlatList
                              scrollEnabled={true}
                              showsVerticalScrollIndicator={false}
                              data={notifications}
                              keyExtractor={({ id }, index) => id}
                              renderItem={renderNotifications}
                              />
                        
                        
                      )
                  }
                  </View>
              )}
          </View>
        </View>
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
});
export default NotificationsPage;
