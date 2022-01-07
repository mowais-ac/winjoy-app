import React, { useState } from "react";
import { View, Image, Dimensions, TouchableOpacity, Text } from "react-native";
import styles from "./Styles";
import { heightConverter, widthPercentageToDP } from "../Helpers/Responsive";
const { width, height } = Dimensions.get("window");
function TopTab({style, name, result, optionDisable, data }) {

  return (
      <View style={[styles.mainView,style]}>
          <Text style={styles.text}>TRIVIA JOY</Text>
          <Text style={styles.text}>DEALS JOY</Text>
          <Text style={styles.text}>FAN JOY</Text>
      </View>
  );
}

export { TopTab };
