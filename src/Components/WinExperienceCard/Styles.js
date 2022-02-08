import { Dimensions } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get("window");
const { StyleSheet } = require('react-native');

export default StyleSheet.create({
  bgView: {
    width: 170,
    height: 200,
    borderRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom:10
  },
  bgImage: {
    width: 170,
    height: 200,
    borderRadius: 15,
    position: 'absolute'
  },
  text: {
    color: '#fff',
  },
  textHeading:{
    fontFamily: 'Axiforma-Bold', color: '#eb3d6e',
    fontSize:RFValue(13),
    marginLeft:20
  }
});
