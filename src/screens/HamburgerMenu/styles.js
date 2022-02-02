import { RFValue } from 'react-native-responsive-fontsize';
const {StyleSheet} = require('react-native');
const { width, height } = Dimensions.get("window");
import {
    Dimensions,
 
  } from "react-native";
export default StyleSheet.create({
    safeStyle: { 
        flex: 1,
        // backgroundColor:colors.background,
      },  
      headerText:{
          color:'#D9FE51',
          fontFamily:'Axiforma SemiBold',
          fontSize:RFValue(22)
      },
      subHeaderText:{
          color:'#FFFFFF',
          fontFamily:'Axiforma Regular'
      },
      playBtn:{
          width:60,
          height:60,
          marginTop:15
      },
      textHeading:{
        fontFamily: 'Axiforma Bold', color: '#eb3d6e', width: width*1,
        fontSize:RFValue(13),
        marginLeft:20
      }
    
});
