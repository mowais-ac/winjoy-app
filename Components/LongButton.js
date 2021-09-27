import React, { useState, useImperativeHandle } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Colors, Icons, Images } from "../Constants/Index";

const { width, height } = Dimensions.get("window");

const LongButton = React.forwardRef((props, ref) => {
  const {
    shadowless,
    text,
    black,
    textstyle,
    Icon,
    font,
    gradient,
    imgstyle,
    NoBold,
    childbefore,
    Activity,
    regular,
    light,
    white,
    MutedBtn,
  } = props;

  const [act, setact] = useState({ act: Activity, col: "PRIMARY_LABEL" });

  useImperativeHandle(ref, () => ({
    SetActivity(ibool, col = "PRIMARY_LABEL") {
      setact({ act: ibool, col: col });
    },
    GetActivity() {
      return act.act;
    },
  }));

  const styles = StyleSheet.create({
    Button: {
      width: width * 0.95,
      height: height * 0.07,
      backgroundColor: Colors.BUTTON_COLOR,
      alignSelf: "center",
      justifyContent: "center",
    },
    border: { borderRadius: 50 },
    shadow: {
      shadowColor: Colors.SHADOW,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    Text: {
      color: Colors.BUTTON_LABEL,
      fontSize: RFValue(font || 15),
      alignSelf: "center",
      fontFamily: NoBold ? "Axiforma-Regular" : "Axiforma-SemiBold",
    },
    Regular: {
      fontFamily: "Axiforma-Regular",
    },
    BlackText: {
      color: Colors.BLACK,
    },
    White: {
      color: Colors.WHITE,
    },
    IconStyle: {
      position: "absolute",
      marginLeft: width * 0.03,
      fontSize: RFValue(20),
    },
    Light: {
      backgroundColor: Colors.BUTTON_LIGHT,
    },
    MutedBtn: {
      borderWidth: 3,
      borderColor: Colors.MUTED,
      backgroundColor: Colors.INVISIBLE,
    },
    MutedBtnText: {
      color: Colors.DARK_LABEL,
    },
  });

  const buttonStyles = [
    styles.Button,
    styles.border,
    light && styles.Light,
    !shadowless && !MutedBtn && styles.shadow,
    MutedBtn && styles.MutedBtn,
    props.style,
  ];

  const TextStyle = [
    styles.Text,
    regular && styles.Regular,
    black && styles.BlackText,
    (white || gradient) && styles.White,
    MutedBtn && styles.MutedBtnText,
    textstyle,
  ];

  const GetData = () => {
    return (
      <>
        <Text style={styles.IconStyle}>
          {Icon == "google" && <Icons.Google />}
        </Text>
        {!act.act ? (
          <Text style={TextStyle}>{text}</Text>
        ) : (
          <ActivityIndicator size="large" color={Colors[act.col]} />
        )}
      </>
    );
  };

  return (
    <TouchableOpacity {...props} style={buttonStyles}>
      {childbefore && props.children}
      {gradient ? (
        <ImageBackground
          source={Images.Background}
          style={[styles.Button, styles.border, imgstyle]}
          imageStyle={styles.border}
        >
          {GetData()}
        </ImageBackground>
      ) : (
        GetData()
      )}
      {!childbefore && props.children}
    </TouchableOpacity>
  );
});

export default LongButton;
