import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {
  Component,
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback
} from "react";
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler'

const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const MAX_TRANSALATE_Y = -SCREEN_HEIGHT + 50
const BottomSheetProps = {}
const BottomSheet = () =>{
    const translationY = useSharedValue(0)
    const context = useSharedValue({y: 0})
    const scrollTo = useCallback(destination => {
        'worklet';
        translationY.value = withSpring(destination, { damping: 50 });
    })
    const gesture =  Gesture.Pan()
                        .onStart(() => {
                            context.value = {y: translationY.value}
                        })
                        .onUpdate((event) => {
                            translationY.value = event.translationY + context.value.y
                            translationY.value = Math.max(translationY.value, MAX_TRANSALATE_Y);
                        }).onEnd(() =>{
                            if(translationY.value > -SCREEN_HEIGHT/3){
                                scrollTo(0)
                            }else if (translationY.value < -SCREEN_HEIGHT / 1.5) {
                              scrollTo(MAX_TRANSALATE_Y);
                            }
                        }) 
    const rBottonSheetStyle =  useAnimatedStyle(() => {
        return {
            transform: [
                {translateY : translationY.value}]
            }
    })
    useEffect(() => {
        scrollTo(-SCREEN_HEIGHT/3)
    },[])
    return(
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheetContainer, rBottonSheetStyle]}>
                <View style={styles.line}/>
                
            </Animated.View>
        </GestureDetector>

    )
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'white',
        top: SCREEN_HEIGHT,
        borderRadius: 25
    },
    line:{
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2,
    }

})

export default BottomSheet