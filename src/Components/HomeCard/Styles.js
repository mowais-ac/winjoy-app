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
    borderRadius: widthConverter(10),
    height: height * 0.15,
    width: '100%',
    flexDirection: 'row',

    //   paddingRight: widthConverter(20),
  },
  textView: {
    //  alignItems: 'center',

    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  commingSoonTxt: {
    fontFamily: 'Axiforma-SemiBold',
    fontSize: 18,
    color: '#fff',
    lineHeight: heightConverter(20),

    textAlign: 'left',
  },

  circularView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    elevation: 4,
    position: 'absolute',
    bottom: heightConverter(55),
    right: 10,
    bottom: 36,
  },
  imageView: {
    justifyContent: 'center',
  },
  Margin: {
    height: height * 0.06,
    width: width * 0.4,
    backgroundColor: '#ffffff',
  },
});
