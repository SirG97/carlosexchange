import { StyleSheet } from 'react-native'
import colors from '../../assets/colors';
const css = StyleSheet.create({
    buttonStyle: {
        flexDirection: 'row-reverse',
        width: 'auto',
        paddingTop: 6, 
        paddingBottom: 6,
        // backgroundColor: colors.theme
    },

    uploadButtonStyle: {
        flexDirection: 'row-reverse',
        width: 'auto',
        paddingTop: 0, 
        paddingBottom: 0,
        // backgroundColor: colors.theme
    },
    btnLableStyle: {
       
        backgroundColor: colors.theme,
        color: colors.white,
        
    },
    danger:{
        color: colors.red
    },

    successPill:{
        backgroundColor: colors.green,
        color: colors.white,
        borderRadius: 4,
        padding: 3,
        paddingTop:1
    },

    warningPill:{
        backgroundColor: colors.yellow,
        color: colors.white,
        borderRadius: 4,
        padding: 3,
        paddingTop:1
    },

    dangerPill:{
        backgroundColor: colors.red,
        color: colors.white,
        borderRadius: 4,
        padding: 3,
        paddingTop:1
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
       
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        
    },
    signUpLink:{
       
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        
    },
    signUpLinkText:{
        fontWeight: 'bold',
        color: colors.text,
        fontSize: 16
    },

    pressableModal: {
        flex: 1,
        padding: 15,
        backgroundColor:'rgba(0,0,0,0.7)' ,
        justifyContent: 'center',
        alignContent: 'center'
    },
    modalView:{
        backgroundColor: 'white',
        borderRadius: 20,
        width: '100%',
        padding: 35,
        alignItems: 'center',
        elevation: 5,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4
    },
    modalTitle:{
        fontSize: 20,
        marginVertical:10
    },
    modalText:{
        fontSize: 16,
        marginBottom: 20
    },
    resendContainer: {
        marginTop: 15
    }

})

export default css;