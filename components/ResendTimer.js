import React, { Component, useState,useRef, useEffect, useContext } from 'react';
import {View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import css  from '../assets/css/Styles'
import colors from '../assets/colors';

const ResendText = (props) => {
    const { resendStatus } = props;
    return (
        <View style={[resendStatus == 'failed!'? colors.red : colors.green]}>
           <Text style={styles.resendText}> {resendStatus}</Text> 
        </View>
    )    
   
}

const ResendTimer = ({activeResend, setActiveResend, targetTimeInSec, resendEmail, resendStatus,...props}) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [targetTime, setTargetTime] = useState(null);

    let resendTimerInterval;
    const triggerTimer = (targetTimeInSec = 30) => {
        console.log('trigger timer just ran')
        setTargetTime(targetTimeInSec);
        setActiveResend(false)

        const finalTime = +new Date() + targetTimeInSec * 1000;
        resendTimerInterval = setInterval(() => calculateTimeLeft(finalTime))

    }

    const calculateTimeLeft = (finalTime) => {
        const difference = finalTime - +new Date();
        if(difference >= 0){
            setTimeLeft(Math.round(difference / 1000));
        }else{
            clearInterval(resendTimerInterval);
            setActiveResend(true)
            setTimeLeft(null)
        }
    }

    useEffect(() => {
        triggerTimer(targetTimeInSec)
        return () => {
            clearInterval(resendTimerInterval)
        }
    }, [])
    return (
        <View style={css.resendContainer}>
            <View style={css.smallText}>
                <TouchableOpacity style={css.signUpLink}>
                <View style={styles.signUpLinkText}>
                    <Text style={css.signUpLinkText}>{"Didn't receive the email? "} Click</Text>
                    <Pressable style={styles.resendLink} onPress={() =>{resendEmail(triggerTimer)}} disabled={!activeResend}>
                        <Text style={styles.resendText}><ResendText resendStatus={resendStatus}>{resendStatus}</ResendText> </Text>
                    </Pressable>  
                    <Text style={styles.resendText}>
                    {!activeResend && (<Text> in {timeLeft || targetTime}second(s) </Text>)}
                    </Text>
                
                </View>
                    
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    signUpLinkText:{
        fontWeight: 'bold',
        color: colors.text,
        fontSize: 16,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    

    resendLink: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        color: colors.text,
        fontWeight: 'bold',
    },
    resendText:{
        color: colors.text,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        fontWeight: 'bold',
        fontSize: 16,
    }
    
})

export default ResendTimer
