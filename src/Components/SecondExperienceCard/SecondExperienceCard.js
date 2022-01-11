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
function SecondExperienceCard({ style, onPress, heading, result, optionDisable, data }) {
  console.log("heading", heading);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ width: 200 }, style]}
    >
      <View>
        <Image
          style={styles.bgImage}
          source={{
            uri: 'https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg',
          }}
        />
      </View>
      <Text style={{ color: '#000000', fontFamily: 'Axiforma SemiBold',width:'85%',textAlign:'center' }}>Ask a Question</Text>
      <Text style={{ color: 'blue', fontFamily: 'Axiforma Regular', textAlign: 'center',width:'85%', }}>AED 240</Text>
    </TouchableOpacity>
  );
}

export { SecondExperienceCard };
