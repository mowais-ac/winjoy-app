import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  Text
} from "react-native";
import Header from "../../Components/Header";
import { FanJoyCard, WjBackground } from "../../Components";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import EncryptedStorage from "react-native-encrypted-storage";
import I18n from 'react-native-i18n';
import axios from "axios";
import Config from "react-native-config";
I18n.locale = "ar";
import { strings } from "../../i18n";

const { width, height } = Dimensions.get("window");
const index = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    GetData()
  }, []);
  const GetData = async () => {
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    // alert(13123);
    await axios
      .get(`${Config.API_URL}/funJoy`, requestOptions)
      .then((response) => {
        let res = response.data;
        if (res.status === "success") {

          setData(res.user)
        }

      });
  };


  return (
    <SafeAreaView style={styles.safeStyle}>
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        colors={["#f8d7e8", "#c7dfe8"]}
      >
        <WjBackground
          style={{ height: 155, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}
        />
        <Header style={{ top: 0, position: "absolute", marginTop: 10 }} />

        <View style={{ marginTop: 60, alignItems: 'center', }}>

          <Text style={[styles.headerText]}>{strings("fan_joy.fan_joy")}</Text>
          <Text style={styles.subHeaderText}>{strings("fan_joy.created_by_stars")}</Text>
          <Image
            style={styles.playBtn}
            source={require('../../assets/imgs/playRound.png')}
          />
        </View>
        <View style={{ width: '100%', alignItems: 'center', marginLeft: 5 }}>
          <FlatList
            data={data}
            numColumns={2}
            renderItem={(item) =>
              <FanJoyCard
                name={item.item.first_name + item.item.last_name}
                style={{ marginTop: 15 }}
              />
            }
            //keyExtractor={(e) => e.id.toString()}
            contentContainerStyle={{

              paddingBottom: height * 0.51,
            }}
            keyExtractor={(item) => item.id}
          // refreshControl={
          //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          // }
          />
        </View>

      </LinearGradient>
    </SafeAreaView>
  );
};
export default index;
