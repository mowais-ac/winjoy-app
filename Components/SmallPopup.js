import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import Config from "react-native-config";
import EncryptedStorage from "react-native-encrypted-storage";
import Label from "../Components/Label";
import { GetDeviceCode } from "../Constants/Functions";

import { Colors } from "../Constants/Index";
const { width, height } = Dimensions.get("window");

const SmallPopup = (props) => {
  const { item, style } = props;
  const [Data, setData] = useState(null);

  useEffect(() => {
    let isActive = true;
    const check = async () => {
      if (Data !== null) return;
      if (props.status) {
        const Token = await EncryptedStorage.getItem("Token");
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${Token}`,
          },
        };
        await fetch(
          `${Config.API_URL}/user/status?device_code=${GetDeviceCode()}`,
          requestOptions
        )
          .then(async (response) => response.json())
          .then(async (res) => {
            if (!isActive) return;
            if (res.status && res.status.toLowerCase() === "success") {
              switch (res.data[0]) {
                case "Active":
                  setData({ type: "success", Text: "ACTIVE" });
                  break;
              }
            }
          });
      } else setData(item);
    };
    check();
    return () => (isActive = false);
  });

  const GetColBg = () => {
    return (
      Data &&
      (Data.type === "success"
        ? Colors.SUCCESS_BG
        : Data.type === "process"
        ? Colors.PROCESSING_BG
        : Colors.FAILED_BG)
    );
  };

  const GetCol = () => {
    return (
      Data &&
      (Data.type === "success"
        ? Colors.SUCCESS
        : Data.type === "process"
        ? Colors.PROCESSING
        : Colors.FAILED)
    );
  };

  const styles = StyleSheet.create({
    LabelBG: {
      width: width * 0.25,
      height: height * 0.028,
      backgroundColor: GetColBg(),
      borderRadius: 50,
      marginLeft: width * 0.45,
      justifyContent: "center",
      alignItems: "center",
    },
    Label: {
      width: width * 0.25,
      height: height * 0.028,
      color: GetCol(),
      marginTop: height * 0.012,
    },
  });
  return (
    <View style={[styles.LabelBG, style]}>
      <Label bold style={styles.Label} font={9}>
        {Data === null ? (
          <ActivityIndicator size="large" color={Colors.WHITE} />
        ) : (
          Data.Text
        )}
      </Label>
    </View>
  );
};

export default SmallPopup;
