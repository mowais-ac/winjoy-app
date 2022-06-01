import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  text: {
    marginTop: 3,
    color: '#fff',
    fontFamily: 'Axiforma-Bold',
    fontSize: RFValue(15),
  },
});
