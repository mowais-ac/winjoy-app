import React, { useState } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import Label from "../Components/Label";
import LongButton from "../Components/LongButton";

import { Colors, Images } from "../Constants/Index";
import LabelButton from "../Components/LabelButton";
import Section from "../Components/Section";
import { GetDate } from "../Constants/Functions";
import LoaderImage from "../Components/LoaderImage";

const { width, height } = Dimensions.get("window");

const EShoppingSuccess = ({ route, navigation }) => {
  const { item } = route.params;

  const GetField = ({ title, text }) => {
    return (
      <View style={[styles.FlexDir, styles.SectionText]}>
        <Label style={styles.FlexDirText} darkmuted bold notAlign>
          {title}
        </Label>
        <Label dark notAlign style={styles.FlexDirText2} bold>
          {text}
        </Label>
      </View>
    );
  };

  const GetCouponSection = () => (
    <Section style={[styles.Section, styles.Margin]} shadowless>
      <View style={styles.TopSection}>
        <Label dark bold headingtype="h2" notAlign style={styles.SectionText}>
          Coupons
        </Label>
        <Label style={styles.SectionText} darkmuted bold notAlign>
          New {item.products.luckydraw.gift_title}
        </Label>
        {[
          ["Product", item.products.title],
          ["Purchased on", GetDate(item.products.updated_at)],
        ].map((field, index) => (
          <GetField title={field[0]} text={field[1]} key={index} />
        ))}
      </View>
      <View
        style={[
          styles.FlexDir,
          styles.SectionText,
          { marginTop: height * 0.017 },
        ]}
      >
        <Label style={styles.FlexDirText} dark bold notAlign>
          Coupon no:
        </Label>
        <Label dark notAlign style={styles.FlexDirText2} bold>
          {item.coupon.code}
        </Label>
      </View>
    </Section>
  );

  const GetInvoiceSection = () => (
    <Section style={[styles.Section, styles.Margin]} shadowless>
      <View style={styles.TopSection}>
        <Label dark bold headingtype="h2" notAlign style={styles.SectionText}>
          Invoice
        </Label>
        {[
          ["Coin Type", item.coin_type],
          ["Subtotal", +item.products.price + " coins"],
          ["Discount Code", item.products.discount_code || "none"],
        ].map((field, index) => (
          <GetField title={field[0]} text={field[1]} key={index} />
        ))}
      </View>
      <View
        style={[
          styles.FlexDir,
          styles.SectionText,
          { marginTop: height * 0.017 },
        ]}
      >
        <Label style={styles.FlexDirText} dark bold notAlign>
          Total
        </Label>
        <Label dark notAlign style={styles.FlexDirText2} bold>
          {+item.total} coins
        </Label>
      </View>
    </Section>
  );

  const GetBtnSection = () => {
    const GetBtn = (props) =>
      props.bg ? (
        <View style={styles.BackgroundBtn}>
          <LabelButton {...props} />
        </View>
      ) : (
        <LabelButton {...props} />
      );

    const [InfoType, setInfoType] = useState(1);
    return (
      <>
        <View style={styles.Buttons}>
          <GetBtn
            Notdark
            bold
            notAlign
            headingtype="h5"
            text="Invoice"
            style={styles.Btn}
            bg={InfoType === 0}
            onPress={() => setInfoType(0)}
          />
          <GetBtn
            Notdark
            bold
            notAlign
            headingtype="h5"
            text="Coupons"
            style={styles.Btn}
            bg={InfoType === 1}
            onPress={() => setInfoType(1)}
          />
          {/* <GetBtn
            Notdark
            bold
            notAlign
            headingtype="h5"
            text="Delivery"
            style={styles.Btn}
            bg={InfoType === 2}
            onPress={() => setInfoType(2)}
          /> */}
        </View>
        {InfoType === 0 ? <GetInvoiceSection /> : <GetCouponSection />}
      </>
    );
  };

  return (
    <SafeArea>
      <Background height={1.08} />
      <View style={styles.MainTop}>
        <Header />
      </View>
      <Image source={Images.Check} style={styles.Image} />
      <Label bold headingtype="h1" style={styles.MarginSmall}>
        Thank you for shopping
      </Label>
      <Label style={styles.Info} font={13} light>
        Please find the receipt with order details. We’ve also emailed this to
        you.
      </Label>
      <GetBtnSection />
      <LongButton
        text="Continue Shopping"
        style={styles.Margin}
        onPress={() => navigation.goBack()}
      />
      <LabelButton
        Notdark
        text="Back to home"
        style={styles.MarginSmall}
        onPress={() => navigation.replace("Landing")}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.08,
  },
  Image: {
    alignSelf: "center",
    width: width * 0.2,
    height: height * 0.1,
    resizeMode: "contain",
  },
  Section: {
    marginTop: height * 0.01,
    height: height * 0.27,
  },
  TopSection: {
    borderBottomColor: Colors.MUTED,
    borderBottomWidth: 2,
    height: height * 0.21,
  },
  SectionText: {
    marginLeft: width * 0.05,
    marginTop: height * 0.02,
  },
  Info: {
    marginTop: height * 0.01,
    width: width * 0.85,
    lineHeight: height * 0.03,
  },
  FlexDir: {
    flexDirection: "row",
  },
  FlexDirText: {
    width: width * 0.47,
  },
  FlexDirText2: {
    width: width * 0.4,
    textAlign: "right",
  },
  MarginSmall: {
    marginTop: height * 0.02,
  },
  Margin: {
    marginTop: height * 0.03,
  },
  Buttons: {
    width: width * 0.6,
    height: height * 0.05,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginTop: height * 0.03,
    justifyContent: "space-around",
  },
  BackgroundBtn: {
    width: width * 0.27,
    height: height * 0.05,
    borderRadius: 50,
    backgroundColor: Colors.IMAGE_BORDER,
    justifyContent: "center",
  },
  Btn: { width: width * 0.27, textAlign: "center" },
});
export default EShoppingSuccess;
