import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  LinerGradientProgrees: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    borderRadius: 9,
    height: 13,
  },
  GreybarWidth: {
    width: widthPercentageToDP('80'),
    height: 13,
    zIndex: -1,
    position: 'absolute',
    backgroundColor: '#EADFE3',
    borderRadius: 9,
  },
  containerprogressBar: {
    width: widthPercentageToDP('80'),
    marginBottom: 2,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 3,
    marginLeft: 2,
  },
  Margin: {
    height: height * 0.065,
    width: width * 0.65,
    backgroundColor: '#fcd9e2',
    borderRadius: 10,
  },
});
