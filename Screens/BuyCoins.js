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
import { GetCoinType, GetMaxCoins, JSONtoForm } from "../Constants/Functions";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import Modals from "../Components/Modals";
import GetBalance from "../Components/GetBalance";
import CoinsButtons from "../Components/CoinsButtons";
import { useSelector } from "react-redux";
import Section from "../Components/Section";
const { width, height } = Dimensions.get("window");

const BuyCoins = ({ route, navigation }) => {
  const ReceivedId = route.params && route.params.ReceivedId;

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
        heading: "Buy Coins",
        Error: "Wrong Input Value",
      });
    }
    if (!ButtonRef.current.GetActivity()) {
      if (/[0-9]/g.test(text) === true) {
        const Token = await EncryptedStorage.getItem("Token");
        ButtonRef.current.SetActivity(true, "WHITE");
        const body = JSONtoForm({
          coins_buy: text.toString().replace(/[^0-9]/g, ""),
          // coin_type: GetCoinType(TypeRef.current),
          coin_type: "gold",
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
        await fetch(`${Config.API_URL}/store/buy/coins`, requestOptions)
          .then(async (response) => response.json())
          .then(async (res) => {
            if (res.status && res.status.toLowerCase() === "success") {
              navigation.replace("BuyCoinsSuccess", {
                coin_type: "gold",
                // coin_type: GetCoinType(TypeRef.current),
              });
            }
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

  const GetCoinsSection = () => {
    const [CoinType, setCoinType] = useState(0);
    // const [CoinType, setCoinType] = useState(
    //   ReceivedId || GetMaxCoins(Data.Balance).id
    // );
    return (
      <>
        <CoinsButtons
          TypeRef={TypeRef}
          id={CoinType}
          onChange={(e) => setCoinType(e)}
        />
        {CoinType === 0 && (
          <Section
            style={{
              backgroundColor: Colors.MUTED,
              marginTop: height * 0.02,
              height: height * (Payoff > 9999 ? 0.13 : 0.11),
            }}
          >
            {Payoff <= 0 ? (
              <Label
                dark
                bold
                style={{
                  marginTop: height * 0.01,
                }}
                font={12}
              >
                You don't have any outstanding coin balance
              </Label>
            ) : (
              <Label
                dark
                bold
                style={{
                  marginTop: height * 0.01,
                }}
                font={12}
              >
                Your current outstanding coin balance is{" "}
                <Label primary bold notAlign font={13} text={`${Payoff} `} />
                coins
              </Label>
            )}
            <View
              style={{
                flexDirection: "row",
                marginTop: height * 0.01,
                justifyContent: "center",
              }}
            >
              {+Payoff > 0 && (
                <LongButton
                  text="Pay Now"
                  style={{
                    width: width * 0.3,
                    height: height * 0.05,
                  }}
                  font={13}
                  onPress={() => navigation.navigate("PayCredit")}
                />
              )}
              {+Payoff < 100000 && (
                <LongButton
                  text="Borrow"
                  font={13}
                  shadowless
                  style={{
                    width: width * 0.3,
                    height: height * 0.05,
                    marginLeft: width * (Payoff > 0 ? 0.05 : 0),
                    borderWidth: 2,
                    borderColor: Colors.DARK_LABEL,
                    backgroundColor: Colors.INVISIBLE,
                  }}
                  textstyle={{ color: Colors.DARK_LABEL }}
                  onPress={() =>
                    navigation.navigate("MenuStack", { screen: "BorrowCredit" })
                  }
                />
              )}
            </View>
          </Section>
        )}
      </>
    );
  };

  return (
    <ScrollView>
      <SafeArea>
        <Background height={0.27} />

        <View style={styles.MainTop}>
          <Header heading="Buy Virtual Coins" />
          <Modals ModalRef={ModalRef} Error />
          <GetBalance />
        </View>
        {Data === null || Payoff === null ? (
          <ActivityIndicator
            size="large"
            color="black"
            style={{ marginTop: height * 0.1 }}
          />
        ) : (
          <>
            {/* <Label dark>Which type of coins you want to buy?</Label>
            <GetCoinsSection /> */}
            {/* <Section
              style={{
                backgroundColor: Colors.MUTED,
                marginTop: height * 0.02,
                height: height * (Payoff > 9999 ? 0.13 : 0.11),
              }}
            >
              {Payoff <= 0 ? (
                <Label
                  dark
                  bold
                  style={{
                    marginTop: height * 0.01,
                  }}
                  font={12}
                >
                  You don't have any outstanding coin balance
                </Label>
              ) : (
                <Label
                  dark
                  bold
                  style={{
                    marginTop: height * 0.01,
                  }}
                  font={12}
                >
                  Your current outstanding coin balance is{" "}
                  <Label primary bold notAlign font={13} text={`${Payoff} `} />
                  coins
                </Label>
              )}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: height * 0.01,
                  justifyContent: "center",
                }}
              >
                {+Payoff > 0 && (
                  <LongButton
                    text="Pay Now"
                    style={{
                      width: width * 0.3,
                      height: height * 0.05,
                    }}
                    font={13}
                    onPress={() => navigation.navigate("PayCredit")}
                  />
                )}
                {+Payoff < 100000 && (
                  <LongButton
                    text="Borrow"
                    font={13}
                    shadowless
                    style={{
                      width: width * 0.3,
                      height: height * 0.05,
                      marginLeft: width * (Payoff > 0 ? 0.05 : 0),
                      borderWidth: 2,
                      borderColor: Colors.DARK_LABEL,
                      backgroundColor: Colors.INVISIBLE,
                    }}
                    textstyle={{ color: Colors.DARK_LABEL }}
                    onPress={() =>
                      navigation.navigate("MenuStack", {
                        screen: "BorrowCredit",
                      })
                    }
                  />
                )}
              </View>
            </Section> */}
            <Label dark style={styles.MarginLabel}>
              How many coins you want to buy?
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
              text="Buy Coins"
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
      </SafeArea>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.28,
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
export default BuyCoins;
