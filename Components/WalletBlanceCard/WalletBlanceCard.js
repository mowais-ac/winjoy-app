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
function WalletBlanceCard({ options, onPress, reset, result, optionDisable, data }) {

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
    <View
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
    >
     
    <View style={{marginLeft:30}}>
    <Label notAlign primary font={16} bold style={{ color: "#E7003F",  }}>
        Your Wallet
      </Label>

      <Label notAlign primary font={20} dark style={{ color: "#000000" }}>
        AED 1,450
      </Label>
    </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
          width:widthConverter(350)
        }}
      >
        <LongButton
          style={styles.Margin}
          textstyle={{ color: "#eb2b5f" }}
          text={"TRANSFER"}
          font={16}
        />
        <LongButton
          style={[
            styles.Margin,
            { backgroundColor: "#e3dbef"},
          ]}
          textstyle={{ color: "#420e92" }}
          text="WITHDRAW"
          font={16}
     
        />
      </View>

    </View>
  );
}

export { WalletBlanceCard };
