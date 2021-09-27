import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import Label from "../Components/Label";
import LongButton from "../Components/LongButton";

import { Colors, Images } from "../Constants/Index";
import LabelButton from "../Components/LabelButton";
import Section from "../Components/Section";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

const BuyCoinsSuccess = ({ route, navigation }) => {
  const Coins = useSelector((state) => state.Coins);

  const GetCoins = (e) => {
    switch (e) {
      case "gold":
        return ["Gold coins", +Coins.Balance["Gold Coins"]];
      case "diamond":
        return ["Diamond coins", +Coins.Balance["Diamond Coins"]];
      default:
        return ["Silver coins", +Coins.Balance["Silver Coins"]];
    }
  };
  return (
    <SafeArea>
      <Background height={1.08} />
      <View style={styles.MainTop}>
        <Header />
      </View>
      <Image source={Images.Check} style={styles.Image} />
      <Label bold font={27} style={styles.Heading}>
        Thank you
      </Label>
      <Label style={styles.Info} headingtype="h5" light>
        Thank you, we’ve received your request for approval, we usually approve
        request within 24 hours.
      </Label>
      {Coins === null ? (
        <ActivityIndicator size="large" color={Colors.WHITE} />
      ) : (
        <>
          <Section style={styles.Section} shadowless>
            <Label light style={styles.CurrentBal} font={13}>
              Current balance
            </Label>
            <Label bold font={35}>
              {GetCoins(route.params.coin_type)[1]}{" "}
              <Label style={styles.CoinsTxt}>
                {GetCoins(route.params.coin_type)[0]}
              </Label>
            </Label>
          </Section>
          <LongButton
            text="My Account"
            style={styles.Margin}
            onPress={() => {
              navigation.goBack();
              navigation.navigate("Profile");
            }}
          />
          <LabelButton
            Notdark
            text="Back to home"
            style={styles.Margin}
            onPress={() => navigation.replace("Landing")}
          />
        </>
      )}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.1,
  },
  Image: {
    alignSelf: "center",
    width: width * 0.3,
    height: height * 0.14,
    resizeMode: "contain",
  },
  Heading: {
    marginTop: height * 0.025,
  },
  Section: {
    backgroundColor: Colors.IMAGE_BORDER,
    marginTop: height * 0.03,
    height: height * 0.15,
  },
  Info: {
    width: width * 0.8,
    lineHeight: height * 0.03,
    marginTop: height * 0.01,
  },
  CurrentBal: {
    marginTop: height * 0.025,
  },
  Margin: {
    marginTop: height * 0.035,
  },
});
export default BuyCoinsSuccess;
