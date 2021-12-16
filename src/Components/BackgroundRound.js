import React from "react";
import { StyleSheet, Dimensions, StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";
const { width, height } = Dimensions.get("window");

const BackgroundRound = (props) => {
  const val = props.height || 0.5;
  const extra = 
    Platform.OS === "android"
      ? StatusBar.currentHeight + Dimensions.get("window").height * 0.005
      : 0;

  const styles = StyleSheet.create({
    image: {
      height: height * val + extra,
      width: width,
      position: "absolute",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      overflow: 'hidden',
     
    },
    design: {
      position: "absolute",
      width: width * 0.7,
      height: height * 0.23,
      borderWidth: 5,
      alignSelf: "baseline",
    },
  });


  const ImgStyle = [styles.image, props.style];

  return (
    <>
      <LinearGradient
      colors={["#420E92", "#E7003F"]}
      style={ImgStyle}
    >
     </LinearGradient>
      {/* {props.design && <Image source={Images.Design} style={styles.design} />} */}
    </>
  );
};

export default BackgroundRound;
