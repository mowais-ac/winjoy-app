import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter
} from '../Helpers/Responsive';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Dimensions,
  StyleSheet
} from "react-native";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  mainView: {
    alignItems: 'center',
    backgroundColor: '#f05b31',
    borderRadius: widthConverter(20),
    height: heightPercentageToDP("22%"),
    width: widthPercentageToDP("90%"),
    flexDirection: 'row',
    justifyContent: 'flex-end',

 //   paddingRight: widthConverter(20),
  },
  textView: {
    alignItems: 'center',
    marginLeft:15,
    marginRight:15,
  },
  commingSoonTxt: {
    fontFamily: "Axiforma-SemiBold",
    fontSize: 26,
    color: "#fff",
    lineHeight: heightConverter(30),
    width: widthPercentageToDP("40%"),
    textAlign:'left',
 



  },

  circularView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    elevation: 4,
    position: 'absolute',
    bottom: heightConverter(55),
    right: 10,
    bottom: 36
  },
  imageView: {
    justifyContent: 'center'
  },
  Margin: {
    height: height * 0.06,
    width: width * 0.4,
    backgroundColor: "#ffffff",
  },
});
