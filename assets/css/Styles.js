import { StyleSheet } from 'react-native'
import colors from '../../assets/colors';
const css = StyleSheet.create({
    buttonStyle: {
        flexDirection: 'row-reverse',
        width: 'auto',
    },
    btnLableStyle: {
        color: colors.white
    },
    danger:{
        color: colors.red
    }
})

export default css;