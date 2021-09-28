import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../Helpers/Responsive';
import { RFValue } from 'react-native-responsive-fontsize';

const { StyleSheet, Dimensions } = require('react-native');
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  optionsViewMain: {
    position: 'absolute',
    top:heightPercentageToDP("60"),
    left:widthPercentageToDP("7%")


  },
  optionView: {
    width: widthPercentageToDP("85%"),
    height: heightPercentageToDP("7%"),
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderWidth:2,
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 25, marginTop: 15
  },
  optionsText: {
    fontSize: RFValue(15), color: "#0032B5",
    lineHeight: heightConverter(30),
    textAlign: 'left',
    fontFamily: "Axiforma-Regular",
  }, 
  Margin: {
    marginTop: height * 0.85,
    width: width * 0.85,
    backgroundColor: '#2B1751',

},
});
