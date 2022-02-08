import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Colors } from "../Constants/Index";
import Label from "./Label";
import InputField from "./InputField";
import LongButton from "./LongButton";
import Modals from "./Modals";
import EncryptedStorage from "react-native-encrypted-storage";
import { JSONtoForm } from "../Constants/Functions";
import Config from "react-native-config";
const { width, height } = Dimensions.get("window");

const ValidateModal = (props) => {
  const [ModelState, setModelState] = useState({
    state: false,
    email: true,
    verify: false,
  });

  const data = ModelState.email ? "email" : "phone number";

  const InputRef = useRef();
  const Buttonref = useRef();
  const ErrorModal = useRef();

  const HandleChange = (state, email = 0) => {
    setModelState({ state, email, verify: false });
  };

  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = HandleChange;
  });

  const CloseModal = () => {
    setModelState({
      ...ModelState,
      state: !ModelState.state,
    });
    if (props.onClose) props.onClose();
  };

  const HandleValidate = async () => {
    if (Buttonref.current.GetActivity()) return;
    if (
      (ModelState.email && InputRef.current.validateEmail()) ||
      (!ModelState.email && InputRef.current.validatePhone())
    ) {
      const text = InputRef.current.getText();
      let body;
      if (ModelState.email)
        body = JSONtoForm({
          email: text,
        });
      else
        body = JSONtoForm({
          phone_no: `+${text}`,
        });

      Buttonref.current.SetActivity(true, "WHITE");
      const Token = await EncryptedStorage.getItem("Token");
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body,
      };
      await fetch(
        `${Config.API_URL}/user/get-OTP/account/changes`,
        requestOptions
      )
        .then(async (response) => response.json())
        .then((res) => {
          Buttonref.current.SetActivity(false);

          if (res.status && res.status.toLowerCase() === "success") {
            setModelState({
              ...ModelState,
              verify: true,
              text,
            });
            InputRef.current.SetText("");
          } else
            ErrorModal.current(true, {
              heading: "Error",
              Error: res.message,
              array: res.errors ? Object.values(res.errors) : [],
            });
        });
    }
  };

  const HandleConfirm = async () => {
    if (Buttonref.current.GetActivity()) return;
    const text = InputRef.current.getText();
    if (text && text?.length === 6) {
      Buttonref.current.SetActivity(true, "WHITE");
      const Token = await EncryptedStorage.getItem("Token");
      let body;
      if (ModelState.email)
        body = JSONtoForm({
          email: ModelState.text,
          otp_code: text,
        });
      else
        body = JSONtoForm({
          phone_no: `+${ModelState.text}`,
          otp_code: text,
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
      await fetch(`${Config.API_URL}/verify/otp/email/phone`, requestOptions)
        .then(async (response) => response.json())
        .then((res) => {
          Buttonref.current.SetActivity(false);

          if (res.status && res.status.toLowerCase() === "success") {
            CloseModal();
            if (props.onComplete) props.onComplete();
            Alert.alert("Success", `Your ${data} has been updated`);
          } else
            ErrorModal.current(true, {
              heading: "Error",
              Error: res.message,
              array: res.errors ? Object.values(res.errors) : [],
            });
        });
    }
  };

  const ValidateSection = () => (
    <View style={styles.InputSection}>
      <Label primary bold>
        Enter your new {data}
      </Label>
      <InputField
        ref={InputRef}
        style={[
          styles.Input,
          !ModelState.email && { paddingLeft: width * 0.17 },
        ]}
        white
        pad
        NoIcon
        autoCapitalize="none"
        placeholderTextColor={Colors.DARK_MUTED}
        placeholder={ModelState.email ? "mail@domain.com" : "12345678"}
        phone={!ModelState.email}
        keyboardType={ModelState.email ? "email-address" : "numeric"}
        numstyle={styles.NumStyle}
      />
      <LongButton
        gradient
        ref={Buttonref}
        text="Validate"
        style={styles.ValidateBtn}
        onPress={HandleValidate}
      />
    </View>
  );

  const ConfirmSection = () => (
    <View style={styles.InputSection}>
      <Label primary bold>
        Enter the OTP code sent to your {ModelState.email && "old"} email
      </Label>
      <InputField
        ref={InputRef}
        style={styles.Input}
        fieldstyle={styles.ConfirmField}
        white
        NoIcon
        keyboardType="numeric"
        font={20}
        maxLength={6}
        placeholder="123456"
        placeholderTextColor={Colors.MUTED}
      />
      <LongButton
        gradient
        ref={Buttonref}
        text="Confirm"
        style={styles.ValidateBtn}
        onPress={HandleConfirm}
      />
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ModelState.state}
      statusBarTranslucent={false}
      onRequestClose={() => {
        CloseModal();
      }}
    >
      <TouchableWithoutFeedback onPress={() => CloseModal()}>
        <View style={styles.MainView} />
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.ModalView}>
          <Modals ModalRef={ErrorModal} Error />

          <View style={styles.SmallBorder} />
          <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
            Change your {data}
          </Label>
          <View style={styles.ModalBody}>
            {ModelState.verify ? ConfirmSection() : ValidateSection()}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  MainView: {
    height: height * 1.2,
    width: width,
    position: "absolute",
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height * 0.47,
    marginTop: height * 0.53,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.BENEFICIARY,
  },
  ModalBody: {
    marginTop: height * 0.02,
    backgroundColor: Colors.WHITE,
    height: height * 0.47,
  },
  SmallBorder: {
    width: width * 0.35,
    height: 4,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: "center",
    marginTop: height * 0.02,
  },
  ModalHead: {
    marginTop: height * 0.03,
    width: width * 0.8,
    lineHeight: height * 0.03,
  },
  InputSection: {
    marginTop: height * 0.03,
  },
  Input: {
    marginTop: height * 0.03,
    borderWidth: 1,
    borderColor: Colors.MUTED,
  },
  ConfirmField: {
    color: Colors.PRIMARY_LABEL,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: width * 0.04,
  },
  ValidateBtn: {
    marginTop: height * 0.03,
  },
  NumStyle: {
    color: Colors.DARK_MUTED,
  },
});

export default ValidateModal;
