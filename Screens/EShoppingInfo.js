import React, { useRef, useState } from "react";
import { View, StyleSheet, Image, Dimensions, Alert } from "react-native";
import ProgressCircle from "react-native-progress-circle";

import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import LongButton from "../Components/LongButton";

import { Colors, Images } from "../Constants/Index";
import Label from "../Components/Label";
import Config from "react-native-config";
import { GetCoinType, GetDate, JSONtoForm } from "../Constants/Functions";
import Carousel from "react-native-banner-carousel";
import CoinsModal from "../Components/CoinsModal";
import EncryptedStorage from "react-native-encrypted-storage";
import DeliveryModal from "../Components/DeliveryModal";
import LoaderImage from "../Components/LoaderImage";

import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");

const EShopping = ({ route, navigation }) => {
  const { item } = route.params;
  const images = JSON.parse(item.image);

  const Coins = useSelector((state) => state.Coins);

  const CoinTypeRef = useRef();
  const ShippingRef = useRef();
  const BtnRef = useRef();

  const BuyProduct = async (e) => {
    BtnRef.current.SetActivity(true, "WHITE");
    const Token = await EncryptedStorage.getItem("Token");

    const body = JSONtoForm(e);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
      body,
    };
    const requestOptions2 = {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    await fetch(`${Config.API_URL}/buy/product/${item.id}`, requestOptions)
      .then(async (response) => response.json())
      .then(async (res2) => {
        if (res2.status && res2.status.toLowerCase() === "success") {
          // await fetch(`${Config.API_URL}/user/current-balance`, requestOptions2)
          //   .then(async (response) => response.json())
          //   .then(async (res) => {
          //     if (res.status && res.status.toLowerCase() === "success") {
          //       let coins = {
          //         Balance: res.data[0],
          //         date: GetDate(),
          //       };
          //       await EncryptedStorage.setItem("Coins", JSON.stringify(coins));
          //       navigation.replace("EShoppingSuccess", { item: res2.data[0] });
          //     }
          //   });
          await fetch(`${Config.API_URL}/user/current-balance`, requestOptions2)
            .then(async (response) => response.json())
            .then(async (res) => {
              if (res.status && res.status.toLowerCase() === "success") {
                let coins = {
                  Balance: { "Gold Coins": res.data[0]["Gold Coins"] },
                  date: GetDate(),
                };
                await fetch(`${Config.API_URL}/credit/balance`, requestOptions2)
                  .then(async (response) => response.json())
                  .then((res) => {
                    coins.Balance = {
                      ...coins.Balance,
                      "Gold Credit": res.outstanding_balance,
                    };
                  });
                await EncryptedStorage.setItem("Coins", JSON.stringify(coins));
                navigation.replace("EShoppingSuccess", { item: res2.data[0] });
              }
            });
        }
      });
  };

  const GetModals = () => {
    // const [coin_type, setcoin_type] = useState(null);
    const [coin_type, setcoin_type] = useState(GetCoinType(0));
    return (
      <>
        <CoinsModal
          ModalRef={CoinTypeRef}
          onApprove={(e) => {
            setcoin_type(GetCoinType(e));
            ShippingRef.current(true);
          }}
          onClose={() => BtnRef.current.SetActivity(false)}
          BuyProduct={+(item.price).toLoacleString()}
        />
        <DeliveryModal
          ModalRef={ShippingRef}
          onConfirm={(e) => BuyProduct({ ...e, coin_type })}
          onClose={() => BtnRef.current.SetActivity(false)}
        />
      </>
    );
  };

  return (
    <SafeArea>
      <Background height={0.27} />
      <View style={styles.MainTop}>
        <Header />
        <Label font={22} notAlign bold style={styles.Heading}>
          Win {item.title}
        </Label>
      </View>
      <View style={styles.Section}>
        <View style={styles.ShoppingCarousel}>
          <Carousel
            autoplay
            autoplayTimeout={5000}
            loop
            index={0}
            pageSize={width}
            pageIndicatorContainerStyle={{
              bottom: height * -0.03,
            }}
            activePageIndicatorStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: Colors.PRIMARY_LABEL,
              alignSelf: "center",
            }}
            pageIndicatorStyle={{
              backgroundColor: Colors.MUTED,
            }}
          >
            {images.map((image, index) => (
              <View key={index}>
                <LoaderImage
                  source={{ uri: `${Config.PRODUCT_IMG}/${item.id}/${image.replace('http://', 'https://')}` }}
                  style={styles.ShoppingImage}
                />
              </View>
            ))}
          </Carousel>
        </View>
        <View style={styles.UnderImage}>
          <View style={styles.WinView}>
            <Label notAlign primary headingtype="h5">
              Get a chance to win
            </Label>
            <Label notAlign dark font={13} style={{width:"100%"}}>
              New {item.luckydraw.gift_title}
            </Label>
          </View>
          <View>
            <Label notAlign primary style={styles.Price} headingtype="h1" bold>
              {+item.price.toLoacleString()} Coins
            </Label>
          </View>
        </View>
        <GetModals />
        <LongButton
          gradient
          text="Buy Now"
          style={styles.Margin}
          ref={BtnRef}
          // onPress={() => CoinTypeRef.current(true)}
          onPress={() => {
            if (+item.price > +Coins.Balance["Gold Coins"])
              return Alert.alert("Error", "You do not have enough coins.");
            ShippingRef.current(true);
          }}
        />
        <View style={styles.Margin}>
          <Label notAlign darkmuted bold>
            Description
          </Label>
        </View>
        <Label dark notAlign style={styles.Description} font={14}>
          {item.description}
        </Label>
        <View style={styles.BottomContainer}>
          <Label style={styles.DrawDate} darkmuted notAlign light font={11}>
            Max draw date {GetDate(item.luckydraw.updated_at)} or when the
            campaign is sold out, whichever is earliest
          </Label>
          <ProgressCircle
            percent={(item.updated_stocks / item.stock) * 100}
            radius={width * 0.13}
            borderWidth={7}
            color={Colors.PROG_COL}
            bgColor={Colors.DEFAULT_REACT}
            shadowColor={Colors.PROG_SHAD}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection:'row'
              }}
            >
              <Label
                bold
                dark
                font={14}
                text={`${item.updated_stocks || 0} \n SOLD \n OUT OF \n ${item.stock}`}
                style={{flex: 1,}}
              />
              
            </View>
          </ProgressCircle>
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.15,
  },
  Heading: {
    position: "absolute",
    marginLeft: width * 0.03,
    marginTop: height * 0.1,
  },
  Margin: { marginTop: height * 0.02 },
  Section: {
    alignSelf: "center",
  },
  ShoppingCarousel: {
    width: width * 0.95,
    height: height * 0.25,
  },
  ShoppingImage: {
    width: width * 0.95,
    height: height * 0.25,
    resizeMode: "stretch",
    borderRadius: 10,
  },
  Price: {
    width: "100%",
    textAlign: "right",
  },
  UnderImage: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.04,
  },
  WinView: {
    width: width * 0.51,
    marginLeft: width * 0.01,
  },
  Button: {borderWidth: 1,
    marginTop: height * 0.02,
  },
  Description: {
    width: width * 0.95,
    lineHeight: height * 0.03,
  },
  BottomContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  DrawDate: {
    width: width * 0.67,
    marginTop: height * 0.01,
    lineHeight: height * 0.023,
  },
});

export default EShopping;
