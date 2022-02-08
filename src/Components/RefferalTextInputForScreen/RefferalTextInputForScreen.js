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
let combineValidation = false
function RefferalTextInputForScreen({ srNumber, onChangeName, onChangeNumber, validationBorderName, validationBorderNumber }) {

  return (
    <View style={{
      width: width * 0.92,
      height: height * 0.14,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',



    }}>
      <Text style={[styles.descriptionText, { fontSize: RFValue(19), color: '#D9D0E0' }]}>{srNumber}</Text>
      <View style={{ width: width * 0.86, }}>
        <TextInput
          style={{
            height: height * 0.06,
            width: width * 0.8,
            paddingLeft: 20,
            color: '#000000', fontFamily: 'Axiforma-Regular',
            borderWidth: 1, borderColor: validationBorderName ? 'red' : '#F2EFF5', borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomWidth: 0.5, backgroundColor: '#ffffff'
          }}
          onChangeText={onChangeName}

          // value={number}
          placeholder="Name"
          placeholderTextColor={"#0B2142"}
          keyboardType="default"
        />

        <TextInput
          style={{
            height: height * 0.06,
            width: width * 0.8,
            paddingLeft: 20,
            color: '#000000', fontFamily: 'Axiforma-Regular',
            borderWidth: 1, borderColor: validationBorderNumber ? 'red' : '#F2EFF5', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopWidth: 0.5, backgroundColor: '#ffffff'
          }}
          maxLength={11}
          onChangeText={onChangeNumber}
          // value={number}
          placeholder="Phone Number"
          placeholderTextColor={"#0B2142"}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
}

export { RefferalTextInputForScreen };
