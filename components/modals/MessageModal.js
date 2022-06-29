import React, { Component, useState} from 'react';
import { Modal, View, Pressable, Text } from 'react-native'
import colors from '../../assets/colors';
import  css  from '../../assets/css/Styles'
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { TextInput, Button, RadioButton, List, Divider, Checkbox, TouchableRipple,  DataTable, Card, Subheading, Caption, Headline, Title, Paragraph, ActivityIndicator} from 'react-native-paper';
const MessageModal = ({modalVisible, buttonHandler, type,headerText, message, buttonText}) => {
    // const [modalVisible, setModalVisible] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [invalid, setInvalid] = useState(true);

    return (
        <Modal animationType='slide' visible={modalVisible} transparent={true}>
            <Pressable style={css.pressableModal} onPress={buttonHandler}>
                <View style={css.modalView}>
                    <MaterialCommunityIcons 
                    size={100}
                    name={type === 'success'? 'check-circle': 'close-circle'}
                    color={type === 'success'? colors.green: colors.red} />
                    <Text style={css.modalTitle}>{headerText}</Text>
                    <Text style={css.modalText}>{message}</Text>
                    <Button 
                            onPress={buttonHandler}    
                            color={colors.theme}
                            loading={loading}
                            mode='contained'
                           
                            contentStyle={css.buttonStyle}
                            labelStyle={css.buttonStyle}
                            style={{ width: '100%', color: colors.white }}>
                                {buttonText || `Complete`} 
                            </Button>
                </View>
            </Pressable>
        </Modal>

    )
}



export default MessageModal;