import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import Label from "../Components/Label";
import LongButton from "../Components/LongButton";
import InputField from "../Components/InputField";

import {
  GetCoins,
  GetCoinType,
  GetMaxCoins,
  JSONtoForm,
} from "../Constants/Functions";
import { Colors } from "../Constants/Index";
import Section from "../Components/Section";
import Connection from "../Components/Connection";
import Modals from "../Components/Modals";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import CoinsButtons from "../Components/CoinsButtons";

const { width, height } = Dimensions.get("window");

const RequestCoins = ({ route, navigation }) => {
  const ButtonRef = useRef();
  const InputRef = useRef();
  const TypeRef = useRef();
  const ModalState = useRef();
  const UpdateRef = useRef();
  const [Data, setData] = useState(null);
  const con_user = route.params && route.params.con_user;

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
        const URL =
          Config.API_URL +
          (con_user
            ? `/connections/search?user_name=${con_user}`
            : `/accepted-connections/list`);

        await fetch(URL, requestOptions)
          .then(async (response) => response.json())
          .then((res) => {
            if (!isActive) return;
            if (res.status && res.status.toLowerCase() === "success") {
              if (res.message === "Connections List") {
                if (JSON.stringify(Data) !== JSON.stringify(res.data[0])) {
                  setData({
                    Data: res.data[0],
                  });
                }
              } else {
                if (JSON.stringify(Data) !== JSON.stringify(res.data)) {
                  setData({ Data: res.data });
                }
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

  const HandleClick = async (e) => {
    const coins = InputRef.current.getText();
    if (coins !== null && coins !== "" && !ButtonRef.current.GetActivity()) {
      const body = JSONtoForm({
        request_amount: coins,
        request_to: e || Data.Data[0].id,
        coin_type: "gold",
        // coin_type: GetCoinType(TypeRef.current),
      });
      const Token = await EncryptedStorage.getItem("Token");
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body,
      };
      ButtonRef.current.SetActivity(true, "WHITE");
      await fetch(`${Config.API_URL}/sent/request/coins`, requestOptions)
        .then(async (response) => response.json())
        .then((res) => {
          if (res.status && res.status.toLowerCase() === "success") {
            ModalState.current(true);
          } else {
            Alert.alert("Error", res.message);
            ButtonRef.current.SetActivity(false);
          }
        });
    }
  };

  const GetCon = () => {
    const [Changed, setChanged] = useState(null);
    return (
      <>
        {Data.Data.length === 0 ? (
          <Connection
            style={styles.Margin}
            OnlyChangeBtn
            changeable
            changeData={(e) => setChanged(e)}
          />
        ) : (
          <Connection
            id={Data.Data[0].id}
            style={styles.Margin}
            Profile={Data.Data[0].profile_image}
            name={`${Data.Data[0].first_name} ${Data.Data[0].last_name}`}
            user={Data.Data[0].user_name}
            changeable
            OnlyChangeBtn={Changed === null && !con_user}
            changeData={(e) => setChanged(e)}
          />
        )}
        <Label dark style={[styles.Margin, styles.Privacy]} light font={10}>
          By submitting the form you agree to the{" "}
          <Label primary notAlign underline font={10}>
            Terms and Conditions
          </Label>
        </Label>
        <LongButton
          gradient={Changed !== null || con_user}
          text="Proceed"
          style={styles.Margin}
          ref={ButtonRef}
          MutedBtn={Changed === null && !con_user}
          onPress={() => {
            if (Changed !== null || con_user) HandleClick(Changed);
          }}
          textstyle={Changed === null && !con_user && styles.MutedBtnText}
        />
      </>
    );
  };

  const ShowBalance = () => {
    const [Remain, setRemain] = useState(TypeRef.current);

    const UpdateCoins = (e) => {
      setRemain(e);
    };

    useEffect(() => {
      UpdateRef.current = UpdateCoins;
    });

    return (
      Data && (
        <Label bold notAlign font={26} style={styles.Info}>
          {GetCoins(Coins, Remain)[1]} {GetCoins(Coins, Remain)[0]}
        </Label>
      )
    );
  };

  return (
    <ScrollView>
      <SafeArea>
        <Background height={0.27} green />
        <View style={styles.MainTop}>
          <Header heading="Request" />
          <Label
            notAlign
            style={[styles.Info, styles.Balance]}
            headingtype="h5"
          >
            Balance
          </Label>
          <Label bold notAlign font={28} style={styles.Info}>
            <ShowBalance />
          </Label>
        </View>
        {Data === null ? (
          <ActivityIndicator size="large" color={Colors.BLACK} />
        ) : (
          <>
            <Modals
              ModalRef={ModalState}
              BothClose
              Request
              onClose={() =>
                navigation.replace("TabsStack", { screen: "Transactions" })
              }
            />
            {/* <Label dark>Which type of coins you want to request?</Label>
            <CoinsButtons
              TypeRef={TypeRef}
              UpdateRef={UpdateRef}
              id={GetMaxCoins(Coins.Balance).id}
              useEffect={(CoinType) => {
                UpdateRef.current(CoinType);
              }}
            /> */}
            <Label dark style={styles.MarginLabel}>
              I want to request
            </Label>
            <Section style={styles.Section}>
              <Label primary bold2 style={styles.STMargin}>
                Coins
              </Label>
              <InputField
                style={styles.Field}
                fieldstyle={styles.FieldStyle}
                value={"100"}
                NoIcon
                keyboardType="numeric"
                textAlign={"center"}
                font={20}
                ref={InputRef}
              />
            </Section>
            <Label dark style={styles.Margin}>
              from
            </Label>
            <GetCon />
            <View style={{ marginTop: height * 0.03 }} />
          </>
        )}
      </SafeArea>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.3,
  },
  Info: {
    marginLeft: width * 0.05,
  },
  Balance: {
    marginTop: height * 0.01,
  },
  Field: {
    backgroundColor: Colors.WHITE,
    height: height * 0.04,
    marginTop: height * 0.005,
  },
  FieldStyle: {
    color: Colors.BLACK,
    fontFamily: "Axiforma SemiBold",
  },
  Margin: { marginTop: height * 0.02 },
  LessMargin: { marginTop: height * 0.005 },
  Section: {
    marginTop: height * 0.015,
    height: height * 0.11,
  },
  STMargin: {
    marginTop: height * 0.02,
  },
  Privacy: {
    lineHeight: height * 0.025,
    width: width * 0.5,
  },
  MutedBtnText: {
    color: Colors.MEDIUM_MUTED,
  },
  ButtonsView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: width * 0.95,
    alignSelf: "center",
    marginTop: height * 0.02,
  },
  TypeBtn: { width: width * 0.3 },
  MarginLabel: {
    marginTop: height * 0.03,
  },
});
export default RequestCoins;
