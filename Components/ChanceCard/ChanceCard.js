import React, { useState } from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import styles from "./Styles";
import Label from "../Label";
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP } from "../Helpers/Responsive";
const { width, height } = Dimensions.get("window");
function ChanceCard({ options, onPress, reset, result, optionDisable,data }) {
let progress=(data.item.updated_stocks? (data.item?.updated_stocks/data.item.stock)*100:0);
  return (
    <TouchableOpacity style={{
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
    }}
    onPress={onPress}>

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
        {data.item.luckydraw.gift_title}
      </Label>
      <View style={styles.containerprogressBar}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#E7003F", "#420E92"]}
          style={[
            styles.LinerGradientProgrees,
            { width: `${progress}%`},
          ]}
        />
        <View style={styles.GreybarWidth} />
      </View>
      <Label primary font={11} dark style={{ color: "#000000", top: 9 }}>
        {data.item.updated_stocks} sold out of {data.item.stock}
      </Label>
    </TouchableOpacity>
  );
}

export { ChanceCard };
