import {
  StyleSheet,
  Dimensions,
} from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { 
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
 } from "../Helpers/Responsive";
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  mainView:{
    alignItems:'center',
    width:width*0.9,
    height:height*0.1,
    marginTop:10,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:15,
    paddingRight:15,
    backgroundColor:'#ffffff',
    borderRadius:height*0.01
  },
  avatarView: {
    //position: 'absolute',
 
    width: widthConverter(60),
    height:widthConverter(60),
    borderRadius: heightConverter(70),
    //borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
   // borderColor: "#ffffff",
   // elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
  text:{
    fontFamily: "Axiforma Regular",
    color:'#000000',
    fontSize:RFValue(12)
  },
  text2:{
    fontFamily: "Axiforma SemiBold",
    color: "#000000",
    fontSize:RFValue(12)
  },

});
