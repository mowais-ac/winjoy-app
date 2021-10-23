import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import Label from "../Components/Label";
import LongButton from "../Components/LongButton";
import InputField from "../Components/InputField";

import { Colors } from "../Constants/Index";
import { GetCoinType, JSONtoForm } from "../Constants/Functions";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import Modals from "../Components/Modals";
import GetBalance from "../Components/GetBalance";
import { useSelector } from "react-redux";
import Section from "../Components/Section";
const { width, height } = Dimensions.get("window");

const BorrowCredit = ({ route, navigation }) => {
  const ButtonRef = useRef();
  const InputRef = useRef();
  const TypeRef = useRef();
  const ModalRef = useRef();

  const [Payoff, setPayoff] = useState(null);
  useEffect(() => {
    let isActive = true;
    const check = async () => {
      if (Payoff === null) {
        const Token = await EncryptedStorage.getItem("Token");
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${Token}`,
          },
        };
        await fetch(`${Config.API_URL}/credit/balance`, requestOptions)
          .then(async (response) => response.json())
          .then((res) => {
            if (!isActive) return;
            setPayoff(+res.outstanding_balance);
          });
      }
    };
    check();
    return () => (isActive = false);
  }, []);

  const HandleClick = async () => {
    const text = InputRef.current.getText();
    if (
      text === null ||
      text === "" ||
      /[0-9]/g.test(text) === false ||
      +text.toString().replace(/[^0-9]/g, "") < 0
    ) {
      return ModalRef.current(true, {
        heading: "Borrow Coins",
        Error: "Wrong Input Value",
      });
    }
    if (!ButtonRef.current.GetActivity()) {
      if (/[0-9]/g.test(text) === true) {
        const Token = await EncryptedStorage.getItem("Token");
        ButtonRef.current.SetActivity(true, "WHITE");
        const body = JSONtoForm({
          credit_amount: text.toString().replace(/[^0-9]/g, ""),
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
        await fetch(`${Config.API_URL}/credit/request`, requestOptions)
          .then(async (response) => response.json())
          .then(async (res) => {
            if (res.status && res.status.toLowerCase() === "success") {
              navigation.replace("BorrowCreditSuccess");
            } else Alert.alert("Error", res.message);
            ButtonRef.current.SetActivity(false);
          })
          .catch((e) => {
            Alert.alert("Error", e);
            ButtonRef.current.SetActivity(false);
          });
      }
    }
  };

  const Data = useSelector((state) => state.Coins);

  return (
    <ScrollView>
      <SafeArea>
        <Background height={0.27} />
        {Data === null ? (
          <ActivityIndicator
            size="large"
            color={Colors.WHITE}
            style={{ marginTop: height * 0.1 }}
          />
        ) : (
          <>
            <View style={styles.MainTop}>
              <Header heading="Borrow Gold Coin" />
              <Modals ModalRef={ModalRef} Error />
              <GetBalance OnlyView />
            </View>
            {Payoff === null ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <>
                {Payoff > 0 && (
                  <Section
                    style={{
                      backgroundColor: Colors.MUTED,
                      height: height * 0.11,
                      alignItems: "center",
                    }}
                  >
                    <Label
                      dark
                      bold
                      style={{
                        marginTop: height * 0.01,
                      }}
                      font={11}
                    >
                      Your current outstanding coin balance is{" "}
                      <Label primary bold font={12} text={`${Payoff} `} />
                      coins
                    </Label>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: height * 0.01,
                      }}
                    >
                      <LongButton
                        text="Pay Now"
                        style={{
                          width: width * 0.3,
                          height: height * 0.05,
                          alignSelf: "flex-start",
                        }}
                        font={13}
                        onPress={() =>
                          navigation.navigate("CreditCoins", {
                            Debt: Payoff,
                          })
                        }
                      />
                    </View>
                  </Section>
                )}
                <Label dark style={styles.MarginLabel}>
                  How many coins you want to borrow?
                </Label>
                <InputField
                  style={[styles.TransactionInput, styles.Margin]}
                  fieldstyle={styles.TransactionInputF}
                  shadow
                  bold
                  NoIcon
                  placeholderTextColor={Colors.MUTED}
                  placeholder="100"
                  keyboardType="numeric"
                  textAlign={"center"}
                  font={25}
                  OnlyNumbers
                  ref={InputRef}
                />
                <LongButton
                  gradient
                  text="Send Request"
                  style={styles.MarginBtn}
                  onPress={HandleClick}
                  ref={ButtonRef}
                />
                <Label dark style={[styles.Margin, styles.Privacy]} light>
                  By submitting the form you agree to the{" "}
                  <Label primary notAlign underline>
                    Terms and Conditions
                  </Label>{" "}
                  and{" "}
                  <Label primary notAlign underline>
                    Privacy Policy
                  </Label>
                </Label>
                <View style={styles.MarginLabel} />
              </>
            )}
          </>
        )}
      </SafeArea>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.3,
  },
  TopLessMargin: {
    marginTop: height * 0.015,
  },
  MarginLabel: {
    marginTop: height * 0.03,
  },
  TransactionInput: {
    backgroundColor: Colors.WHITE,
    height: height * 0.1,
    borderRadius: 10,
  },
  TransactionInputF: {
    color: Colors.BLACK,
  },
  Margin: { marginTop: height * 0.02 },
  Section: {
    marginTop: height * 0.015,
    flexDirection: "row",
  },
  Privacy: {
    lineHeight: height * 0.025,
  },

  MarginBtn: {
    marginTop: height * 0.03,
  },
});
export default BorrowCredit;
