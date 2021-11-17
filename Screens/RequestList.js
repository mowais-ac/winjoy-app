import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";

import { Colors, Images } from "../Constants/Index";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import NotFound from "../Components/NotFound";
import Section from "../Components/Section";
import Label from "../Components/Label";
import Modals from "../Components/Modals";
import GetBalance from "../Components/GetBalance";
import { wait } from "../Constants/Functions";
import LongButton from "../Components/LongButton";

import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");

const RequestList = (props) => {
  const initial = props.route.params && props.route.params.initial;
  const { navigation } = props;
  const [Data, setData] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [First, setFirst] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData(null);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const ModalState = useRef();

  const onModalClose = (e) => {
    if (e) {
      ModalState.current(true, null, true);
    }
    setData(null);
  };

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

        await fetch(`${Config.API_URL}/requests/list`, requestOptions)
          .then(async (response) => response.json())
          .then((res) => {
            if (!isActive) return;
            if (res.status && res.status.toLowerCase() === "success") {
              const NewData = { Data: res.data[0] };
              if (JSON.stringify(Data) !== JSON.stringify(NewData)) {
                setData(NewData);
              }
            } else {
              Alert.alert("Error", res.message);
            }
          });
      }
    };

    check();
    if (initial !== undefined && First && Data !== null) {
      const val = Data.Data.filter((x) => x.id === initial);
      if (val.length >= 1) {
        ModalState.current(true, {
          ...val[0],
          Coins: Coins.Balance,
        });
      }
    }
    if (Data !== null) setFirst(false);
    return () => (isActive = false);
  });

  const renderItem = ({ item }) => {
    return (
      <Section style={styles.Section}>
        <TouchableOpacity
          style={styles.Touchable}
          onPress={() =>
            ModalState.current(true, { ...item, Coins: Coins.Balance })
          }
        >
          <>
            <Image source={Images.Send} style={styles.SectionImg} />
            <Label notAlign style={styles.SectionLabel}>
              <Label dark bold notAlign>
                {`${item.user_receiver.first_name} ${item.user_receiver.last_name}`}
              </Label>
              <Label dark notAlign>
                {" "}
                requested for{" "}
              </Label>
              <Label dark bold notAlign>
                {parseInt(item.amount)} {item.coin_type} coins
              </Label>
            </Label>
          </>
        </TouchableOpacity>
      </Section>
    );
  };

  const GetData = () => {
    return Data === null ? (
      <ActivityIndicator size="large" color="black" style={styles.Margin} />
    ) : (
      <>
        <FlatList
          data={Data.Data}
          renderItem={renderItem}
          ListEmptyComponent={<NotFound text="Requests" />}
          keyExtractor={(e) => e.id}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          contentContainerStyle={{
            paddingBottom: Dimensions.get("window").height * 0.36,
          }}
        />
      </>
    );
  };

  return (
    <SafeArea>
      <Background height={0.25} />
      <View style={styles.MainTop}>
        <Header heading="Requests" />
        <LongButton
          text="Request coins"
          textstyle={styles.ButtonTxt}
          style={styles.Button}
          shadowless
          font={12}
          onPress={() =>
            navigation.navigate("MenuStack", { screen: "RequestCoins" })
          }
        />

        <GetBalance />
      </View>
      <Modals ModalRef={ModalState} approve onHandled={onModalClose} />
      <GetData />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.26,
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
    justifyContent: "center",
  },
  Touchable: {
    alignItems: "center",
    flexDirection: "row",
  },
  SectionImg: {
    resizeMode: "contain",
    width: width * 0.14,
    height: height * 0.05,
    marginLeft: width * 0.05,
  },
  SectionLabel: {
    marginLeft: width * 0.05,
    width: width * 0.6,
    lineHeight: height * 0.025,
  },
  Button: {
    position: "absolute",
    width: width * 0.37,
    height: height * 0.05,
    borderWidth: 2,
    borderColor: Colors.WHITE,
    backgroundColor: Colors.INVISIBLE,
    marginTop: height * 0.085,
    alignSelf: "flex-start",
    marginLeft: width * 0.58,
  },
  ButtonTxt: { color: Colors.WHITE },
});
export default RequestList;
