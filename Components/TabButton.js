import React from "react";
import { Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { Images } from "../Constants/Index";

const TabButton = (props) => {
  const GetImage = (name) => {
    switch (name) {
      case "Home":
        return Images.Home;
      case "Product":
        return Images.Product;
      case "WishList":
        return Images.WishList;
      case "Profile":
        return Images.Profile;
    }
  };
  return (
    <Image
      source={GetImage(props.name)}
      style={{
        width: width * 0.06,
        height: height * 0.04,
        resizeMode: "contain",
      }}
    />
  );
};

export default TabButton;
