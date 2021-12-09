import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
  ActivityIndicator,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import InputField from "../Components/InputField";
import NotFound from "../Components/NotFound";

import { Colors, Images } from "../Constants/Index";
import TransactionSection from "../Components/TransactionSection";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import Label from "../Components/Label";
import LongButton from "../Components/LongButton";
import SmallButton from "../Components/SmallButton";
import { GetDate, wait } from "../Constants/Functions";
import { useFocusEffect } from "@react-navigation/native";
import CoinsStatement from "../Components/CoinStatement";

const { width, height } = Dimensions.get("window");

const Transactions = ({ navigation }) => {
  const DateRef = useRef();

  const [Data, setData] = useState(null);
  const [ViewType, setViewType] = useState(2);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData(null);
    wait(500).then(() => setRefreshing(false));
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const check = async () => {
        if (Data !== null) return;
        const Token = await EncryptedStorage.getItem("Token");
        var Receive = null;
        var Transfer = null;
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${Token}`,
          },
        };
        await fetch(
          `${Config.API_URL}/received/transfer/coins/history`,
          requestOptions
        )
          .then(async (response) => response.json())
          .then((res) => {
            if (!isActive) return;
            if (res.status && res.status.toLowerCase() === "success") {
              Receive = res.data[0];
            } else {
              Alert.alert("Error", res.message);
            }
          });

        await fetch(`${Config.API_URL}/transfer-coins/history`, requestOptions)
          .then(async (response) => response.json())
          .then((res) => {
            if (res.status && res.status.toLowerCase() === "success") {
              Transfer = res.data[0];
            } else {
              Alert.alert("Error", res.message);
            }
          });

        if (!isActive) return;
        // const newData = {
        //   Receive: [],
        //   Transfer: [],
        // };
        const newData = {
          Receive: Receive.reverse(),
          Transfer: Transfer.reverse(),
        };
        if (JSON.stringify(newData) !== JSON.stringify(Data)) setData(newData);
      };
      check();
      return () => (isActive = false);
    })
  );

  const renderItem = ({ item }) => {
    const isReceive = ViewType === 2 ? item.type : ViewType === 0;
    return (
      <TransactionSection
        item={item}
        Button
        send={isReceive}
        onPress={() =>
          navigation.navigate("TransactionDetails", {
            gradient: true,
            id: item.id,
            item: {
              ...item,
              type: isReceive ? "ReceiveCoins" : "TransferCoins",
              data: {
                status: "success",
              },
            },
          })
        }
      />
    );
  };

  const GetData = () => {
    const [Filtered, setFiltered] = useState(null);

    const HandleTextChange = (t) => {
      if (!t || t === "") return setFiltered(null);
      var Check = ViewType === 0 ? Data.Receive : Data.Transfer;
      return setFiltered(
        Check.filter(
          (x) =>
            x.transaction_reference.toLowerCase().indexOf(t.toLowerCase()) !==
            -1
        )
      );
    };
    const GetReducedData = (arr, val) =>
      arr.reduce((p, n) => {
        n.type = val;
        p.push(n);
        return p;
      }, []);
    var AllData = [];
    if (Data !== null) {
      AllData = [
        ...GetReducedData(Data.Receive, true),
        ...GetReducedData(Data.Transfer, false),
      ].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    return Data === null ? (
      <></>
    ) : (
      <>
        {(ViewType === 0 && Data.Receive.length === 0) ||
        (ViewType === 1 && Data.Transfer.length === 0) ||
        (ViewType === 2 &&
          Data.Transfer.length === 0 &&
          Data.Receive.length === 0) ? (
          <></>
        ) : (
          <InputField
            style={styles.TransactionInput}
            fieldstyle={styles.TransactionInputF}
            shadow
            placeholder="Search your transaction"
            placeholderTextColor={Colors.DARK_MUTED}
            onEdit={HandleTextChange}
          />
        )}

        <FlatList
          style={[styles.Margin]}
          data={
            Filtered ||
            (ViewType === 0
              ? Data.Receive
              : ViewType === 1
              ? Data.Transfer
              : AllData)
          }
          ListEmptyComponent={
            <NotFound
              text={
                ViewType === 0
                  ? "data"
                  : ViewType === 1
                  ? "transfers"
                  : "transactions"
              }
            />
          }
          renderItem={renderItem}
          keyExtractor={(e, idx) => idx.toString()}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          contentContainerStyle={{
            paddingBottom: height * 0.4,
          }}
        />
      </>
    );
  };

  const HandleViewType = (e) => {
    if (e !== ViewType) setViewType(e);
  };

  return (
    <SafeArea>
      <Background height={0.2} yellow />
      <View style={styles.MainTop}>
        <Header heading="Transactions" />
        <Label notAlign style={styles.Info}>
          Last updated: {GetDate()}
        </Label>
        <CoinsStatement ModalRef={DateRef} />
        <TouchableOpacity
          style={styles.DownBtn}
          onPress={() => DateRef.current(true)}
        >
          <Image source={Images.Download} style={styles.DownImg} />
        </TouchableOpacity>
      </View>
      {Data === null ? (
        <ActivityIndicator size="large" color={Colors.BLACK} />
      ) : (
        <>
          <View style={styles.ButtonsView}>
            <SmallButton
              style={ViewType !== 2 && styles.ButtonDisabled}
              textstyle={ViewType !== 2 && styles.DisabledText}
              shadowless
              text="All"
              onPress={() => HandleViewType(2)}
            />
            <LongButton
              text="Received"
              style={[styles.Button, ViewType !== 0 && styles.ButtonDisabled]}
              shadowless
              regular={ViewType === 0}
              font={13}
              textstyle={
                ViewType === 0 ? styles.ButtonTxt : styles.DisabledText
              }
              onPress={() => HandleViewType(0)}
            >
              {ViewType === 0 && (
                <Image source={Images.Send} style={styles.SectionImage} />
              )}
            </LongButton>
            <LongButton
              text="Sent"
              style={[styles.Button, ViewType !== 1 && styles.ButtonDisabled]}
              shadowless
              regular={ViewType === 1}
              font={13}
              textstyle={
                ViewType === 1 ? styles.ButtonTxt : styles.DisabledText
              }
              onPress={() => HandleViewType(1)}
            >
              {ViewType === 1 && (
                <Image source={Images.Withdraw} style={styles.SectionImage} />
              )}
            </LongButton>
          </View>
          <GetData />
        </>
      )}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.22,
  },
  Info: {
    marginLeft: width * 0.05,
  },
  ButtonsView: {
    flexDirection: "row",
    width: width * 0.95,
    alignSelf: "center",
    justifyContent: "space-around",
  },
  Button: {
    width: width * 0.35,
  },
  ButtonTxt: {
    marginLeft: width * 0.08,
  },
  SectionImage: {
    position: "absolute",
    marginLeft: width * 0.03,
    width: width * 0.08,
    height: height * 0.045,
    resizeMode: "contain",
  },
  ButtonDisabled: {
    borderWidth: 3,
    borderColor: Colors.MUTED,
    backgroundColor: Colors.INVISIBLE,
  },
  DisabledText: {
    color: Colors.DARK_LABEL,
  },
  TransactionInput: {
    backgroundColor: Colors.WHITE,
    marginTop: height * 0.02,
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
  DownBtn: {
    position: "absolute",

    marginTop: height * 0.1,
    alignSelf: "flex-start",
    marginLeft: width * 0.72,
  },
  DownImg: {
    width: width * 0.25,
    height: height * 0.05,
    resizeMode: "contain",
  },
});
export default Transactions;
