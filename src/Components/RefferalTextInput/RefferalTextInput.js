import React, { useState } from "react";
import { View, Image, Dimensions, TouchableOpacity, Text, TextInput } from "react-native";
import styles from "./Styles";
import Label from "../Label";
import LinearGradient from "react-native-linear-gradient";
import { heightConverter, widthPercentageToDP } from "../Helpers/Responsive";
import LoaderImage from "../LoaderImage";
import Config from "react-native-config";
import ProgressCircle from 'react-native-progress-circle';
import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get("window");
function RefferalTextInput({ srNumber }) {
  return (
    <View style={{
      width: width * 0.92,
      height: height * 0.14,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      

    }}>
      <Text style={[styles.descriptionText, { fontSize: RFValue(19), color: '#D9D0E0' }]}>{srNumber}</Text>
      <View style={{ width: width * 0.86, height: height * 0.1, borderRadius: 10, borderWidth: 1, borderColor: '#F2EFF5' }}>
        <TextInput
          style={{
            height: 40,
            width: width * 0.4,
            paddingLeft: 20,
          }}
          //  onChangeText={onChangeNumber}
          // value={number}
          placeholder="Name"
          placeholderTextColor={"#0B2142"}
          keyboardType="numeric"
        />
        <View style={{ backgroundColor: '#F2EFF5', height: 1, width: width * 0.855 }} />
        <TextInput
          style={{
            height: 40,
            width: width * 0.4,
            paddingLeft: 20,
          }}
          //  onChangeText={onChangeNumber}
          // value={number}
          placeholder="Phone Number"
          placeholderTextColor={"#0B2142"}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
}

export { RefferalTextInput };
