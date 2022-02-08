import { RFValue } from 'react-native-responsive-fontsize';
const { StyleSheet } = require('react-native');
import {
    Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
    safeStyle: {
        flex: 1,
        // backgroundColor:colors.background,
    },
    headerText: {
        color: '#ffffff',
        fontFamily: 'Axiforma-SemiBold',
        fontSize: RFValue(22)
    },
    avatarView: {
        //position: 'absolute',

        width: width * 0.32,
        height: width * 0.32,
        borderRadius: width * 0.32,
        //borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
        // borderColor: "#ffffff",
        // elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
    },
    leftRightavatarView: {
        //position: 'absolute',

        width: width * 0.22,
        height: width * 0.22,
        borderRadius: width * 0.22,
        //borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
        // borderColor: "#ffffff",
        // elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
    },
    mainView:{
        alignItems:'center',
        width:width*0.9,
        height:height*0.1,
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:15,
        paddingRight:15,
     
    
      },
      text:{
        fontFamily: "Axiforma-Regular",
        color:'#000000',
        fontSize:RFValue(12)
      },
      text2:{
        fontFamily: "Axiforma-SemiBold",
        color: "#000000",
        fontSize:RFValue(12)
      },
    avatarViewSecondList: {
        //position: 'absolute',
     
        width: width * 0.16,
        height: width * 0.16,
        borderRadius: width * 0.22,
        //borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
       // borderColor: "#ffffff",
       // elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
      },
    subHeaderText: {
        color: '#FFFFFF',
        fontFamily: 'Axiforma-Regular'
    },
    heading2Text: {
        color: '#420E92', fontFamily: 'Axiforma-Bold', fontSize: RFValue(15)
    },

    secondView: {
        width: width * 0.93,
        height: height * 0.11,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },
    topListIcon: {
        width: 20,
        height: 20
    },
    topListIcon2: {
        width: 30,
        height: 30
    }

});
