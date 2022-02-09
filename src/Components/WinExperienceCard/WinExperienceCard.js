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
function WinExperienceCard({ imageStyle, style, onPress, short_desc,thumbnail }) {
  return (
    <View
      // onPress={onPress}
      style={style}
    >
      <View style={{ height: height * 0.31, }}>
        <LoaderImage
          source={{
            // uri: ImgUrl.replace("http://", "https://"),
            uri: thumbnail,
          }}
          style={imageStyle}
          resizeMode="cover"
        />
        <View
          style={{ width: '90%', alignItems: 'center', marginTop: height * 0.015 }}
        >
          <Text style={{ color: '#000000', fontFamily: 'Axiforma-SemiBold', textAlign: 'left', fontSize: RFValue(12), width: width*0.5, }}>
            {short_desc}
          </Text>
        </View>
        <TouchableOpacity onPress={onPress}>
          <LinearGradient
            style={{ 
              backgroundColor: 'yellow', width: width * 0.4,height:height*0.05 ,marginTop: height * 0.01,marginLeft:width*0.02,
              justifyContent:'center',alignItems:'center',borderRadius:height*0.05
             }}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={["#f8d7e8", "#c7dfe8"]}
          >

            <Text style={[styles.textHeading, { textAlign: 'center', marginLeft: 3 }]}>Find Products</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export { WinExperienceCard };
