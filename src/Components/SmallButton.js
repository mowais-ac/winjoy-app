import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Colors } from "../Constants/Index";

const { width, height } = Dimensions.get("window");

const SmallButton = (props) => {
  const { text, shadowless, textstyle } = props;

  const buttonStyles = [
    styles.Button,
    !shadowless && styles.shadow,
    props.style && props.style,
  ];
  const TextStyle = [styles.Text, textstyle];

  return (
    <TouchableOpacity {...props} style={buttonStyles}>
      <Text style={TextStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    width: width * 0.15,
    height: height * 0.067,
    backgroundColor: Colors.BUTTON_COLOR,
    borderRadius: 100,
    alignSelf: "center",
    justifyContent: "center",
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
  Text: {
    color: Colors.BUTTON_LABEL,
    fontSize: RFValue(14),
    fontFamily: "Axiforma-SemiBold",
    alignSelf: "center",
    width: width * 0.15,
    textAlign: "center",
  },
});

export default SmallButton;
