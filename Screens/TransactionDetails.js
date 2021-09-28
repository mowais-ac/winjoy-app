import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import Label from "../Components/Label";

import NotificationBar from "../Components/NotificationBar";
import LabelButton from "../Components/LabelButton";
import TransactionDetails from "../Components/TransactionDetails";
import { GetDate } from "../Constants/Functions";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import { Colors } from "../Constants/Index";
import GoBack from "../Components/GoBack";

const { width, height } = Dimensions.get("window");

const Transaction = ({ route, navigation }) => {
  const { id, item } = route.params;

  const [Data, setData] = useState(null);

  useEffect(() => {
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
      await fetch(`${Config.API_URL}/transaction/detail/${id}`, requestOptions)
        .then(async (response) => response.json())
        .then((res) => {
          if (!isActive) return;
          if (res.status && res.status.toLowerCase() === "success") {
            if (
              JSON.stringify(Data) !==
              JSON.stringify(res.data[0].transaction_detail)
            ) {
              setData(res.data[0].transaction_detail);
            }
          } else {
            Alert.alert("Error", res.message);
          }
        });
    };
    check();
    return () => (isActive = true);
  });
  return (
    <ScrollView>
      <SafeArea>
        <Background height={0.18} yellow={route.params.gradient} />
        <View style={styles.MainTop}>
          <Header heading={Data && Data.transaction_reference} noBell />
          <Label notAlign style={styles.Info}>
            {Data && GetDate(Data.updated_at)}
          </Label>
        </View>
        {Data === null ? (
          <ActivityIndicator size="large" color={Colors.BLACK} />
        ) : (
          <>
            <NotificationBar item={item} NoTouch />
            <View style={styles.DetailsContainer}>
              <Label primary bold headingtype="h5">
                Transactions Details
              </Label>
              <TransactionDetails
                details={Data}
                nomessage
                navigation={navigation}
              />
            </View>
            <GoBack style={styles.Margin} />
          </>
        )}
      </SafeArea>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.18,
  },
  Info: {
    marginLeft: width * 0.05,
  },
  Margin: {
    marginTop: height * 0.02,
  },
  DetailsContainer: {
    marginTop: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Transaction;
