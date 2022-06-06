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
  mainViewWrap: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 16,
  },

  mainView: {
    alignItems: 'center',
    borderRadius: 11,
    height: height * 0.1,
    width: '100%',
    backgroundColor: '#f05b31',
    flexDirection: 'row',
  },
  textView: {
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  commingSoonTxt: {
    fontFamily: 'Axiforma-SemiBold',
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 15,
    textAlign: 'left',
  },

  circularView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    elevation: 3,
    position: 'absolute',
    bottom: heightConverter(55),
    right: 10,
    bottom: 36,
  },
  imageView: {
    justifyContent: 'center',
  },
  Margin: {
    height: height * 0.04,
    width: width * 0.3,
    backgroundColor: '#ffffff',
  },
});
