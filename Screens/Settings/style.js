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
  mainView: {
    flex: 1,
    alignItems: 'center'
  },
 
});
