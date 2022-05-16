import {RFValue} from 'react-native-responsive-fontsize';
const {StyleSheet} = require('react-native');
const {width, height} = Dimensions.get('window');
import {Dimensions} from 'react-native';
export default StyleSheet.create({
  safeStyle: {
    flex: 1,
    backgroundColor: '#420E92',
  },
  headerText: {
    color: '#D9FE51',
    fontFamily: 'Axiforma-SemiBold',
    fontSize: RFValue(22),
    lineHeight: 30,
  },
  subHeaderText: {
    color: '#FFFFFF',
    fontFamily: 'Axiforma-Regular',
    lineHeight: 20,
  },
  playBtn: {
    width: 60,
    height: 60,
    marginTop: 15,
  },
  textHeading: {
    textAlign: 'center',
    fontFamily: 'Axiforma-Bold',
    color: '#eb3d6e',
    fontSize: RFValue(13),
    fontWeight: '400',
    marginLeft: 20,
  },
  Margin: {
    height: height * 0.035,
    width: width * 0.35,
    backgroundColor: '#ffffff',
  },
});
