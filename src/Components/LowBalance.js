import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { Images } from "../Constants/Index";

const { width, height } = Dimensions.get("window");
const LowBalance = (props) => {
  const { CoinType, style } = props;
  const GetCType = (e) => {
    switch (e) {
      case 1:
        return "Gold";
      case 2:
        return "Diamond";
      default:
        return "Silver";
    }
  };

  return (
    <View style={[styles.MainView, style]}>
      <Image style={[styles.Dimensions, styles.Img]} source={Images.Hand} />
      <Image source={Images[GetCType(CoinType)]} style={styles.Coin} />
    </View>
  );
};

const styles = StyleSheet.create({
  MainView: {
    alignSelf: "center",
  },
  Dimensions: {
    width: width * 0.55,
    height: height * 0.2,
  },
  Coin: {
    position: "absolute",
    width: width * 0.13,
    height: width * 0.13,
    resizeMode: "contain",
    marginLeft: width * 0.29,
    zIndex: 1,
  },
  Img: {
    resizeMode: "contain",
    zIndex: 2,
  },
});

export default LowBalance;
