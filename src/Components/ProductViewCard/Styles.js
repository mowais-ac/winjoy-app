import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../Helpers/Responsive';
import { RFValue } from 'react-native-responsive-fontsize';
import Background from '../Background';

const { StyleSheet } = require('react-native');

export default StyleSheet.create({
  mainView:{
    alignItems:'center',
    width:widthConverter(120),
    marginTop:20,
  },
  avatarView: {
    //position: 'absolute',
 
    width: widthConverter(90),
    height: widthConverter(90),
    borderRadius: heightConverter(90),
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ffffff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
});
