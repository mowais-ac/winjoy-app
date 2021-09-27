import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import InputField from "../Components/InputField";

import { Colors } from "../Constants/Index";
import TransactionSection from "../Components/TransactionSection";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import NotFound from "../Components/NotFound";
import GetBalance from "../Components/GetBalance";
import LongButton from "../Components/LongButton";

import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");

const Withdrawals = ({ navigation }) => {
  const [Data, setData] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData(null);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const Coins = useSelector((state) => state.Coins);

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
        await fetch(`${Config.API_URL}/withdraw/history`, requestOptions)
          .then(async (response) => response.json())
          .then((res) => {
            if (!isActive) return;
            if (res.status && res.status.toLowerCase() === "success") {
              if (JSON.stringify(Data) !== JSON.stringify(res.data[0])) {
                setData({
                  Coins,
                  Data: res.data[0],
                });
              }
            } else {
              Alert.alert("Error", res.message);
            }
          });
      }
    };
    check();
    return () => (isActive = false);
  });

  const GetData = () => {
    const [Filtered, setFiltered] = useState(null);
    const HandleTextChange = (t) => {
      if (!t || t === "") return setFiltered(null);
      return setFiltered(
        Data.Data.filter(
          (x) =>
            x.transaction_reference.toLowerCase().indexOf(t.toLowerCase()) !==
            -1
        )
      );
    };

    return Data === null ? (
      <ActivityIndicator size="large" color="black" style={styles.Margin} />
    ) : (
      <>
        {Data.Data.length >= 1 && (
          <InputField
            style={[styles.TransactionInput]}
            fieldstyle={styles.TransactionInputF}
            shadow
            placeholder="Search your transaction"
            placeholderTextColor={Colors.DARK_MUTED}
            onEdit={HandleTextChange}
          />
        )}
        <FlatList
          style={styles.Margin}
          data={Filtered || Data.Data}
          ListEmptyComponent={<NotFound text="Recieve" />}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          keyExtractor={(e) => e.id}
          contentContainerStyle={{
            paddingBottom: Dimensions.get("window").height * 0.36,
          }}
        />
      </>
    );
  };

  const renderItem = ({ item }) => <TransactionSection item={item} />;

  return (
    <SafeArea>
      <Background height={0.25} />
      <View style={styles.MainTop}>
        <Header heading="Receives" value={3} />
        <LongButton
          text="Receive"
          textstyle={styles.ButtonTxt}
          style={styles.Button}
          shadowless
          font={12}
          onPress={() =>
            navigation.navigate("MenuStack", { screen: "WithdrawCoins" })
          }
        />
        <GetBalance />
      </View>
      <GetData />
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
  Button: {
    position: "absolute",
    width: width * 0.27,
    height: height * 0.05,
    borderWidth: 2,
    borderColor: Colors.WHITE,
    backgroundColor: Colors.INVISIBLE,
    marginTop: height * 0.083,
    alignSelf: "flex-start",
    marginLeft: width * 0.68,
  },
  ButtonTxt: { color: Colors.WHITE },
});
export default Withdrawals;
