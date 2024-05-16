import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  mainView: {
    alignItems: 'center',
    width: width,
    justifyContent: 'space-around',
    marginTop: 10,
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 15,
  },
  avatarView: {
    //position: 'absolute',

    width: widthConverter(50),
    height: widthConverter(50),
    borderRadius: heightConverter(50),
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffffff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
  text: {
    fontFamily: 'Axiforma-Regular',
    color: '#ffffff',
    lineHeight: 20,
  },
  text2: {
    fontFamily: 'Axiforma-Regular',
    color: '#FFFF00',
  },
});
