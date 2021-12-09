import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import Label from "../Components/Label";
import LongButton from "../Components/LongButton";
import InputField from "../Components/InputField";

import {
  FormatNumber,
  GetCoins,
  GetCoinType,
  GetMaxCoins,
  JSONtoForm,
  RemoveFormat,
} from "../Constants/Functions";
import { Colors } from "../Constants/Index";
import Section from "../Components/Section";
import Connection from "../Components/Connection";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import NotFound from "../Components/NotFound";
import LabelButton from "../Components/LabelButton";
import LowBalance from "../Components/LowBalance";
import CoinsButtons from "../Components/CoinsButtons";
import { useSelector } from "react-redux";
import GoBack from "../Components/GoBack";

const { width, height } = Dimensions.get("window");

const TransferCoins = ({ route, navigation }) => {
  const ButtonRef = useRef();
  const InputRef = useRef();
  const TypeRef = useRef();
  const ConRef = useRef();
  const UpdateRef = useRef();
  const UpdateRef2 = useRef();
  const ProceedRef = useRef();
  const MainRef = useRef();
  const [Data, setData] = useState(null);
  const con_user = route.params && route.params.con_user;

  const UserCoins = useSelector((state) => state.Coins);

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
                if (JSON.stringify(Data) !== JSON.stringify(res.data[0][0])) {
                  setData({
                    Coins: UserCoins,
                    Data: res.data[0] || null,
                  });
                }
              } else {
                if (JSON.stringify(Data) !== JSON.stringify(res.data[0])) {
                  setData({ Coins: UserCoins, Data: res.data });
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

  const HandleClick = async (e = null) => {
    const coins = InputRef.current
      ? InputRef.current.getText().replace(/[^0-9]/g, "")
      : null;
    if (coins !== null && coins !== "" && !ButtonRef.current.GetActivity()) {
      ButtonRef.current.SetActivity(true, "WHITE");
      const Token = await EncryptedStorage.getItem("Token");
      const body = JSONtoForm({
        transfer_amount: coins,
        transfer_to: e || (Data.Data && Data.Data[0].id),
        coin_type: GetCoinType(TypeRef.current),
      });
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body,
      };
      await fetch(`${Config.API_URL}/details/verify`, requestOptions)
        .then(async (response) => response.json())
        .then((res) => {
          if (res.status && res.status.toLowerCase() === "success") {
            navigation.navigate("TransferConfirm", { details: res.data[0] });
            ButtonRef.current.SetActivity(false);
          } else {
            Alert.alert("Error", res.message);
            ButtonRef.current.SetActivity(false);
          }
        });
    }
  };

  const RemainingLabelHeader = () => {
    const [Remain, setRemain] = useState({
      CoinsType: TypeRef.current,
      Coins: 0,
    });

    const UpdateCoinType = (e) => {
      setRemain({ ...Remain, CoinsType: e });
    };

    const UpdateCoins = (e) => {
      const Coins = +e.replace(/[^0-9]/g, "");
      setRemain({ ...Remain, Coins });
    };

    useEffect(() => {
      UpdateRef.current = { UpdateCoinType, UpdateCoins };
      const Coins = InputRef.current ? InputRef.current.getText() : 0;
      const data = { Coins, CoinsType: TypeRef.current };
      if (JSON.stringify(data) !== JSON.stringify(Remain)) setRemain(data);

      if (MainRef.current) {
        const { Reload, Disable, setDisable } = MainRef.current;
        if (GetCoins(Data.Coins, Remain.CoinsType || TypeRef.CoinType)[1] < 1) {
          {
            if (Disable.isDisabled !== true)
              setDisable({
                ...Disable,
                con: ConRef.current,
                amount: InputRef.current ? InputRef.current.getText() : "0",
                isDisabled: true,
              });
            else Reload();
          }
        } else {
          if (Disable.isDisabled !== false)
            setDisable({ ...Disable, isDisabled: false });
        }
      }
    });

    const arr = GetCoins(Data.Coins, Remain.CoinsType || TypeRef.CoinType);
    const Coins = arr[1];
    const CoinsType = arr[0];

    return (
      Data && (
        <Label
          bold
          notAlign
          font={26}
          style={styles.Info}
          text={` ${Coins} ${CoinsType}`}
        />
      )
    );
  };
  const RemainingLabelBottom = () => {
    const [Remain, setRemain] = useState({
      CoinsType: TypeRef.current,
      Coins: 0,
    });

    const UpdateCoinType = (e) => {
      setRemain({ ...Remain, CoinsType: e });
    };

    const UpdateCoins = (e) => {
      const Coins = +e.replace(/[^0-9]/g, "");
      setRemain({ ...Remain, Coins });
    };

    const GetRemain = () => {
      const arr = GetCoins(Data.Coins, Remain.CoinsType || TypeRef.current);
      const Coins = arr[1];
      return Coins - Remain.Coins;
    };

    useEffect(() => {
      UpdateRef2.current = { UpdateCoinType, UpdateCoins, GetRemain };
      const Coins = InputRef.current.getText();
      const data = { Coins, CoinsType: TypeRef.current };
      if (JSON.stringify(data) !== JSON.stringify(Remain)) setRemain(data);
      if (ProceedRef.current)
        ProceedRef.current({ IsRemainingZero: GetRemain() < 0 });
    });

    const arr = GetCoins(Data.Coins, Remain.CoinsType || TypeRef.CoinType);
    const Coins = arr[1];
    const CoinsType = arr[0];

    return (
      Data && (
        <Label dark style={styles.Margin}>
          {Coins - Remain.Coins < 0 ? (
            <>You dont have enough balance</>
          ) : (
            <>
              Your remaining balance will be
              <Label
                dark
                primary
                bold
                text={` ${FormatNumber(
                  RemoveFormat(Coins) - Remain.Coins
                )} ${CoinsType}`}
              />
            </>
          )}
        </Label>
      )
    );
  };

  const GetProceedBtn = (props) => {
    const [Data, setData] = useState({
      Changed: null,
      IsRemainingZero: false,
    });

    useEffect(() => {
      if (props.BtnRef)
        props.BtnRef.current = (e) => setData({ ...Data, ...e });
    });
    return (
      <LongButton
        gradient={(Data.Changed !== null || con_user) && !Data.IsRemainingZero}
        text="Proceed"
        style={styles.Margin}
        ref={ButtonRef}
        MutedBtn={(Data.Changed === null && !con_user) || Data.IsRemainingZero}
        onPress={() => {
          if ((Data.Changed !== null || con_user) && !Data.IsRemainingZero)
            HandleClick(Data.Changed);
        }}
        textstyle={
          ((Data.Changed === null && !con_user) || Data.IsRemainingZero) &&
          styles.MutedBtnText
        }
      />
    );
  };

  const GetCon = (props) => {
    const [Changed, setChanged] = useState(
      props.ReceivedCon || {
        e: null,
        idx: 0,
      }
    );

    useEffect(() => {
      if (props.ConRef) props.ConRef.current = Changed;
      if (ProceedRef.current) ProceedRef.current({ Changed: Changed.e });
    });
    return (
      Data.Data && (
        <>
          {Data.Data.length === 0 ? (
            <Connection
              style={styles.Margin}
              changeable
              OnlyChangeBtn
              changeData={(e, idx) => setChanged({ e, idx })}
            />
          ) : (
            <Connection
              id={Data.Data[0].id}
              style={styles.Margin}
              Profile={Data.Data[0].profile_image}
              name={`${Data.Data[0].first_name} ${Data.Data[0].last_name}`}
              user={Data.Data[0].user_name}
              changeable
              OnlyChangeBtn={Changed.e === null && !con_user}
              changeData={(e, idx) => setChanged({ e, idx })}
            />
          )}
          <RemainingLabelBottom />
          <Label dark style={[styles.Margin, styles.Privacy]} light font={10}>
            By submitting the form you agree to the{" "}
            <Label primary notAlign underline font={10}>
              Terms and Conditions
            </Label>
          </Label>
          <GetProceedBtn BtnRef={ProceedRef} />
        </>
      )
    );
  };

  const MainSection = (props) => {
    const [Disable, setDisable] = useState({
      isDisabled: false,
      con: -1,
      amount: null,
    });
    const [Refresh, setRefresh] = useState(0);

    useEffect(() => {
      if (props.MainRef)
        props.MainRef.current = {
          Disable,
          setDisable,
          Reload: () => setRefresh(Refresh + 1),
        };
    });
    return (
      <>
        {Disable.isDisabled ? (
          <View style={styles.DisabledSection}>
            <Label dark style={styles.NoBalanceMsg} notAlign primary bold>
              You do not have sufficient {GetCoinType(TypeRef.current)} coins to
              proceed.
            </Label>
            {/* <LowBalance CoinType={TypeRef.current} style={styles.LowBalance} /> */}
            <LongButton
              gradient
              text="Buy Coins"
              onPress={() =>
                navigation.navigate("BuyCoins", {
                  ReceivedId: TypeRef.current,
                })
              }
              style={styles.BuyCoinsBtn}
            />
          </View>
        ) : (
          <>
            <Label dark style={styles.MarginLabel}>
              {" "}
              I want to transfer
            </Label>
            <Section style={styles.Section}>
              <Label primary bold2 style={styles.STMargin}>
                Coins
              </Label>
              <InputField
                style={styles.Field}
                fieldstyle={styles.FieldStyle}
                value={Disable.amount || "100"}
                NoIcon
                keyboardType="numeric"
                textAlign={"center"}
                font={20}
                ref={InputRef}
                onEdit={(e) => {
                  UpdateRef.current && UpdateRef.current.UpdateCoins(e);
                  UpdateRef2.current && UpdateRef2.current.UpdateCoins(e);
                }}
              />
            </Section>
            <Label dark style={styles.Margin}>
              to
            </Label>
            <GetCon
              ReceivedCon={Disable.con !== -1 ? Disable.con : null}
              ConRef={ConRef}
            />
          </>
        )}
      </>
    );
  };

  return (
    <ScrollView>
      <SafeArea>
        <Background height={0.27} />
        <View style={styles.MainTop}>
          <Header heading="Transfer" />
          <Label notAlign style={[styles.Info, styles.Coins]} headingtype="h5">
            Coins
          </Label>
          {Data !== null && <RemainingLabelHeader />}
        </View>
        {Data === null ? (
          <ActivityIndicator size="large" color={Colors.BLACK} />
        ) : !Data.Data.length === 0 ? (
          <NotFound
            text="connection"
            desc="Sorry, you don't have any connection to send coins"
            con
          />
        ) : (
          <>
            {/* <Label dark>Which type of coins you want to transfer?</Label>
            <CoinsButtons
              TypeRef={TypeRef}
              id={GetMaxCoins(Data.Coins.Balance).id}
              useEffect={(CoinType) => {
                if (UpdateRef.current)
                  UpdateRef.current.UpdateCoinType(CoinType);
                if (UpdateRef2.current)
                  UpdateRef2.current.UpdateCoinType(CoinType);
              }}
            /> */}
            <MainSection MainRef={MainRef} />
            <GoBack style={styles.MarginLess} />
          </>
        )}
        <View style={{ marginTop: height * 0.03 }} />
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
  Coins: {
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
  ButtonsView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: width * 0.95,
    alignSelf: "center",
    marginTop: height * 0.02,
  },
  TypeBtn: { width: width * 0.3 },
  MutedBtnText: {
    color: Colors.MEDIUM_MUTED,
  },
  MarginLabel: {
    marginTop: height * 0.03,
  },
  MarginLess: {
    marginTop: height * 0.01,
  },
  DisabledSection: {
    marginTop: height * 0.03,
  },
  NoBalanceMsg: {
    width: width * 0.9,
    alignSelf: "center",
  },
  LowBalance: {
    marginTop: height * 0.02,
  },
  BuyCoinsBtn: {
    marginTop: height * 0.03,
  },
});
export default TransferCoins;
