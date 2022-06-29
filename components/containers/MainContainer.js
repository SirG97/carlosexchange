import React, { Component } from 'react';
import { StyleSheet, View, Text,  SafeAreaView, ScrollView } from 'react-native';

const MainContainer = (props) =>{
    return (
        <React.Fragment>
            <View {...props} style={styles.container}>
                <View style={styles.innerContainer}>
                    {props.children}
                </View>
               
            </View>
        </React.Fragment>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 20
    },
    innerContainer: {
        marginBottom: 50,
        flex:1,
        paddingBottom: 40
    }
});

export default MainContainer