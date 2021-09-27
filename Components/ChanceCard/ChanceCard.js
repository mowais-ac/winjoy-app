import React, { useState } from "react";
import { View, Image, Dimensions } from "react-native";
import styles from "./Styles";
import Label from "../Label";
import LinearGradient from "react-native-linear-gradient";
const { width, height } = Dimensions.get("window");
function ChanceCard({ options, onPress, reset, result, optionDisable }) {

  return (
    <View style={{
      width: width - 25,
      height: height * 0.28,
      backgroundColor: '#ffffff',
      marginLeft: 10,
      borderRadius: 10,
      padding: 10,
      top: 15,
      left: 2,
      justifyContent: 'center', alignItems: 'center',
      elevation: 3,
      marginBottom:15
    }}>

      <Image
        style={{
          width: 150,
          height: 100,
        }}
        resizeMode="cover"
        source={require('../../assets/imgs/jeep.png')}
      />
      <Label primary font={16} dark style={{ color: "#000000" }}>
        Get a chance to
        <Label notAlign primary font={16} bold style={{ color: "#E7003F" }}>
          {" "}WIN
        </Label>
      </Label>
      <Label primary font={16} dark style={{ color: "#000000", }}>
        test test
      </Label>
      <View style={styles.containerprogressBar}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#E7003F", "#420E92"]}
          style={[
            styles.LinerGradientProgrees,
            { width: "70%" },
          ]}
        />
        <View style={styles.GreybarWidth} />
      </View>
      <Label primary font={11} dark style={{ color: "#000000", top: 9 }}>
        1320 sold out of 2700
      </Label>
    </View>
  );
}

export { ChanceCard };
