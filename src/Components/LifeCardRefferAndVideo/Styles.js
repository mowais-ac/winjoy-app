import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../Helpers/Responsive';
import { RFValue } from 'react-native-responsive-fontsize';

const { StyleSheet } = require('react-native');

export default StyleSheet.create({
  text: {
    color: '#420E92', fontFamily: 'Axiforma SemiBold', fontSize: RFValue(15)
},
text2:{
  color: '#000000', fontFamily: 'Axiforma Regular', fontSize: RFValue(12)
}
});
