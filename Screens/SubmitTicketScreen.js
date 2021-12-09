import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import Label from "../Components/Label";

import LabelButton from "../Components/LabelButton";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import LongButton from "../Components/LongButton";
import { Colors } from "../Constants/Index";
import InputField from "../Components/InputField";
import Modals from "../Components/Modals";
import { JSONtoForm } from "../Constants/Functions";
import GoBack from "../Components/GoBack";

const { width, height } = Dimensions.get("window");

const SubmitTicketScreen = ({ navigation }) => {
  const TitleRef = useRef();
  const DesRef = useRef();

  const ModalRef = useRef();
  const BtnRef = useRef();

  const HandleSubmit = async () => {
    const service = TitleRef.current.getText();
    const message = DesRef.current.getText();

    if ([service, message].filter((e) => e == null || e == "").length >= 1)
      return;

    BtnRef.current.SetActivity(true, "WHITE");

    const Token = await EncryptedStorage.getItem("Token");
    const body = JSONtoForm({
      service,
      message,
    });
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
      body,
    };

    await fetch(`${Config.API_URL}/generate/ticket`, requestOptions)
      .then(async (response) => response.json())
      .then(async (res) => {
        if (res.status && res.status.toLowerCase() === "success") {
          ModalRef.current(true);
        }
      });
  };

  return (
    <SafeArea>
      <Background height={0.18} />
      <Header heading="Submit a ticket" />
      <View style={styles.MainTop}>
        <Modals ticket ModalRef={ModalRef} BothClose />
        <Label dark notAlign bold headingtype="h5">
          Title
        </Label>
        <InputField
          style={styles.Field}
          fieldstyle={styles.FieldInput}
          NoIcon
          white
          shadow
          placeholder="Enter title"
          placeholderTextColor={Colors.DARK_MUTED}
          ref={TitleRef}
        />
        <InputField
          style={styles.Description}
          fieldstyle={styles.DescriptionInput}
          multiline
          NoIcon
          white
          shadow
          placeholder="Enter description"
          placeholderTextColor={Colors.DARK_MUTED}
          ref={DesRef}
        />
        <LongButton
          gradient
          text="Proceed"
          style={styles.Margin}
          onPress={HandleSubmit}
          ref={BtnRef}
        />
        <GoBack style={styles.Margin} />
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    marginTop: height * 0.08,
    width: width * 0.9,
    alignSelf: "center",
  },
  Field: {
    width: width * 0.9,
  },
  FieldInput: {
    paddingLeft: width * 0.08,
  },
  Description: {
    borderRadius: 15,
    marginTop: height * 0.03,
    width: width * 0.9,
    height: height * 0.25,
  },
  DescriptionInput: {
    textAlignVertical: "top",
    alignSelf: "flex-start",
    width: width * 0.9,
    height: height * 0.25,
    paddingTop: height * 0.02,
    paddingLeft: width * 0.05,
  },
  Margin: {
    marginTop: height * 0.03,
  },
});

export default SubmitTicketScreen;
