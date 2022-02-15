import React, { useState,useRef } from "react";
import { View, Image, Dimensions, TouchableOpacity, Text, TextInput } from "react-native";
import styles from "./Styles";
import Label from "../Label";
import LinearGradient from "react-native-linear-gradient";
import { heightConverter, widthPercentageToDP } from "../Helpers/Responsive";
import LoaderImage from "../LoaderImage";
import Config from "react-native-config";
import ProgressCircle from 'react-native-progress-circle';
import { RFValue } from "react-native-responsive-fontsize";
import CountryModal from "../CountryModal";
const { width, height } = Dimensions.get("window");
let combineValidation = false
function RefferalTextInputForScreen({ srNumber, onChangeName, onChangeNumber, validationBorderName, validationBorderNumber,CountryCode,code }) {
  const countryref = useRef();
  return (
    <View style={{
      width: width * 0.92,
      height: height * 0.14,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',




    }}>
      <View style={{ width: width * 0.86, }}>
        <TextInput
          style={{
            height: height * 0.06,
            width: width * 0.92,
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
        <View 
        style={{
          flexDirection:'row',
          height: height * 0.06,
          width: width * 0.92,
          paddingLeft: 20,
          alignItems:'center',
          
          borderWidth: 1, borderColor: validationBorderNumber ? 'red' : '#F2EFF5', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopWidth: 0.5, backgroundColor: '#ffffff'
      }}>
        <TouchableOpacity
            onPress={() => countryref.current(true)}
            style={[styles.IconView, { zIndex: 2 }]}
          >
            <Text style={{color:"#000000",}}>+{code}</Text>
          </TouchableOpacity>
          <TextInput
            style={{
              width:width * 0.6,marginLeft:10,
              color: '#000000', fontFamily: 'Axiforma-Regular',
            }}
            maxLength={11}
            onChangeText={onChangeNumber}
            // value={number}
            placeholder="Phone Number"
            placeholderTextColor={"#0B2142"}
            keyboardType="phone-pad"
          />
        </View>
        <CountryModal
          onChange={CountryCode}
          CountryRef={countryref}
          phone
        />
      </View>
    </View>
  );
}

export { RefferalTextInputForScreen };
