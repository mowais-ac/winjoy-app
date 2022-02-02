import React from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import Config from "react-native-config";
import { Avatar, Badge } from "react-native-elements";
import { Colors } from "../Constants/Index";
import Label from "./Label";
const { width, height } = Dimensions.get("window");
const AvatarBtn = (props) => {
  const { id, name, picture, style, font,size } = props;
  return picture && picture !== null ? (
    <Avatar
      rounded
      size={size}
      
      // title="MD"
      source={{
        uri:
          picture
      }}
    />
  ) : (
    <View style={[styles.ProfileView, styles.ProfileBG, styles.ProfilePicture]}>
      <Label adjustsFontSizeToFit={true} font={font || 18} bold style={styles.Text}>
        {name}
      </Label>
    </View>
  );
};

const styles = StyleSheet.create({
  ProfileView: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  ProfileBG: {
    backgroundColor: Colors.WHITE,
  },
  ProfilePicture: {
    resizeMode: "contain",
    width: width * 0.14,
    height: width * 0.145,
    borderRadius: 50,
   
  },
  Text: {
    color: Colors.REDESH
  }
});
export default AvatarBtn;
