import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../../Components/Helpers/Responsive';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
const { StyleSheet } = require('react-native');

export default StyleSheet.create({
  image: {
    width: width,
    height: height * 0.3,
  },
  yellowBtn: {
    marginTop: 10,
    width: widthPercentageToDP("100%"),
    height: heightConverter(65),
   // justifyContent: 'center',
   paddingLeft:8,
    alignItems:'center',
    flexDirection: 'row',

  },
  avatarView: {
    //position: 'absolute',

    width: widthConverter(62),
    height: widthConverter(62),
    borderRadius: widthConverter(62),
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
  btnTextView: {
    width:width*0.7,
    marginLeft:widthConverter(20),
  },
  text: {
    fontFamily: 'Axiforma-Bold',
    color: '#fff',
    fontSize: RFValue(20)
  },
  ShoppingBanner: {
    width: "100%",
    height: height * 0.3,
   // marginTop: height * 0.015,
    alignSelf: "center",
  },
  bgImageUpperView: {
    width: width * 1.01,
    height: height * 0.3,
    backgroundColor: "rgba(231,0,63,0.15)",
    justifyContent: "flex-end",
    paddingLeft: 16,
    paddingBottom: 10,
  },
  LinerGradientProgrees: {
    width: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    height: 9,
  },
  GreybarWidth: {
    width: widthConverter(120),
    height: 9,
    zIndex: -1,
    position: "absolute",
    backgroundColor: "#EADFE3",
    borderRadius: 9,
  },
  containerprogressBar: {
    width: widthConverter(120),
    marginBottom: 2,
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    height: 3,
    marginLeft: 2,
  },
  mainView: {
    height: heightPercentageToDP("42"),
    width: width,

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: "hidden",
  },
});
