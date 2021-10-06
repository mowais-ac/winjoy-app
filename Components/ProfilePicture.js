import React from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";

import Config from "react-native-config";
import { Colors } from "../Constants/Index";
import Label from "./Label";
const { width, height } = Dimensions.get("window");
const ProfilePicture = (props) => {
  const { id, name, picture, style,font } = props;
  return picture && picture !== null ? (
    <ImageBackground
      source={{ uri: `${Config.Profile_URL}/${picture}` }}
      style={[styles.ProfileView, styles.ProfilePicture, style]}
    />
  ) : (
    <View style={[styles.ProfileView, styles.ProfileBG, style]}>
      <Label adjustsFontSizeToFit={true} font={font || 18} bold>
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
    backgroundColor: Colors.PROFILE_BG,
  },
  ProfilePicture: {
    resizeMode: "contain",
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: 50,
  },
});
export default ProfilePicture;
