import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Colors } from "../Constants/Index";

const { width, height } = Dimensions.get("window");

const Label = (props) => {
  const {
    style,
    underline,
    notAlign,
    children,
    text,
    dark,
    bold,
    bold2,
    light,
    medium,
    primary,
    muted,
    darkmuted,
    font,
  } = props;

  const styles = StyleSheet.create({
    text: {
      color: Colors.LABEL,
      width: width * 0.9,
      fontFamily: "Axiforma-Regular",
      fontSize: GetFontSize(props.headingtype),
    },
    light: {
      fontFamily: "Axiforma-Light",
    },
    underline: { textDecorationLine: "underline" },
    centered: { textAlign: "center", alignSelf: "center" },
    bold: {
      fontFamily: "Axiforma-SemiBold",
    },
    bold2: { fontFamily: "Axiforma-Bold" },
    dark: { color: Colors.DARK_LABEL },
    primary: {
      color: Colors.REDESH,
    },
    medium: {
      fontFamily: "Axiforma-Medium",
    },
    ChangeFont: {
      fontSize: RFValue(parseInt(font)),
    },
    muted: {
      color: Colors.MUTED,
    },
    darkmuted: {
      color: Colors.DARK_MUTED,
    },
  });

  const TextStyle = [
    styles.text,
    !notAlign && styles.centered,
    underline && styles.underline,
    dark && styles.dark,
    bold && styles.bold,
    bold2 && styles.bold2,
    light && styles.light,
    primary && styles.primary,
    font && styles.ChangeFont,
    medium && styles.medium,
    muted && styles.muted,
    darkmuted && styles.darkmuted,
    style,
  ];
  return (
    <>
      <Text style={TextStyle}>
        {text}
        {children}
      </Text>
    </>
  );
};

const GetFontSize = (e) => {
  switch (e) {
    case "h1":
      return RFValue(22);
    case "h2":
      return RFValue(20);
    case "h3":
      return RFValue(18);
    case "h4":
      return RFValue(16);
    case "h5":
      return RFValue(14);
    default:
      return RFValue(12);
  }
};

export default Label;
