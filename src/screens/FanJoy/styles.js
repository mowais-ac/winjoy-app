import { RFValue } from 'react-native-responsive-fontsize';
const {StyleSheet} = require('react-native');

export default StyleSheet.create({
    safeStyle: {
        flex: 1,
        // backgroundColor:colors.background,
      },  
      headerText:{
          color:'#D9FE51',
          fontFamily:'Axiforma SemiBold',
          fontSize:RFValue(22)
      },
      subHeaderText:{
          color:'#FFFFFF',
          fontFamily:'Gotham Bold'
      },
      playBtn:{
          width:60,
          height:60,
          marginTop:15
      }
});
