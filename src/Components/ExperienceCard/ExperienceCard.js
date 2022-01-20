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
function ExperienceCard({ style, onPress, title, short_desc, data }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ width: 200 }, style]}
    >
      <View>
        <Image
          style={[styles.bgImage,style]}
          source={{
            uri: 'https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg',
          }}
        />
        <LinearGradient
          colors={["rgba(0,0,128,0)","rgba(0,0,128,0)", "rgba(0,0,128,0.9)"]}
          style={[styles.bgView,style]}
        >
          <Text style={{color:'#ffffff',fontFamily:'Axiforma SemiBold'}}>{title}</Text>
          <Text style={{color:'#ffffff',fontFamily:'Axiforma Regular',textAlign:'center',width:'98%'}}>{short_desc}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

export { ExperienceCard };
