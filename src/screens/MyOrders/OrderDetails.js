import React from "react";
import { View, StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import Background from "../../Components/Background";
import SafeArea from "../../Components/SafeArea";
import Header from "../../Components/Header";
import Label from "../../Components/Label";
import Section from "../../Components/Section";
import { Colors } from "../../Constants/Index.js";
import { GetDate } from "../../Constants/Functions";
import Config from "react-native-config";
import SmallPopup from "../../Components/SmallPopup";
import GoBack from "../../Components/GoBack";

const { width, height } = Dimensions.get("window");

const OrderDetails = ({ route, navigation }) => {
  const { item } = route.params;

  const GetField = (props) => {
    const { name, val, style } = props;
    return (
      <View style={[styles.ItemView, style]}>
        <Label notAlign bold darkmuted text={name} />
        <Label
          notAlign
          bold
          dark
          text={val}
          style={styles.ItemLabel}
          {...props}
        />
      </View>
    );
  };
  const ImgUrl = `${Config.PRODUCT_IMG}/${item.products.id}/${
    JSON.parse(item.products.image)[0]
  }`;
  return (
    <ScrollView>
      <SafeArea>
        <Background height={0.22} />
        <View style={styles.MainTop}>
          <Header />
          <View style={styles.Header}>
            <View style={styles.ImageView}>
              <Image
                source={{
                  uri: ImgUrl,
                }}
                style={styles.Image}
              />
            </View>
            <View style={styles.HeaderLabel}>
              <Label notAlign bold style={styles.Info} headingtype="h1">
                {item.order_reference}
              </Label>
              <Label notAlign style={styles.Info} headingtype="h5">
                {item.products.title}
              </Label>
            </View>
            <View style={styles.PopupView}>
              <SmallPopup
                item={{
                  Text: item.status.toUpperCase(),
                  type: "success",
                }}
                style={{ marginLeft: 0 }}
              />
            </View>
          </View>
        </View>
        <View style={styles.DetailsContainer}>
          <Label primary bold headingtype="h4">
            Order Details
          </Label>
          <Section style={styles.SectionContainer}>
            <View style={styles.SectionTop}>
              <GetField name="Product" val={item.products.title} />
              <GetField name="Order Reference" val={item.order_reference} />
              <GetField name="Order Date" val={GetDate(item.created_at)} />
              <GetField
                name="Shipping date"
                val={item.shipping_date ? GetDate(item.created_at) : "N/A"}
              />
              <GetField name="Status" val={item.status} />
            </View>
          </Section>
        </View>

        <View style={[styles.SmallBorder, styles.Margin]} />

        <Section style={[styles.Coupon, styles.Margin]}>
          <View style={styles.CouponText}>
            <Label notAlign bold dark font={13} text="Coupon no:" />
            <Label
              style={styles.ItemLabel}
              notAlign
              bold
              dark
              font={13}
              text={item.coupon.code}
            />
          </View>
        </Section>
        <GoBack style={styles.MarginLess} />
      </SafeArea>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.22,
  },
  Header: {
    marginTop: height * 0.01,
    flexDirection: "row",
    alignSelf: "center",
    width: width * 0.9,
  },
  ImageView: {
    width: width * 0.2,
    height: height * 0.1,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  Image: {
    width: width * 0.2,
    height: height * 0.1,
    borderRadius: 10,
    resizeMode: "contain",
  },
  HeaderLabel: {
    justifyContent: "center",
    width: width * 0.45,
  },
  PopupView: {
    justifyContent: "center",
  },
  Info: {
    marginLeft: width * 0.05,
  },
  MarginLess: {
    marginTop: height * 0.02,
  },
  DetailsContainer: {
    marginTop: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
  },
  SectionContainer: {
    marginTop: height * 0.01,
    height: height * 0.225,
  },
  SectionTop: {
    height: height * 0.21,
    marginTop: height * 0.01,
  },
  ItemView: {
    marginTop: height * 0.013,
    marginLeft: width * 0.05,
  },
  ItemLabel: {
    position: "absolute",
    textAlign: "right",
    width: width * 0.85,
  },
  SmallBorder: {
    width: width * 0.12,
    height: 2,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: "center",
  },
  Coupon: {
    height: height * 0.06,
    justifyContent: "center",
  },
  CouponText: {
    marginLeft: width * 0.05,
  },
  Margin: {
    marginTop: height * 0.03,
  },
});

export default OrderDetails;