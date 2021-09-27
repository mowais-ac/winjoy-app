import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import Label from "../Components/Label";
import LongButton from "../Components/LongButton";
import InputField from "../Components/InputField";

import { Colors, Images } from "../Constants/Index";
import { GetDate, JSONtoForm } from "../Constants/Functions";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import Modals from "../Components/Modals";
import GetBalance from "../Components/GetBalance";
import NotFound from "../Components/NotFound";
import Section from "../Components/Section";
import CreditCoinsModal from "../Components/CreditCoinsModal";
const { width, height } = Dimensions.get("window");

const PayCredit = ({ route, navigation }) => {
  const ButtonRef = useRef();
  const InputRef = useRef();
  const ErrorRef = useRef();
  const ModalRef = useRef();
  const RemainRef = useRef();
  const TransRef = useRef();
  const SuccessRef = useRef();

  const [Data, setData] = useState(null);
  useEffect(() => {
    let isActive = true;
    const check = async () => {
      if (Data === null) {
        const Token = await EncryptedStorage.getItem("Token");
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${Token}`,
          },
        };

        var Payoff, List;
        await fetch(`${Config.API_URL}/credit/balance`, requestOptions)
          .then(async (response) => response.json())
          .then((res) => {
            if (!isActive) return;
            Payoff = res.outstanding_balance;
          });

        await fetch(`${Config.API_URL}/credit/transaction/list`, requestOptions)
          .then(async (response) => response.json())
          .then((res) => {
            if (!isActive) return;
            List = res;
          });
        if (List.length === 0) setData("empty");
        else setData({ Payoff, List, ID: List[0] });
      }
    };
    check();
    return () => (isActive = false);
  });

  const HandleClick = async () => {
    const text = InputRef.current.getText();
    if (
      text === null ||
      text === "" ||
      /[0-9]/g.test(text) === false ||
      +text.toString().replace(/[^0-9]/g, "") < 0
    ) {
      return ErrorRef.current(true, {
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
          transaction_id: TransRef.current,
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
        await fetch(`${Config.API_URL}/credit/payoff/balance`, requestOptions)
          .then(async (response) => response.json())
          .then(async (res) => {
            if (res.status && res.status.toLowerCase() === "success") {
              SuccessRef.current(true);
            } else Alert.alert("Error", res.message);
            ButtonRef.current.SetActivity(false);
          })
          .catch((e) => {
            ErrorRef.current(true, {
              heading: "Borrow Coins",
              Error: res.message,
            });
            ButtonRef.current.SetActivity(false);
          });
      }
    }
  };

  const RemainingText = (props) => {
    const [Value, setValue] = useState(0);

    useEffect(() => {
      if (props.TypeRef) props.TypeRef.current = setValue;
    });

    const coins = +Data.Payoff - Value;

    return (
      <Label
        primary
        bold2
        text={`${coins < 0 ? "0" : coins} coins`}
        headingtype="h3"
      />
    );
  };

  const GetTransactionSection = (props) => {
    const [TransID, setTransID] = useState(Data.ID.transaction_id);
    useEffect(() => {
      if (props.TransRef) props.TransRef.current = TransID;
    });

    const Filter = Data.List.filter((x) => x.transaction_id === TransID)[0];
    return (
      <>
        <CreditCoinsModal ModalRef={ModalRef} onSelect={(e) => setTransID(e)} />
        <Section style={styles.MarginLess}>
          <TouchableOpacity
            style={styles.SectionView}
            onPress={() => ModalRef.current(true)}
          >
            <View
              style={{
                width: width * 0.6,
              }}
            >
              <Label
                dark
                notAlign
                bold2
                headingtype="h4"
                text={`${+Filter.balance} coins`}
              />
              <Label
                darkmuted
                headingtype="h5"
                text={`${GetDate(Filter.start_date)}`}
                notAlign
              />
            </View>
            <Image source={Images.RightArrow} style={styles.Arrow} />
          </TouchableOpacity>
        </Section>
      </>
    );
  };

  return (
    <ScrollView>
      <SafeArea>
        <Background height={0.25} />

        <View style={styles.MainTop}>
          <Header heading="Pay your credit coin" />
          <Modals ModalRef={ErrorRef} Error />
          <Modals ModalRef={SuccessRef} BothClose />

          <GetBalance />
        </View>
        {Data === null ? (
          <ActivityIndicator
            size="large"
            color="black"
            style={{ marginTop: height * 0.1 }}
          />
        ) : Data === "empty" ? (
          <NotFound
            text="Loan amount"
            desc={`You don't have any amount to return.`}
          />
        ) : (
          <>
            <Label dark>How many coins you want to return?</Label>
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
              onEdit={(e) => RemainRef.current(e)}
            />
            <Label dark style={styles.Margin}>
              Which transaction are you paying for?
            </Label>
            <GetTransactionSection TransRef={TransRef} />
            <Label dark headingtype="h5" style={styles.RemainLabel}>
              Remaining outstanding coins will be
            </Label>
            <RemainingText TypeRef={RemainRef} />
            <LongButton
              gradient
              text="Pay Now"
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
            <View style={styles.MarginLess} />
          </>
        )}
      </SafeArea>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.27,
  },
  TopLessMargin: {
    marginTop: height * 0.015,
  },
  MarginLess: {
    marginTop: height * 0.01,
  },
  Margin: { marginTop: height * 0.02 },
  TransactionInput: {
    backgroundColor: Colors.WHITE,
    height: height * 0.1,
    borderRadius: 10,
  },
  TransactionInputF: {
    color: Colors.BLACK,
  },

  Section: {
    marginTop: height * 0.015,
    flexDirection: "row",
  },
  Privacy: {
    lineHeight: height * 0.025,
  },
  MarginBtn: {
    marginTop: height * 0.02,
  },
  SectionView: {
    flexDirection: "row",
    width: width * 0.85,
    height: height * 0.1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Arrow: {
    width: width * 0.05,
    height: height * 0.05,
    resizeMode: "contain",
    tintColor: Colors.DARK_MUTED,
    transform: [{ rotate: "90deg" }],
  },
  RemainLabel: {
    marginTop: height * 0.02,
  },
});
export default PayCredit;
