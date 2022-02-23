import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  bgView: {
    borderRadius: 15,
    paddingLeft: 10,
  },
  bgImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  text: {
    color: '#fff',
  },
});
