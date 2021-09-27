import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Colors } from "../Constants/Index";
const { width, height } = Dimensions.get("window");

const Section = (props) => {
  const SectionStyle = [
    styles.Main,
    !props.shadowless && styles.shadow,
    props.style,
  ];
  return <TouchableOpacity style={SectionStyle} onPress={props.onPress}>{props.children}</TouchableOpacity>;
};

const styles = StyleSheet.create({
  Main: {
    backgroundColor: Colors.WHITE,
    width: width * 0.95,
    alignSelf: "center",
    borderRadius: 10,
    height: height * 0.1,
  },
  shadow: {
    shadowColor: Colors.SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export default Section;
