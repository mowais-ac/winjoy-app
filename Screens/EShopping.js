import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
} from "react-native";
import ProgressCircle from "react-native-progress-circle";

import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import LongButton from "../Components/LongButton";
import NotFound from "../Components/NotFound";

import { Colors } from "../Constants/Index";
import Label from "../Components/Label";
import LoaderImage from "../Components/LoaderImage";
import Section from "../Components/Section";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import { GetDate } from "../Constants/Functions";
import { wait } from "../Constants/Functions";

import { useFocusEffect } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const EShopping = ({ navigation }) => {
  const [Data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData(null);
    wait(500).then(() => setRefreshing(false));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const check = async () => {
        const Token = await EncryptedStorage.getItem("Token");
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${Token}`,
          },
        };
        await fetch(`${Config.API_URL}/products/list`, requestOptions)
          .then(async (response) => response.json())
          .then((res) => {
            if (!isActive) return;
            if (res.status && res.status.toLowerCase() === "success") {
              if (JSON.stringify(Data) !== JSON.stringify(res.data[0]))
                setData(res.data[0]);
            }
          });
      };
      check();

      return () => (isActive = false);
    })
  );

  const SectionView = ({ item }) => {
    const ImgUrl = `${Config.PRODUCT_IMG}/${item.id}/${
      JSON.parse(item.image)[0]
    }`;
    return (
      <Section style={[styles.Section, styles.Margin]} onPress={() =>
        navigation.navigate("EShoppingInfo", {
          item,
        })}>
        <LoaderImage
          source={{
            uri: ImgUrl.replace('http://', 'https://'),
          }}
          resizeMode="contain"
          style={styles.ShoppingImage}
        />
        <View>
          <View style={styles.WinSection}>
            <View style={styles.WinView}>
              <Label notAlign primary font={13}>
                Get a chance to win
              </Label>
              <Label notAlign dark style={{width:"100%"}}>
                New {item.title}
              </Label>
            </View>
            <View>
              <ProgressCircle
                percent={(item.updated_stocks / item.stock) * 100}
                radius={width * 0.07}
                borderWidth={5}
                color={Colors.PROG_COL}
                bgColor={Colors.WHITE}
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
                    font={9}
                    text={`${item.updated_stocks || 0} \n SOLD OUT OF \n ${item.stock}`}
                    style={{flex: 1,}}
                  />
                  
                </View>
              </ProgressCircle>
            </View>
          </View>
          <View style={styles.PriceView}>
            <Label primary style={styles.Price} headingtype="h5" bold>
              {+(item.price).toLocaleString()} Coins
            </Label>
          </View>
          <View style={styles.ButtonsView}>
            {/* <LongButton
              text="Prize Details"
              style={styles.PrizeButton}
              font={11}
            /> */}
            <LongButton
              gradient
              text="Buy Now"
              style={styles.BuyButton}
              imgstyle={styles.BuyButton}
              font={13}
              onPress={() =>
                navigation.navigate("EShoppingInfo", {
                  item,
                })
              }
            />
          </View>
          <Label style={styles.DrawDate} darkmuted light font={10}>
            Max draw date {GetDate(item.luckydraw.updated_at)} or when the
            campaign is sold out, whichever is earliest
          </Label>
        </View>
      </Section>
    );
  };

  const renderItem = ({ item }) => <SectionView item={item} key={item.id} />;
  return (
    <SafeArea>
      <Background height={0.27} />
      <View style={styles.MainTop}>
        <Header />
        <Label headingtype="h2" bold style={styles.Heading}>
          Buy a coupon and <Text style={{fontFamily: "Axiforma-Light",}}>get a chance to win amazing prizes</Text>
        </Label>
      </View>
      {Data === null ? (
        <ActivityIndicator size="large" color={Colors.BLACK} />
      ) : (
        <FlatList
          data={Data}
          renderItem={renderItem}
          ListEmptyComponent={
            <NotFound text="Products" style={styles.NotFound} />
          }
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          keyExtractor={(e) => e.id}
          contentContainerStyle={{
            paddingBottom: height * 0.17,
          }}
        />
      )}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.15,
  },
  Heading: {
    position: "absolute",
    textAlign: "center",
    width: width * 0.8,
    marginLeft: width * 0.05,
    marginTop: height * 0.07,
  },
  Margin: { marginTop: height * 0.02 },
  Section: {
    height: height * 0.53,
  },
  ShoppingImage: {
    width: width * 0.95,
    height: height * 0.25,
    borderRadius: 10,
  },
  PriceView: {
    flexDirection: "row",
    justifyContent: 'center',
    borderTopColor: Colors.MUTED,
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  PriceLabel: {
  },
  Price: {
    fontSize: 18,
  },
  WinSection: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  WinView: {
    marginLeft: width * 0.05,
    width: width * 0.7,
  },
  ButtonsView: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
  PrizeButton: {
    width: width * 0.35,
    height: height * 0.05,
    borderWidth: 2,
    borderColor: Colors.PRIMARY_LABEL,
  },
  BuyButton: {
    width: width * 0.5,
    height: height * 0.06,
  },
  DrawDate: {
    width: width * 0.8,
    marginTop: height * 0.015,
  },
  NotFound: {
    marginTop: height * 0.12,
  },
});

export default EShopping;
