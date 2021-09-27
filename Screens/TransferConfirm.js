import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Alert } from "react-native";

import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import Label from "../Components/Label";

import LabelButton from "../Components/LabelButton";
import TransactionDetails from "../Components/TransactionDetails";
import LongButton from "../Components/LongButton";

import { Colors } from "../Constants/Index";
import Modals from "../Components/Modals";
import InputField from "../Components/InputField";
import { GetDate, JSONtoForm } from "../Constants/Functions";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import GoBack from "../Components/GoBack";

const { width, height } = Dimensions.get("window");

const TransferConfirm = ({ route, navigation }) => {
  const { details } = route.params;
  const ModalState = useRef();

  const GetData = () => {
    const MsgRef = useRef();
    const InputRef = useRef();
    const ButtonRef = useRef();
    const [OTP, setOTP] = useState(false);

    const GetOTP = ({ navigation, details }) => {
      const GetOTPReq = async () => {
        const message = MsgRef.current;
        const body = JSONtoForm({ message });
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
        ButtonRef.current.SetActivity(true, "WHITE");
        await fetch(`${Config.API_URL}/get/otp/${details.id}`, requestOptions)
          .then(async (response) => response.json())
          .then((res) => {
            if (res.status && res.status.toLowerCase() === "success") {
              setOTP(true);
            } else {
              Alert.alert("Error", JSON.stringify(res.message));
              ButtonRef.current.SetActivity(false);
            }
          });
      };

      const HandleClick = async () => {
        const code = InputRef.current.getText();
        if (
          InputRef.current.ValidateOTP() &&
          !ButtonRef.current.GetActivity()
        ) {
          ButtonRef.current.SetActivity(true, "WHITE");
          const Token = await EncryptedStorage.getItem("Token");
          const body = JSONtoForm({ verification: code });
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
            `${Config.API_URL}/coins/transfer/${details.id}`,
            requestOptions
          )
            .then(async (response) => response.json())
            .then(async (res) => {
              if (res.status && res.status.toLowerCase() === "success") {
                ModalState.current(true);
              } else {
                Alert.alert("Error", JSON.stringify(res.message));
                ButtonRef.current.SetActivity(false);
              }
            });
        }
      };

      return OTP !== false ? (
        <>
          <Label dark light>
            Enter the OTP sent to your email and phone number
          </Label>
          <View style={styles.OTP}>
            <InputField
              style={styles.Input}
              fieldstyle={styles.InputField}
              NoIcon
              keyboardType="numeric"
              font={20}
              maxLength={6}
              ref={InputRef}
              placeholder="123456"
              placeholderTextColor={Colors.MUTED}
            />
            <LongButton
              gradient
              shadowless
              text="Confirm"
              style={styles.Confirm}
              imgstyle={{ width: width * 0.4, height: height * 0.07 }}
              onPress={HandleClick}
              ref={ButtonRef}
            />
          </View>
        </>
      ) : (
        <>
          <LongButton
            text="Get OTP"
            gradient
            shadowless
            style={styles.OTP}
            onPress={GetOTPReq}
            ref={ButtonRef}
          />
          <GoBack style={styles.Margin} />
        </>
      );
    };

    const GetTransactionField = () => {
      const [GetText, setGetText] = useState(null);

      useEffect(() => {
        MsgRef.current = GetText;
      });
      const onEdit = (t) => {
        setGetText(t);
      };
      return OTP === false ? (
        <TransactionDetails details={details} onEdit={onEdit} />
      ) : (
        <TransactionDetails
          details={{ ...details, message: MsgRef.current }}
          nomessage
        />
      );
    };

    return (
      <>
        <View style={styles.DetailsContainer}>
          <Label primary bold headingtype="h5">
            Transactions Details
          </Label>
          <GetTransactionField />
        </View>
        <View style={styles.VerifyContainer}>
          <GetOTP details={details} navigation={navigation} />
        </View>
      </>
    );
  };

  return (
    <ScrollView>
      <SafeArea>
        <Background height={0.18} />
        <View style={styles.MainTop}>
          <Header heading="Verify details" noBell />
          <Label notAlign style={styles.Info}>
            <Modals
              ModalRef={ModalState}
              BothClose
              onClose={() =>
                navigation.replace("TabsStack", { screen: "Transactions" })
              }
            />
            {GetDate(details.updated_at)}
          </Label>
        </View>
        <GetData />
      </SafeArea>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.2,
  },
  Info: {
    marginLeft: width * 0.05,
  },
  OTP: {
    marginTop: height * 0.02,
  },
  DetailsContainer: {
    marginTop: height * 0.01,
    justifyContent: "center",
    alignItems: "center",
  },
  VerifyContainer: {
    alignSelf: "center",
    marginTop: height * 0.03,
  },
  VerifyButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.01,
  },
  Button: {
    width: width * 0.44,
  },
  ButtonDisabled: {
    borderWidth: 3,
    borderColor: Colors.MUTED,
    backgroundColor: Colors.INVISIBLE,
  },
  ButtonText: {
    color: Colors.DARK_LABEL,
  },
  Margin: {
    marginTop: height * 0.02,
  },
  Input: {
    backgroundColor: Colors.WHITE,
  },
  InputField: {
    color: Colors.PRIMARY_LABEL,
    fontWeight: "bold",
    paddingLeft: width * 0.05,
    letterSpacing: width * 0.04,
  },
  Confirm: {
    position: "absolute",
    width: width * 0.4,
    height: height * 0.07,
    alignSelf: "flex-start",
    marginLeft: width * 0.55,
  },
});

export default TransferConfirm;
