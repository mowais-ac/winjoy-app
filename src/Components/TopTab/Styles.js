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
    borderWidth:1,
    borderColor:'#fff',
    width:width*0.95,
    height:height*0.063,
    borderRadius:height*0.068,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',

  },
  textView:{
    width:width*0.475,
    height:height*0.063,
    borderRadius:height*0.068,
    justifyContent:'center'
  },
  text: {
    color:'#ffffff',
    fontFamily:'Axiforma-SemiBold',
    textAlign:'center',
    fontSize:RFValue(13)
  },
  
});
