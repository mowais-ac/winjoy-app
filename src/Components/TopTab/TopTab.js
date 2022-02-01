import React, { useState } from "react";
import { View, Image, Dimensions, TouchableWithoutFeedback, Text } from "react-native";
import styles from "./Styles";
import { heightConverter, widthPercentageToDP } from "../Helpers/Responsive";
const { width, height } = Dimensions.get("window");
function TopTab({ style, onPressFirst, onPressSecond, selected, firstText, secondText}) {

  return (
    <View style={[styles.mainView, style]}>
      <TouchableWithoutFeedback
      onPress={onPressFirst}
      >
      <View style={[styles.textView,{backgroundColor:selected===0?'#ffffff':null}]}>
        <Text style={[styles.text,{color:selected===0?'#000000':'#ffffff'}]}>{firstText}</Text>
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={onPressSecond}
      >
      <View style={[styles.textView,{backgroundColor:selected===1?'#ffffff':null}]}>
      <Text style={[styles.text,{color:selected===1?'#000000':'#ffffff'}]}>{secondText}</Text>
      </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export { TopTab };
