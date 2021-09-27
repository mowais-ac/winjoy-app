import React, { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet } from "react-native";
import styles from "./Styles";

function RewardzButton({ btnStyle, textStyle, onPress, text,disable}) {
  return (
    <TouchableWithoutFeedback
    disabled={disable}
    onPress={onPress}>
      <View
        style={[
          {
            backgroundColor: "#FFFFFF",
            padding: '3%',
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 40,
            borderWidth:2,
            borderColor:'#ffffff'
          },
          btnStyle,
        ]}
      >
      
        <Text
          style={[styles.text, textStyle]}
        >
          {text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export { RewardzButton };

