import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../Helpers/Responsive';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  mainView: {
    alignItems: 'center',
    //width: '100%',
    //height: 200,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#ffffff',
    borderRadius: 9,
  },
  avatarView: {
    margin: 10,
    //position: 'absolute',
    width: widthConverter(60),
    height: widthConverter(60),
    borderRadius: heightConverter(70),
    //borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: "#ffffff",
    //elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
  text: {
    fontFamily: 'Axiforma-Regular',
    color: '#000000',
    fontSize: RFValue(12),

    width: 100,
  },
  text2: {
    fontFamily: 'Axiforma-SemiBold',
    color: '#000000',
    fontSize: RFValue(12),

    width: 100,
  },
});
