import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";

// import CircularProgress from "react-native-conical-gradient-progress";
import ProgressCircle from "react-native-progress-circle";

import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";

import LongButton from "../Components/LongButton";
import { Colors, Images } from "../Constants/Index";
import Label from "../Components/Label";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import { GetDate, wait } from "../Constants/Functions";
import DateModal from "../Components/DateModal";
const { width, height } = Dimensions.get("window");

const CreditCoins = ({ route, navigation }) => {
  const [Data, setData] = useState(null);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setData(null);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const DateRef = useRef();

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
        var Payoff, CreditInfo;
        await fetch(`${Config.API_URL}/credit/balance`, requestOptions)
          .then(async (response) => response.json())
          .then((res) => {
            if (!isActive) return;
            Payoff = +res.outstanding_balance;
          });
        await fetch(`${Config.API_URL}/credit/info`, requestOptions)
          .then(async (response) => response.json())
          .then((res) => {
            if (!isActive) return;
            CreditInfo = res;
          });
        if (!isActive) return;
        setData({ Payoff, CreditInfo });
      }
    };
    check();
    return () => (isActive = false);
  });

  const GetButton = (props) => {
    const { head, text, style } = props;
    return (
      <LongButton
        text={text}
        childbefore
        style={[styles.LongBtn, style]}
        textstyle={styles.LongBtnText}
        NoBold
      >
        <Label dark text={head} style={styles.LongBtnHead} headingtype="h5" />
      </LongButton>
    );
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      <SafeArea>
        <Background height={0.23} />
        <View>
          <Header heading="Credit Coins" />
        </View>

        {Data === null ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <View style={styles.Main}>
            <View style={styles.ProgressView}>
              <ProgressCircle
                percent={(+Data.Payoff / 100000) * 100}
                radius={width * 0.205}
                borderWidth={10}
                color={Colors.PROGRESS_CIRCLE}
                bgColor={Colors.WHITE}
                shadowColor={Colors.LIGHT_MUTED}
              >
                <View>
                  <Label dark style={styles.Circle} font={11}>
                    Current balance is
                  </Label>
                  <Label
                    primary
                    bold
                    headingtype="h1"
                    text={`${Data.Payoff}`}
                    style={styles.Circle}
                  />
                  <Label primary text="coins" style={styles.Circle} />
                </View>
              </ProgressCircle>
            </View>

            <View style={styles.PayBtnsView}>
              <LongButton
                text="Pay off your balance"
                style={styles.PayBtn}
                textstyle={styles.PayBtnText}
                childbefore
                onPress={() => {
                  if (Data.Payoff <= 0)
                    Alert.alert(
                      "Error",
                      `You don't have any outstanding coin balance to pay off.`
                    );
                  else navigation.navigate("PayCredit");
                }}
              >
                <Image source={Images.CashBag} style={styles.CashBag} />
              </LongButton>
              <LongButton
                text="Borrow credit coins"
                style={styles.PayBtn}
                textstyle={styles.PayBtnText}
                childbefore
                onPress={() => {
                  if (Data.Payoff >= 100000)
                    Alert.alert(
                      "Error",
                      `You have reached the maximum limit of outstanding coin balance.`
                    );
                  else
                    navigation.navigate("MenuStack", {
                      screen: "BorrowCredit",
                    });
                }}
              >
                <Image
                  source={Images.CreditIcon}
                  style={[styles.CashBag, styles.CreditCoins]}
                />
              </LongButton>
            </View>
            <Label primary bold headingtype="h5" style={styles.LoanText}>
              Credit information
            </Label>
            <View style={styles.LoanDetailsView}>
              <GetButton
                head="Outstanding balance"
                text={`${Data.Payoff} coins`}
                style={styles.BtnsMargin}
              />
              {Data.Payoff > 0 && (
                <GetButton
                  head="Next statement"
                  text={`${GetDate(Data.CreditInfo[1])}`}
                  style={styles.BtnsMargin}
                />
              )}
              <DateModal ModalRef={DateRef} />
              <LongButton
                text="Download statement"
                NoBold
                style={styles.BtnsMargin}
                onPress={() => DateRef.current(true)}
              />
            </View>
          </View>
        )}
      </SafeArea>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Main: {
    width: width * 0.95,
    alignSelf: "center",
    marginTop: height * 0.01,
  },
  PayBtnsView: {
    marginTop: height * 0.01,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  PayBtn: {
    width: width * 0.432,
    height: height * 0.165,
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  PayBtnText: {
    textAlign: "center",
    marginTop: height * 0.095,
    width: width * 0.4,
    lineHeight: height * 0.028,
  },
  CashBag: {
    position: "absolute",
    alignSelf: "center",
    width: width * 0.11,
    height: width * 0.11,
    resizeMode: "contain",
    marginTop: height * 0.03,
  },
  CreditCoins: {
    width: width * 0.13,
    height: height * 0.03,
    marginTop: height * 0.045,
  },
  LoanText: {
    marginTop: height * 0.04,
  },
  LoanDetailsView: {
    marginTop: height * 0.0,
  },
  LongBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  LongBtnHead: {
    width: width * 0.5,
    marginLeft: width * 0.05,
    textAlign: "left",
  },
  LongBtnText: {
    width: width * 0.3,
    textAlign: "right",
    marginRight: width * 0.05,
  },
  BtnsMargin: {
    marginTop: height * 0.015,
  },
  Circle: {
    width: width * 0.3,
  },
  ProgressView: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
    width: width * 0.44,
    height: width * 0.44,
    borderRadius: 100,
  },
});
export default CreditCoins;
