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
 
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";

import { Card, Title, Text, Paragraph, Avatar, IconButton, DataTable } from 'react-native-paper';
import colors from "../../../assets/colors";

import { CredentialsContext } from "../../../components/CredentialsContext";

import { ScrollView } from "react-native-gesture-handler";

const optionsPerPage = [2, 3, 4];

const Referrals = ({ route, navigation }) => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <React.Fragment>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
            
            <View style={styles.overview}>
              <Card style={styles.overviewcard} mode="outlined">
                <Title style={styles.cardtitle}>Total Referrals</Title>
                <Text style={styles.cardValue} variant="titleLarge">0</Text>
              </Card>

              <Card style={styles.overviewcard} mode="outlined">
                <Title style={styles.cardtitle}>Referral Balance</Title>
                <Text style={styles.cardValue} variant="titleLarge">$0</Text>
              </Card>
            </View>
            <View>
                <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Amount Withdrawn</DataTable.Title>
                      <DataTable.Title numeric>Balance</DataTable.Title>
                      <DataTable.Title numeric>Date</DataTable.Title>
                    </DataTable.Header>
              
                    <DataTable.Row>
                      <DataTable.Cell>$17</DataTable.Cell>
                      <DataTable.Cell numeric>$40</DataTable.Cell>
                      <DataTable.Cell numeric>6.0</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell>$17</DataTable.Cell>
                      <DataTable.Cell numeric>$40</DataTable.Cell>
                      <DataTable.Cell numeric>6.0</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell>$17</DataTable.Cell>
                      <DataTable.Cell numeric>$40</DataTable.Cell>
                      <DataTable.Cell numeric>6.0</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell>$17</DataTable.Cell>
                      <DataTable.Cell numeric>$40</DataTable.Cell>
                      <DataTable.Cell numeric>6.0</DataTable.Cell>
                    </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>$17</DataTable.Cell>
                    <DataTable.Cell numeric>$40</DataTable.Cell>
                    <DataTable.Cell numeric>6.0</DataTable.Cell>
                  </DataTable.Row>     
              
                    <DataTable.Pagination
                      page={page}
                      numberOfPages={3}
                      onPageChange={(page) => setPage(page)}
                      label="1-2 of 6"
                      optionsPerPage={optionsPerPage}
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                      showFastPagination
                      optionsLabel={'Rows per page'}
                    />
              </DataTable>
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
    paddingBottom: 22,
    backgroundColor: '#fff'
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

  overview:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
   
  },

  overviewcard:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin:5,
    paddingLeft:10,
    paddingBottom: 5
  },

  cardtitle:{
    fontSize: 14,
    
    fontWeight: "400",
    color: colors.grey400
  },
  cardValue:{
    fontWeight: 'bold',
    fontSize: 16,
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
export default Referrals;