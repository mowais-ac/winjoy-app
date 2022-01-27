import {
    StyleSheet,
    Dimensions,

} from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
    safeStyle: {
        flex: 1,
        // backgroundColor:colors.background,
    },
    headerText: {
        color: '#fff',
        fontFamily: 'Axiforma SemiBold',
        fontSize: RFValue(22)
    },
    subHeaderText: {
        color: '#FFFFFF',
        fontFamily: 'Axiforma Regular'
    },
    playBtn: {
        width: 60,
        height: 60,
        marginTop: 15
    },
    mainView: {
        height: height*0.18,
        width: '100%',
        position: 'absolute',
        borderBottomRightRadius:15,
    }

});
