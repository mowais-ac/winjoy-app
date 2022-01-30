import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import Label from "./Label";
import ProfilePicture from "./ProfilePicture";
import { Colors, Images } from "../Constants/Index";
import { useNavigation } from "@react-navigation/native";
import SmallPopup from "./SmallPopup";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";

const { width, height } = Dimensions.get("window");

const UserInfo = (props) => {
  const { pencil, popup, p_text, p_type } = props;
  const navigation = useNavigation();

  const [Data, setData] = useState(null);

  useEffect(() => {
    const check = async () => {
      if (Data === null && props.OwnUser) {
        var User = JSON.parse(await EncryptedStorage.getItem("User"));
        if (JSON.stringify(Data) !== JSON.stringify(User)) {
          setData(User);
        }
      }
    };
    check();
  });
  return (
    <View style={props.style}>
      {Data === null && props.OwnUser ? (
        <ActivityIndicator size="large" color={Colors.WHITE} />
      ) : (
        <>
          <View style={styles.ProfilePictureContainer}>
            <ProfilePicture
              picture={Data?.profile_image}
              id={Data?.id}
              name={Data?.first_name?.slice(0, 1) + Data?.last_name?.slice(0, 1)}
            />
          </View>
          <View style={styles.ProfileInfo}>
            <Label headingtype="h3" notAlign bold2>
              {props.OwnUser
                ? `${Data.first_name} ${Data.last_name}`
                : props.name}
            </Label>
            <Label notAlign>
              @{props.OwnUser ? Data.user_name : props.user}
            </Label>
          </View>
          {pencil && (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("MenuStack", { screen: "EditProfile" })
              }
            >
              <Image source={Images.Pencil} style={styles.Arrow} />
            </TouchableWithoutFeedback>
          )}
          {popup && <SmallPopup style={styles.ACTIVE} status={props.status} />}
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  ProfilePictureContainer: {
    borderWidth: 3,
    borderRadius: 50,
    borderColor: Colors.IMAGE_BORDER,
  },
  ProfileInfo: {
    marginLeft: width * 0.015,
    justifyContent: "center",
  },
  Arrow: {
    position: "absolute",
    marginTop: height * 0.02,
    marginLeft: width * 0.82,
    height: height * 0.06,
    width: width * 0.06,
    resizeMode: "contain",
  },
  ACTIVE: {
    position: "absolute",
    marginTop: height * 0.035,
    width: width * 0.2,
    marginLeft: width * 0.73,
  },
});

export default UserInfo;
