import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";

import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import InputField from "../Components/InputField";
import TransactionSection from "../Components/TransactionSection";

import { Colors } from "../Constants/Index";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";

const { width, height } = Dimensions.get("window");

const Transfers = () => {
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
      await fetch(`${Config.API_URL}/transfer-coins/history`, requestOptions)
        .then(async (response) => response.json())
        .then((res) => {
          if (!isActive) return;
          if (res.status && res.status.toLowerCase() === "success") {
            if (JSON.stringify(Data) !== JSON.stringify(res.data[0])) {
              setData(res.data[0]);
            }
          } else {
            Alert.alert("Error", res.message);
          }
        });
    };
    check();
    return () => (isActive = false);
  });

  const renderItem = ({ item }) => <TransactionSection item={item} send />;

  return (
    <SafeArea>
      <Background height={0.25} />
      <View style={styles.MainTop}>
        <Header heading="Transfers" value={3} />
        <InputField
          Icon="balance"
          style={styles.MarginLess}
          editable={false}
          value={"20,450"}
        />
      </View>
      <InputField
        style={[styles.TransactionInput]}
        fieldstyle={styles.TransactionInputF}
        shadow
        placeholder="Search your transaction"
        placeholderTextColor={Colors.DARK_MUTED}
      />
      {Data === null ? (
        <ActivityIndicator size="large" color="black" style={styles.Margin} />
      ) : (
        <FlatList
          style={styles.Margin}
          data={Data}
          renderItem={renderItem}
          keyExtractor={(e) => e.id}
          contentContainerStyle={{
            paddingBottom: Dimensions.get("window").height * 0.36,
          }}
        />
      )}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.275,
  },
  TransactionInput: {
    backgroundColor: Colors.WHITE,
  },
  TransactionInputF: {
    color: Colors.BLACK,
    paddingLeft: width * 0.23,
  },
  MarginLess: { marginTop: height * 0.005 },
  Margin: { marginTop: height * 0.01 },
  Section: {
    marginTop: height * 0.015,
    flexDirection: "row",
  },
});
export default Transfers;
