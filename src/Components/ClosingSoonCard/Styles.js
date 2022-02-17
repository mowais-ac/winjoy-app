import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  LinerGradientProgrees: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    borderRadius: 9,
    height: 13,
  },
  containerprogressBarWrap: {
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  containerprogressBar: {
    width: '100%',
    marginBottom: 2,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    height: 6,
    position: 'relative',
    backgroundColor: '#EADFE3',
  },
  LinerGradientProgrees: {
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    height: '100%',
  },
});
