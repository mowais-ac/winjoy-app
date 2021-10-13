import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import LongButton from "./LongButton";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const GoBack = (props) => {
  const navigation = useNavigation();
  return (
    <LongButton
      text="Go back"
      shadowless
      font={12}
      MutedBtn
      onPress={() => navigation.goBack()}
      {...props}
      style={[styles.Main, props.style]}
    />
  );
};
const styles = StyleSheet.create({
  Main: {
    width: width * 0.3,
    height: height * 0.06,
  },
});

export default GoBack;
