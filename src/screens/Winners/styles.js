import { RFValue } from 'react-native-responsive-fontsize';
const { StyleSheet } = require('react-native');
import {
    Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
    safeStyle: {
        flex: 1,
        // backgroundColor:colors.background,
    },
    headerText: {
        color: '#ffffff',
        fontFamily: 'Axiforma-SemiBold',
        fontSize: RFValue(22)
    },
    subHeaderText: {
        color: '#FFFFFF',
        fontFamily: 'Axiforma-Regular'
    },
    heading2Text: {
        color: '#420E92', fontFamily: 'Axiforma-Bold', fontSize: RFValue(15)
    },
    text: {
        color: '#000000',
         fontFamily: 'Axiforma-Regular', 
         fontSize: RFValue(13),
         lineHeight:height*0.028,
         textAlign:'center',
         paddingLeft:10,
         paddingRight:10,
         width:'50%',
         
    },
    secondView:{
        width:width*0.93,
        height:height*0.11,
        backgroundColor:'#fff',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:12
    }

});
