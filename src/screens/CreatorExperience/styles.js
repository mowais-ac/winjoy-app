import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  safeStyle: {
    // flex: 1,
    // backgroundColor:colors.background,
  },
  headerText: {
    color: '#fff',
    fontFamily: 'Axiforma-SemiBold',
    fontSize: RFValue(22),
  },
  subHeaderText: {
    color: '#FFFFFF',
    fontFamily: 'Axiforma-Regular',
  },
  playBtn: {
    width: 60,
    height: 60,
    marginTop: 15,
  },
  mainView: {
    //position: 'absolute',
    height: height * 0.25,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
  },
  textHeading: {
    textAlign: 'center',
    fontFamily: 'Axiforma-Bold',
    color: '#eb3d6e',
    fontSize: RFValue(13),
    fontWeight: '400',
    marginLeft: 20,
  },
});
