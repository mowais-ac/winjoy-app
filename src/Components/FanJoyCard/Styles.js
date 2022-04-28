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
    width: '100%',
    height: 200,
    borderRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  bgImage: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 15,
    position: 'absolute',
    borderWidth: 2,
    backgroundColor: '#d7dbf7',
  },
  text: {
    color: '#fff',
  },
});
