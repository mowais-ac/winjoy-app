import React from "react";
import { Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import { Images } from "../Constants/Index";
import Label from "./Label";

import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");

const Bell = (props) => {
  const navigation = useNavigation();
  const { Bell } = props;
  console.log("bell",Bell);
  return (
    <>
      <TouchableOpacity
        style={[styles.Main, props.style]}
        onPress={() =>
          navigation.navigate("SimpeStackScreen", { screen: "Cart" })
        }
      >
        <Image source={Images.Bell} style={styles.Bell} />
        {+Bell.count >= 1 && (
          <>
            <Image source={Images.BellPop} style={styles.Pop} />
            <Label notAlign bold style={styles.Label} font={10}>
              {Bell.count > 9 ? 9 : Bell.count}
            </Label>
          </>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  Main: { bottom: height * 0.005 },
  Bell: {
    width: width * 0.075,
    height: height * 0.05,
    resizeMode: "contain",
  },
  Pop: {
    position: "absolute",
    width: width * 0.052,
    height: height * 0.022,
    resizeMode: "contain",
    marginLeft: width * 0.035,
  },
  Label: {
    position: "absolute",
    marginLeft: width * 0.051,
    fontFamily: "Poppins",
  },
});
const mapStateToProps = (state) => {
  const { Bell } = state;
  return {
    Bell,
  };
};

export default connect(mapStateToProps, null)(Bell);
