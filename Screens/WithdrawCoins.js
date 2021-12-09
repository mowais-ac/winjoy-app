import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import Label from "../Components/Label";
import LongButton from "../Components/LongButton";
import InputField from "../Components/InputField";
import Modals from "../Components/Modals";

import {
  GetCoins,
  GetCoinType,
  GetMaxCoins,
  JSONtoForm,
} from "../Constants/Functions";
import { Colors } from "../Constants/Index";
import Section from "../Components/Section";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import CoinsButtons from "../Components/CoinsButtons";

import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

const WithdrawCoins = ({ navigation }) => {
  const ButtonRef = useRef();
  const InputRef = useRef();
  const TypeRef = useRef();
  const ModalState = useRef();
  const UpdateRef = useRef();

  const Coins = useSelector((state) => state.Coins);

  const HandleClick = async () => {
    const coins = InputRef.current.getText();
    if (
      coins !== null &&
      coins !== "" &&
      !ButtonRef.current.GetActivity() &&
      /[0-9]/g.test(coins) === true &&
      +coins.toString().replace(/[^0-9]/g, "") > 0
    ) {
      ButtonRef.current.SetActivity(true, "WHITE");
      const Token = await EncryptedStorage.getItem("Token");
      const body = JSONtoForm({
        w_amount: coins.toString().replace(/[^0-9]/g, ""),
        coin_type: GetCoinType(TypeRef.current),
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
      await fetch(`${Config.API_URL}/withdrawal`, requestOptions)
        .then(async (response) => response.json())
        .then((res) => {
          if (res.status && res.status.toLowerCase() === "success") {
            ModalState.current(true);
            ButtonRef.current.SetActivity(false);
          } else {
            Alert.alert("Error", res.message);
            ButtonRef.current.SetActivity(false);
          }
        });
    }
  };
  const ShowBalance = () => {
    const [Remain, setRemain] = useState(TypeRef.current);

    const UpdateCoins = (e) => {
      setRemain(e);
    };

    useEffect(() => {
      UpdateRef.current = UpdateCoins;
    });

    return (
      Coins && (
        <Label bold notAlign font={26} style={styles.Info}>
          {GetCoins(Coins, Remain)[1]} {GetCoins(Coins, Remain)[0]}
        </Label>
      )
    );
  };

  return (
    <ScrollView>
      <SafeArea>
        <Background height={0.27} />
        <View style={styles.MainTop}>
          <Header heading="Receive" />
          <Label notAlign style={[styles.Info, styles.Coins]} headingtype="h5">
            Coins
          </Label>
          <ShowBalance />
        </View>
        <Modals ModalRef={ModalState} BothClose />
        {Coins === null ? (
          <ActivityIndicator size="large" color={Colors.BLACK} />
        ) : (
          <>
            <Label dark>Which type of coins you want to receive?</Label>
            <CoinsButtons
              TypeRef={TypeRef}
              UpdateRef={UpdateRef}
              id={GetMaxCoins(Coins.Balance).id}
            />
            <Label dark style={styles.MarginLabel}>
              {" "}
              I want to receive
            </Label>
            <Section style={styles.Section}>
              <Label primary bold2 style={styles.STMargin}>
                Coins
              </Label>
              <InputField
                style={styles.Field}
                fieldstyle={styles.FieldStyle}
                value={"100"}
                NoIcon
                keyboardType="numeric"
                textAlign={"center"}
                font={20}
                ref={InputRef}
              />
            </Section>
            <Label dark style={[styles.Margin, styles.Privacy]} light font={10}>
              By submitting the form you agree to the{" "}
              <Label primary notAlign underline font={10}>
                Terms and Conditions
              </Label>
            </Label>
            <LongButton
              gradient
              text="Proceed"
              style={styles.Margin}
              ref={ButtonRef}
              onPress={HandleClick}
            />
          </>
        )}
        <View style={{ marginTop: height * 0.03 }} />
      </SafeArea>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.3,
  },
  Info: {
    marginLeft: width * 0.05,
  },
  Coins: {
    marginTop: height * 0.01,
  },

  Field: {
    backgroundColor: Colors.WHITE,
    height: height * 0.04,
    marginTop: height * 0.005,
  },
  FieldStyle: {
    color: Colors.BLACK,
    fontFamily: "Axiforma SemiBold",
  },
  Margin: { marginTop: height * 0.02 },
  LessMargin: { marginTop: height * 0.005 },
  Section: {
    marginTop: height * 0.015,
    height: height * 0.11,
  },
  STMargin: {
    marginTop: height * 0.02,
  },
  Privacy: {
    lineHeight: height * 0.025,
    width: width * 0.5,
  },
  ButtonsView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: width * 0.95,
    alignSelf: "center",
    marginTop: height * 0.02,
  },
  TypeBtn: { width: width * 0.3 },
  MarginLabel: {
    marginTop: height * 0.03,
  },
});
export default WithdrawCoins;
