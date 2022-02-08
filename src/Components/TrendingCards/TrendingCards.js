import React, { useState } from "react";
import { View, Image, Dimensions, TouchableOpacity, Text } from "react-native";
import styles from "./Styles";
import Label from "../Label";
import LinearGradient from "react-native-linear-gradient";
import { heightConverter, widthPercentageToDP } from "../Helpers/Responsive";
import LoaderImage from "../LoaderImage";
import Config from "react-native-config";
import ProgressCircle from 'react-native-progress-circle'
import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get("window");
function TrendingCards({ imageStyle, style, onPress, title, price,imageUrl,mainViewStyle }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
    >
      <View style={[{ height: height * 0.31},mainViewStyle]}>
        <LoaderImage
          source={{
            // uri: ImgUrl.replace("http://", "https://"),
            uri: imageUrl,
          }}
          style={imageStyle}
          resizeMode="stretch"
        />
        <View
          style={{ width: '100%', marginTop: height * 0.01 }}
        >
          <Text style={{ color: '#eb3d6e', fontFamily: 'Axiforma-SemiBold', textAlign: 'center', fontSize: RFValue(12), }}>AED {price}</Text>
          <Text style={{ color: '#000000', fontFamily: 'Axiforma-Regular', textAlign: 'center', fontSize: RFValue(12), marginTop: 4 }}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export { TrendingCards };
