import React from "react";
import { Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { Images } from "../Constants/Index";

const TabButton = (props) => {
  const GetImage = (name) => {
    switch (name) {
      case "Home":
        return Images.Home;
      case "Products":
        return Images.Product;
      case "Draws":
        return Images.Draws;
      case "Wallet":
        return Images.Wallet;
      case "Winners":
        return Images.Leaderboard;
    }
  };
  return (
    <Image
      source={GetImage(props.name)}
      style={[{
        width: width * 0.08,
        height: height * 0.042,
        resizeMode: "contain",
      },
        // props.name === "Trophy" ? {
        //   width: width * 0.5,
        //   height: height * 0.08,
        // } : null
      ]}
    />
  );
};

export default TabButton;
