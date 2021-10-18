import React, { useState } from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import styles from "./Styles";
import Label from "../Label";
import LinearGradient from "react-native-linear-gradient";
import { widthConverter, widthPercentageToDP } from "../Helpers/Responsive";
import LoaderImage from "../LoaderImage";
import Config from "react-native-config";
import LongButton from "../LongButton";
const { width, height } = Dimensions.get("window");
function WalletLastPlayedCard({ options, onPress, reset, result, optionDisable, data }) {

  return (
    // <TouchableOpacity
    //   style={{
    //     width: width - 25,
    //     height: height * 0.28,
    //     backgroundColor: "#ffffff",
    //     marginLeft: 10,
    //     borderRadius: 10,
    //     padding: 10,
    //     top: 15,
    //     left: 2,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     elevation: 3,
    //     marginBottom: 15,
    //   }}
    //   onPress={onPress}
    // >
    <TouchableOpacity
      style={{
        width: width - 25,
        height: height * 0.19,
        backgroundColor: "#ffffff",
        marginLeft: 10,
        borderRadius: 10,
        padding: 10,
        top: height * 0.06,
        left: 2,
        justifyContent: "center",
        alignItems: "center", 
        elevation: 3,
        marginBottom: 15,
      }}
      onPress={onPress}
    >

      <View style={{ marginLeft: 30 }}>
        <Label notAlign primary font={16} bold style={{ color: "#E7003F",  }}>
          Last Played Game
        </Label>

        <Label notAlign primary font={14} dark style={{ color: "#000000",marginTop:20,fontFamily: "Axiforma-SemiBold", }}>
          Answer 12 simple questions and WIN amazing prizes
        </Label>
        <Label notAlign primary font={14} bold style={{ color: "#E7003F", marginTop:7}}>
         Won Prize:
         <Label notAlign primary font={14} dark style={{ color: "#000000" }}>
         {" "}AED 670
        </Label>
        </Label>
      </View>
     

    </TouchableOpacity>
  );
}

export { WalletLastPlayedCard };
