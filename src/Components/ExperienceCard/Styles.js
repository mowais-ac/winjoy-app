import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../Helpers/Responsive';
import { RFValue } from 'react-native-responsive-fontsize';

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
  }
});
