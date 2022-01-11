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
function TrendingCards({ style, onPress, name, result, optionDisable, data }) {
  console.log("name", name);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ width: 170 }, style]}
    >
      <View style={{ height: height * 0.31,}}>
        <Image
          style={[styles.bgImage, style]}
          source={{
            uri: 'https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg',
          }}
        />
        <View
          style={{ position: 'absolute',width:'100%', bottom: 0 }}
        >
          <Text style={{ color: '#ffffff', fontFamily: 'Axiforma SemiBold', textAlign: 'center' }}>AED 240</Text>
          <Text style={{ color: '#ffffff', fontFamily: 'Axiforma Regular', textAlign: 'center' }}>Hey Y'all Cream Phone Case</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export { TrendingCards };
