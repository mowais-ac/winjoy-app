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

const { width, height } = Dimensions.get("window");

const BuyCoinsSuccess = ({ navigation }) => {
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

      <LongButton
        text="My Credits"
        style={styles.MarginCredits}
        onPress={() => {
          navigation.replace("CreditCoins");
        }}
      />
      <LabelButton
        Notdark
        text="Back to home"
        style={styles.MarginBack}
        onPress={() => navigation.replace("Landing")}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.2,
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
  MarginCredits: {
    marginTop: height * 0.1,
  },
  MarginBack: {
    marginTop: height * 0.02,
  },
});
export default BuyCoinsSuccess;
