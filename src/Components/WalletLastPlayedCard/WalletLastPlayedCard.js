import React, { useState } from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import styles from "./Styles";
import Label from "../Label";
import { useTranslation } from 'react-i18next';
import { FormatNumber } from "../../Constants/Functions";
const { width, height } = Dimensions.get("window");
function WalletLastPlayedCard({ noOfQuestions, onPress, wonPrize, result, optionDisable, data }) {
  const { t } = useTranslation();
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
        {t("last_played_game")}
        </Label>

        <Label notAlign primary font={14} dark style={{ color: "#000000",marginTop:20,fontFamily: "Axiforma-SemiBold",width:width*0.8, }}>
          Answer {noOfQuestions} simple questions and WIN amazing prizes
        </Label>
        <Label notAlign primary font={14} bold style={{ color: "#E7003F", marginTop:7}}>
        {t("won_prize")}
         <Label notAlign primary font={14} dark style={{ color: "#000000" }}>
         {" "}AED {FormatNumber(+(wonPrize)?.toLocaleString())}
        </Label>
        </Label>
      </View>
     

    </TouchableOpacity>
  );
}

export { WalletLastPlayedCard };
