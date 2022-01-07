import {Dimensions } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../Helpers/Responsive';
import { RFValue } from 'react-native-responsive-fontsize'; 
const { width, height } = Dimensions.get("window");
const { StyleSheet } = require('react-native');

export default StyleSheet.create({
  mainView: {
    borderWidth:2,
    borderColor:'#fff',
    width:'95%',
    borderRadius:30,
    flexDirection:'row',
    height:height*0.07,
    justifyContent:'space-evenly',
    alignItems:'center',

  },

  text: {
    color:'#ffffff',
    fontFamily:'Axiforma SemiBold',
    borderWidth:3,
    width:width*0.3,
    textAlign:'center',
    fontSize:RFValue(13)
  }
});
