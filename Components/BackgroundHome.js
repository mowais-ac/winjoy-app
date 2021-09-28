import React from "react";
import { Image, StyleSheet, Dimensions, StatusBar,View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { Images } from "../Constants/Index";

const { width, height } = Dimensions.get("window");

const Background = (props) => {
  const val = props.height || 0.5;
  const extra =
    Platform.OS === "android"
      ? StatusBar.currentHeight + Dimensions.get("window").height * 0.005
      : 0;

  const styles = StyleSheet.create({
    image: {
      height: height-100,
      width: width,
      position: "absolute",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      overflow: 'hidden',
      backgroundColor:'#420E92'
    },
    design: {
      position: "absolute",
      width: width * 0.7,
      height: height * 0.23,
      borderWidth: 5,
      alignSelf: "baseline",
    },
  });

  const GetImage = () => {
    if (props.green) return Images.BackgroundGreen;
    if (props.yellow) return Images.BackgroundYellow;
    return Images.Background;
  };

  const ImgStyle = [styles.image, props.style];

  return (
    <>
     <View
         
          style={ImgStyle}
        />
    </>
  );
};

export default Background;
