import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../Helpers/Responsive';
import { RFValue } from 'react-native-responsive-fontsize';

const { StyleSheet } = require('react-native');

export default StyleSheet.create({
  mainView:{
    alignItems:'center',
    width:widthPercentageToDP("100%"),
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:15,
    paddingRight:15,
  },
  avatarView: {
    //position: 'absolute',
 
    width: widthConverter(70),
    height:widthConverter(70),
    borderRadius: heightConverter(70),
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ffffff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
  text:{
    fontFamily: "Axiforma-Regular",
    color:'#ffffff'
  },
  text2:{
    fontFamily: "Axiforma-Regular",
    color: "#FFFF00"
  }
});
