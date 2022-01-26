import React from "react";
import { View, Dimensions } from "react-native";
import Config from "react-native-config";
import LoaderImage from "../LoaderImage";
const { width, height } = Dimensions.get("window");
function Card({ options, onPress, reset, result, optionDisable,imageUrl }) {
 
  return (
    <View
      style={{
        width: width - 25,
        height: height * 0.21,
        backgroundColor: "#ffffff",
        marginLeft: 10,
        borderRadius: 10,
        padding: 10,
        top: 15,
        left: 2,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        marginBottom: 15,
      }}
    >
      <LoaderImage
        source={{
          uri: imageUrl,
        }}
        style={{
          width: 230,
          height: 120,
        }}
        resizeMode="contain"
      />
    </View>
  );
}

export { Card };
