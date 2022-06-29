import React, { Component, useState, useRef,useMemo, useCallback, useEffect, useContext } from 'react';
import {ImageBackground, Image, StyleSheet, Pressable, View, Text,  SafeAreaView,KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/native-stack";
import { Bell } from "phosphor-react-native";
import {Shadow} from 'react-native-shadow-2';
import Icon from 'react-native-vector-icons/Feather';
// import DropShadow from "react-native-drop-shadow";
import colors from '../../../assets/colors';
import RBSheet from "react-native-raw-bottom-sheet";
import pattern from '../../../assets/patterns/pattern';
import {Octicons, Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from '../../../components/CredentialsContext';
import { TextInput, Button, RadioButton, Divider,List, Title, Paragraph, ActivityIndicator} from 'react-native-paper';
import { ScrollView, FlatList } from "react-native-gesture-handler";
import css  from '../../../assets/css/Styles'
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import MessageModal from '../../../components/modals/MessageModal';



const Profile = ({ route, navigation }) =>{
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    // console.log('stored thing is',storedCredentials.token)
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(true)
    const [invalid, setInvalid] = useState(true);
    const [resolvingMessage, setResolvingMessage] = useState('');
    const [resolvingMessageType, setResolvingMessageType] = useState();
    const [message, setMessage] = useState("");
    const [name, setName] = useState(storedCredentials.user.name);
    const [phone, setPhone] = useState(storedCredentials.user.phone);
    const [selectedBank, setSelectedBank] = React.useState(storedCredentials.user.bank)
    const [selectedBankCode, setSelectedBankCode] = React.useState(storedCredentials.user.bank_code)
    
    const [messageType, setMessageType] = useState()
    const [banks, setBanks] = React.useState([])
    const [account, setAccount] = React.useState(storedCredentials.user.account_number)
    const [image, setImage] = React.useState(storedCredentials.user.profile_photo);
    const [uri, setUri] = React.useState();

    const refRBSheet = useRef()
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessageType, setModalMessageType] = useState("");
    const [headerText, setHeaderText] = React.useState("");
    const [buttonText, setButtonText] = React.useState("");
    const [modalMessage, setModalMessage] = useState("");
    const user = storedCredentials.user
    const showModal = (type, headerText, message, buttonText) => {
      setModalMessageType(type);
      setHeaderText(headerText);
      setModalMessage(message);
      setButtonText(buttonText);
      setModalVisible(true);
    };
    const buttonHandler = () => {
    //   if (modalMessageType === "success") {
    //     navigation.navigate("Home");
    //   }
      setModalVisible(false);
    };
    
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

    //   console.log("Result uri is ", result.uri);

      if (!result.cancelled) {
        setImage(result);
        setUri(result.uri);
        setInvalid(false);
      }
      // console.log('The image inside pickImage is ', result.uri)
    };
    const getBanks = () => {
        const url = "https://app.carlosexchange.com/api/user/banks";
        try {
            axios
            .get(url)
            .then((response) => {
            const result = response.data;
            const { message, status, data } = result;

            if (status !== "success") {
                setBanks([]);
            } else {
                setBanks(data);
                
            }
            })
            .catch((err) => {
                setBanks([]);
            });
        } catch (err) {
        // console.log(`The error is ${err}`);
        } finally {
        setIsLoading(false);
        }
    };

    const renderBanks = ({ item }) => {
        return (
        <View>
            <List.Item
            title={item.name}
            style={{ padding: 14 }}
            titleStyle={{
                textTransform: "uppercase",
                fontFamily: 'Inter-Medium',
                color: colors.text,
                fontSize: 14
            }}
            onPress={() => {
                refRBSheet.current.close();
                setSelectedBank(item.name);
                setSelectedBankCode(item.code);
                resolveAccount()
            }}
            />
            <Divider />
        </View>
        );
    };
    const handleMessage = (message, type = "error") => {
        setMessage(message);
        setMessageType(type);
    };
    const handleResolvingMessage = (message, type = "error") => {
        setResolvingMessage(message);
        setResolvingMessageType(type);
    };

    
    const resolveAccount = (acc = account) => {
        // Set name to empty and valid to false to disable the save button
        setInvalid(true);
        // console.log('account after login is ', acc)
        // console.log("selected bank is ", selectedBank);
        // console.log("selected bankCode is ", selectedBankCode);
        if (acc != false && selectedBankCode != false) {
        const url =
            "https://app.carlosexchange.com/api/user/account/resolve";

        const data = {
            account_number: acc,
            bank_code: selectedBankCode,
        };

        handleResolvingMessage("Resolving please wait...", "info");
        axios
            .post(url, data)
            .then((response) => {
            const result = response.data;
            const { message, status, data } = result;
            // console.log(data);
            if (status == false) {
                handleResolvingMessage(message, "error");
            } else {
                setName(data.account_name);
                setInvalid(false);
                handleResolvingMessage(message, "success");
                // navigation.navigate('EmailVerification', {email: data.email, id: data.user_id})
            }
            // setLoading(false)
            })
            .catch((err) => {
            // setMessageType('error')
                handleResolvingMessage(
                "An error occurred please try again",
                "error"
                );
                setInvalid(true);
                // console.log(err);
            });
        }
    };


    const updateProfile =  () => {
        setLoading(true);
        const url = "https://app.carlosexchange.com/api/user/profile/update";

        const details = {
          bank: selectedBank,
          bank_code: selectedBankCode,
          account_number: account,
          phone: phone,
          name: name,
          
        };

      const formData = new FormData();
      if(image != null){
        formData.append("image", {
            name: `${Date.now()}_proof.${image.uri.substring(
            image.uri.lastIndexOf(".") + 1
            )}`,
            uri: image.uri,
            type: `image/${image.uri.substring(image.uri.lastIndexOf(".") + 1)}`,
        });
      }

      formData.append("bank_code", details.bank_code);
      formData.append("bank", details.bank);
      formData.append("account_number", details.account_number);
      formData.append("account_name", details.name);
      formData.append("phone", details.phone);

    //   console.log(
    //     "form data is ",
    //     formData,
    //     "photo stored in async is ",
    //     storedCredentials.user.profile_photo
    //   );
    // setLoading(false);
        // console.log(
        // "stored user credentials before update is ",
        // storedCredentials.user
        // );
        // console.log(
        // "stored token credentials before update is ",
        // storedCredentials.token
        // );
        // console.log(
        // "stored image credentials before update is ",
        // storedCredentials.image
        // );
      
      try {
        axios
          .post(url, formData, {
            headers: {
              "auth-token": storedCredentials.token,
              "Content-Type": "multipart/form-data",
            },
            transformRequest: (data) => data,
          })
          .then((response) => {
            const result = response.data;
            const { message, status, data } = result;
            // console.log("Upload response is ", result);
            if (status === "success") {
              setLoading(false);
                // Retrieve item in async AsyncStorage
            
                //Parse it to json 
                // Update new user values


           
             setInvalid(false);
             setStoredCredentials({...data});
            //  console.log("stored user credentials after ", storedCredentials.user);
            //  console.log("stored token credentials after ", storedCredentials.token);
            //  console.log("stored image credentials after ", storedCredentials.image);
            //  console.log('whole data is ', data.user, data.image, data.token)
              return showModal("success", "Success", message, "Close");
            } else {
              setLoading(false);
              return showModal("failed", "Failed", message, "Try Again");
            }
          })
          .catch((err) => {
              setLoading(false);
                console.log("Err inside try catch is ", err.response);
            return showModal("failed", "Failed", 'An error occurred. Please try again', "Try Again");
          
          });

 
      } catch (error) {
        console.log("the upload error is ", error.stack);
      }
    };

       const persistUpdate = async (credentials, message, status) => {
        await AsyncStorage.removeItem("CarlosexchangeCredentials");
         await AsyncStorage.setItem(
           "CarlosexchangeCredentials",
           JSON.stringify(credentials)
         )
           .then(() => {
            //  console.log("credentials are ", credentials);
             setStoredCredentials(credentials);
           })
           .catch((error) => {
             console.log("Persisting login error is ", error);
             handleMessage("Persisting login failed");
           });
       };
    useEffect(() => {
        getBanks();
    }, []);

    return (
      <React.Fragment>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            <View style={styles.profilePictureSection}>
              <View style={styles.profilePictureContainer}>
                <Image
                  style={styles.profilepic}
                  source={
                    uri != null
                      ? { uri: uri }
                      : user.profile_photo != null
                      ? { uri: `${storedCredentials.image}` }
                      : require("../../../assets/avatar.png")
                  }
                />
                <Pressable style={styles.uploadButtonStyle}>
                  <Ionicons
                    name="camera"
                    onPress={pickImage}
                    size={25}
                    color={colors.theme}
                  />
                </Pressable>
              </View>
            </View>

            <View style={styles.profileDetailsSection}>
              <View style={styles.profileDetailsContainer}>
                <View style={styles.profileDetails}>
                  <View style={styles.profileDetailsRow}>
                    <TextInput
                      style={[styles.input, { backgroundColor: "#ddd" }]}
                      label="Name"
                      mode="outlined"
                      value={name}
                      color="#7B8794"
                      keyboardShouldPersistTaps="handled"
                      outlineColor={colors.lightBlueBg}
                      activeOutlineColor={colors.theme}
                      onChangeText={(value) => {}}
                      placeholder="Name"
                      editable={false}
                      placeholderTextColor="#7B8794"
                      theme={{ colors: { text: colors.text } }}
                    />
                  </View>
                  <View style={styles.profileDetailsRow}>
                    <TextInput
                      style={styles.input}
                      label="Email"
                      mode="outlined"
                      value={user.email}
                      color="#7B8794"
                      keyboardShouldPersistTaps="handled"
                      outlineColor={colors.lightBlueBg}
                      activeOutlineColor={colors.theme}
                      onChangeText={(value) => {}}
                      placeholder="Amount"
                      placeholderTextColor="#7B8794"
                      editable={false}
                      theme={{ colors: { text: colors.text } }}
                    />
                  </View>
                  <View style={styles.profileDetailsRow}>
                    <TextInput
                      style={styles.input}
                      mode="outlined"
                      label="Phone"
                      value={phone}
                      color="#7B8794"
                      keyboardType="numeric"
                      keyboardShouldPersistTaps="handled"
                      outlineColor={colors.lightBlueBg}
                      activeOutlineColor={colors.theme}
                      onChangeText={(value) => {
                        setPhone(value);
                        setInvalid(false);
                      }}
                      placeholder="09012345678"
                      placeholderTextColor="#7B8794"
                      theme={{ colors: { text: colors.text } }}
                    />
                  </View>
                  <View style={styles.profileDetailsRow}>
                    <Pressable
                      onPress={() => {
                        refRBSheet.current.open();
                      }}
                    >
                      <TextInput
                        label="Select Bank"
                        value={selectedBank}
                        style={styles.input}
                        outlineColor={colors.lightBlueBg}
                        activeOutlineColor={colors.theme}
                        mode="outlined"
                        onChangeText={() => {
                          resolveAccount();
                        }}
                        placeholderTextColor="#7B8794"
                        right={
                          <TextInput.Icon
                            name="chevron-down"
                            onPress={() => refRBSheet.current.open()}
                            color={colors.text}
                          />
                        }
                        theme={{ colors: { text: colors.text } }}
                        editable={false}
                      />
                    </Pressable>
                  </View>
                  <View style={styles.profileDetailsRow}>
                    <TextInput
                      style={styles.input}
                      mode="outlined"
                      label="Account number"
                      value={account}
                      color="#7B8794"
                      keyboardType="numeric"
                      keyboardShouldPersistTaps="handled"
                      outlineColor={colors.lightBlueBg}
                      activeOutlineColor={colors.theme}
                      onChangeText={(account) => {
                        setAccount(account);
                        console.log("Account in text input", account);
                        if (account != false && account.length == 10) {
                          resolveAccount(account);
                        } else {
                          setName("");
                          setMessage("");
                        }
                      }}
                      placeholder="09012345678"
                      placeholderTextColor="#7B8794"
                      theme={{ colors: { text: colors.text } }}
                    />
                  </View>
                  <Text
                    style={[
                      styles.toast,
                      resolvingMessageType == "success"
                        ? styles.success
                        : resolvingMessageType == "error"
                        ? styles.error
                        : styles.info,
                    ]}
                  >
                    {resolvingMessage}
                  </Text>
                  <View style={styles.profileDetailsRow}>
                    <TextInput
                      style={styles.input}
                      mode="outlined"
                      label="Account name"
                      value={name}
                      color="#7B8794"
                      keyboardShouldPersistTaps="handled"
                      outlineColor={colors.lightBlueBg}
                      activeOutlineColor={colors.theme}
                      onChangeText={(value) => {}}
                      placeholder="09012345678"
                      placeholderTextColor="#7B8794"
                      theme={{ colors: { text: colors.text } }}
                      editable={false}
                    />
                  </View>

                  <View style={styles.profileDetailsRow}>
                    <Button
                      onPress={() => updateProfile()}
                      color={colors.theme}
                      loading={loading}
                      mode="contained"
                      disabled={invalid}
                      contentStyle={css.buttonStyle}
                      labelStyle={css.buttonStyle}
                      style={{ width: "100%", color: colors.white }}
                    >
                      Save
                    </Button>
                  </View>
                </View>
              </View>
            </View>
            <MessageModal
              modalVisible={modalVisible}
              buttonHandler={buttonHandler}
              type={modalMessageType}
              headerText={headerText}
              message={modalMessage}
              buttonText={buttonText}
            />
          </ScrollView>
          <RBSheet
            ref={refRBSheet}
            height={700}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent",
                borderTopLeftRadius: 7,
              },

              container: {
                borderRadius: 20,
              },
              draggableIcon: {
                backgroundColor: "#000",
              },
            }}
          >
            <View>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  data={banks}
                  keyExtractor={({ id }, index) => id}
                  renderItem={renderBanks}
                />
              )}
            </View>
          </RBSheet>
        </KeyboardAvoidingView>
      </React.Fragment>
    );
}

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

  profilePictureSection: {},
  profilePictureContainer: {
    position: "relative",
    // width: '100%',
    // borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  profilepic: {
    width: 120,
    height: 120,
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 60
  },
  uploadButtonStyle: {
    backgroundColor: colors.lightBlueBg,
    padding: 6,
    borderRadius: 50,
    position: "absolute",
    bottom: -2,
    right: "32%",
  },
  profileDetailsSection: {
    marginTop: 32,
  },
  profileDetailsContainer: {},
  profileDetails: {},
  profileDetailsRow: {
    marginBottom: 15,
  },
  input: {},
  contentContainer: {
    backgroundColor: "white",
    flex: 1,
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
export default Profile