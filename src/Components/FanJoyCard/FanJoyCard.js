import React, { useState } from "react";
import { View, Image, Dimensions, TouchableOpacity, Text } from "react-native";
import styles from "./Styles";
import Label from "../Label";
import LinearGradient from "react-native-linear-gradient";
import { heightConverter, widthPercentageToDP } from "../Helpers/Responsive";
import LoaderImage from "../LoaderImage";
import Config from "react-native-config";
import ProgressCircle from 'react-native-progress-circle'
const { width, height } = Dimensions.get("window");
function FanJoyCard({ style, onPress, name, fans, imageUrl }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ width: 180 }, style]}
    >
      <View>
        <Image
          style={[styles.bgImage,style]}
          source={{
            uri: imageUrl,
          }}
        />
        <LinearGradient
          colors={["rgba(0,0,128,0)","rgba(0,0,128,0)", "rgba(0,0,128,0.9)"]}
          style={[styles.bgView,style]}
        >
          <Text style={{color:'#ffffff',fontFamily:'Axiforma SemiBold'}}>{name}</Text>
          <Text style={{color:'#ffffff',fontFamily:'Axiforma Regular'}}>{fans} Fans</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

export { FanJoyCard };
