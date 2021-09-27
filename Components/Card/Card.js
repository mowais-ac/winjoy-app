import React, { useState } from "react";
import { View, Image, Dimensions } from "react-native";
import styles from "./Styles";
import Label from "../Label";
import LinearGradient from "react-native-linear-gradient";
const { width, height } = Dimensions.get("window");
function Card({ options, onPress, reset, result, optionDisable }) {

  return (
    <View style={{
      width: width - 25,
      height: height * 0.21,
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
          width: 230,
          height: 120,
        }}
        resizeMode="cover"
        source={require('../../assets/imgs/jeep.png')}
      />
      
    </View>
  );
}

export { Card };
