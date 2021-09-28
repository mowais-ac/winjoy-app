import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import LongButton from "../Components/LongButton";
import InputField from "../Components/InputField";
import GetModal from "../Components/AddConnectionModal";

import { Colors, Images } from "../Constants/Index";
import Connection from "../Components/Connection";
import Config from "react-native-config";
import EncryptedStorage from "react-native-encrypted-storage";
import Label from "../Components/Label";
import NotFound from "../Components/NotFound";
import { wait } from "../Constants/Functions";

const { width, height } = Dimensions.get("window");

const Connections = ({ route, navigation }) => {
  const OpenAddCon = route.params && route.params.OpenAddCon;
  const [Data, setData] = useState(null);
  const [First, setFirst] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData(null);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const ModalRef = useRef();

  const [Filtered, setFiltered] = useState({});
  const InputRef = useRef();
  useEffect(() => {
    let isActive = true;
    const check = async () => {
      if (Data === null) {
        var Accepted, Requested;
        const Token = await EncryptedStorage.getItem("Token");
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${Token}`,
          },
        };
        await fetch(
          `${Config.API_URL}/accepted-connections/list`,
          requestOptions
        )
          .then(async (response) => response.json())
          .then((res) => {
            if (!isActive) return;
            if (res.status && res.status.toLowerCase() === "success") {
              Accepted = res.data[0];
            } else {
              Alert.alert("Error", res.message);
            }
          });
        await fetch(`${Config.API_URL}/connections/list`, requestOptions)
          .then(async (response) => response.json())
          .then((res) => {
            if (!isActive) return;
            if (res.message === "Connections List") {
              Requested = res.data[1];
            } else {
              Alert.alert("Error", res.message);
            }
          });
        if (!isActive) return;
        setData({ Accepted, Requested });
      }
    };
    check();
    if (OpenAddCon && First && Data !== null) ModalRef.current(true);
    if (Data !== null) setFirst(false);
    return () => (isActive = false);
  });

  const RefreshData = () => {
    setData(null);
  };

  const renderItem = ({ item }) => (
    <Connection
      id={item.id}
      key={item.id}
      style={styles.Margin}
      Button
      Profile={item.profile_image}
      name={`${item.first_name} ${item.last_name}`}
      user={item.user_name}
      navigation={navigation}
    />
  );

  const renderItem2 = ({ item }) => (
    <Connection
      id={item.id}
      key={item.id}
      style={styles.Margin2}
      ReqHandle
      Profile={item.profile_image}
      HandleChange={RefreshData}
      name={`${item.first_name} ${item.last_name}`}
      user={item.user_name}
    />
  );

  const HandleText = () => {
    const t = InputRef.current.getText();
    if (!t || t === "") return setFiltered({});
    var Accepted = Data.Accepted.filter(
      (x) => x.user_name.toLowerCase().indexOf(t.toLowerCase()) !== -1
    );
    var Requested = Data.Requested.filter(
      (x) => x.user_name.toLowerCase().indexOf(t.toLowerCase()) !== -1
    );
    return setFiltered({
      Accepted,
      Requested,
    });
  };

  return (
    <SafeArea>
      <Background height={0.26} />
      <View style={styles.MainTop}>
        <Header heading="Connections" />
        <GetModal ModalRef={ModalRef} />
        {Data !== null && (
          <LongButton
            text="Add"
            textstyle={styles.ButtonTxt}
            style={styles.Add}
            shadowless
            onPress={() => {
              if (Data !== null) ModalRef.current(true);
            }}
          />
        )}
        <InputField
          placeholder="Search your connections"
          NoIcon
          style={styles.Input}
          fieldstyle={styles.SearchInput}
          ref={InputRef}
        />
        <TouchableOpacity style={styles.Search} onPress={HandleText}>
          <Image source={Images.Search} style={styles.SearchImage} />
        </TouchableOpacity>
      </View>

      {Data === null ? (
        <ActivityIndicator color="#000" size="large" />
      ) : (!Data.Requested || Data.Requested.length === 0) &&
        (!Data.Accepted || Data.Accepted.length === 0) ? (
        <ScrollView
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
        >
          <NotFound text="Connections" />
        </ScrollView>
      ) : (
        <>
          {/* {((Filtered.Requested && Filtered.Requested.length >= 1) ||
            (!Filtered.Requested && Data.Requested.length >= 1)) && ( */}
          <Label
            primary
            bold
            headingtype="h5"
            notAlign
            style={styles.PendingHead}
          >
            Pending Connection Requests
          </Label>
          {Data.Requested && Data.Requested.length >= 1 ? (
            <FlatList
              horizontal
              style={styles.Margin}
              refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              }
              data={Filtered.Requested || Data.Requested}
              renderItem={renderItem2}
              contentContainerStyle={{
                paddingRight: width * 0.05,
              }}
            />
          ) : (
            <Label notAlign dark style={styles.NoPending} bold>
              There is no pending connection request
            </Label>
          )}
          <View style={styles.SmallBorder} />
          {Data.Accepted.length >= 1 && (
            <FlatList
              style={styles.MarginFlatList}
              refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              }
              data={Filtered.Accepted || Data.Accepted}
              renderItem={renderItem}
              keyExtractor={(e) => e.id}
              contentContainerStyle={{
                paddingBottom: height * 0.3,
              }}
            />
          )}
          {Data.Accepted.length === 0 && Data.Requested.length === 0}
        </>
      )}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.26,
  },
  Add: {
    position: "absolute",
    width: width * 0.25,
    height: height * 0.05,
    borderWidth: 2,
    borderColor: Colors.WHITE,
    backgroundColor: Colors.INVISIBLE,
    marginTop: height * 0.083,
    alignSelf: "flex-start",
    marginLeft: width * 0.72,
  },
  ButtonTxt: { color: Colors.WHITE },
  Input: {
    height: height * 0.08,
    marginTop: height * 0.016,
  },
  SearchInput: {
    paddingLeft: width * 0.1,
  },
  Search: {
    position: "absolute",
    marginTop: height * 0.17,
    marginLeft: width * 0.8,
  },
  SearchImage: {
    width: width * 0.08,
    height: height * 0.04,
    resizeMode: "contain",
  },
  Margin: {
    marginTop: height * 0.015,
  },
  MarginFlatList: {
    marginTop: height * 0.01,
  },
  PendingHead: {
    marginTop: height * 0.01,
    width: width * 0.9,
    alignSelf: "center",
  },
  Margin2: { marginLeft: width * 0.04 },
  SmallBorder: {
    width: width * 0.2,
    height: 2,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: "center",
    marginTop: height * 0.03,
  },
  NoPending: {
    marginTop: height * 0.02,
    marginLeft: width * 0.05,
  },
});
export default Connections;
