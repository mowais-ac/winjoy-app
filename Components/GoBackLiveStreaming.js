import React from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from "react-native";
import LongButton from "./LongButton";
import { useNavigation } from "@react-navigation/native";
import BackIcon from 'react-native-vector-icons/Ionicons';
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../Constants/Index";
const { width, height } = Dimensions.get("window");

const GoBack = (props) => {
  const navigation = useNavigation();
  return (
    // <LongButton
    //   text="Go back"
    //   shadowless
    //   font={12}
    //   MutedBtn
    //   onPress={() => navigation.goBack()}
    //   {...props}
    //   style={[styles.Main, props.style]}
    // />
    <TouchableOpacity
    onPress={() => navigation.goBack()}
    >
    <View style={styles.container}>
      <BackIcon name="ios-chevron-back" size={25} color="#FFFFFF" style={{ top: height * 0.001 }} />
      <Text style={styles.text}>Back</Text>
    </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontFamily: "Axiforma-Regular",
    fontSize: RFValue(16),
    color: Colors.LABEL,
  }
});

export default GoBack;
