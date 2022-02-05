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
        color: '#D9FE51',
        fontFamily: 'Axiforma SemiBold',
        fontSize: RFValue(22)
    },
    subHeaderText: {
        color: '#FFFFFF',
        fontFamily: 'Axiforma Regular'
    },
    heading2Text: {
        color: '#420E92', fontFamily: 'Axiforma Bold', fontSize: RFValue(15)
    },
    text: {
        color: '#000000',
         fontFamily: 'Axiforma Regular', 
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
    },
    titleTxt: {
        marginTop: height * 0.01
      },
      textHeading: {
        color: '#6F5F87', fontFamily: 'Axiforma Bold', fontSize: RFValue(16), textAlign: 'center'
      },
      mainTextHeading: {
        color: '#6F5F87', fontFamily: 'Axiforma Regular', fontSize: RFValue(16), textAlign: 'center', lineHeight: height * 0.03
      },
      refferBox: {
        width: width * 0.29,
        height: height * 0.12,
        backgroundColor: '#F2EFF5',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
      },
      refferBoxSelected: {
        width: width * 0.29,
        height: height * 0.12,
        backgroundColor: '#F2EFF5',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2, borderColor: '#420E92'
      },
    
    
      text: {
        color: '#420E92', fontFamily: 'Axiforma Bold', fontSize: RFValue(14)
      },
      descriptionText: {
        color: '#000000', fontFamily: 'Axiforma Regular', fontSize: RFValue(13), textAlign: 'center', lineHeight: height * 0.03
      }

});
