import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  Text,
  ScrollView
} from "react-native";
import Header from "../../Components/Header";
import { ExperienceCard, FanJoyCard, TrendingCards, WjBackground } from "../../Components";
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
        console.log("res",res);
        let res = response.data;
        if (res.status === "success") {

          setData(res.user)
        }

      });
  };


  return (
    <SafeAreaView style={styles.safeStyle}>
      <ScrollView>
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        colors={["#f8d7e8", "#c7dfe8"]}
      >
        <WjBackground
          style={{ height: 155, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}
        />
        <Header style={{ top: 0, position: "absolute", marginTop: 10 }} />

        <View style={{ marginTop: 55, alignItems: 'center', }}>

          <Text style={[styles.headerText]}>{strings("fan_joy.fan_joy")}</Text>
          <Text style={styles.subHeaderText}>{strings("fan_joy.created_by_stars")}</Text>
          <Image
            style={styles.playBtn}
            source={require('../../assets/imgs/playRound.png')}
          />
        </View>
        <View style={{ width: '100%', alignItems: 'center', marginLeft: 5 }}>
          <Text style={{ fontFamily: 'Axiforma Bold', color: '#eb3d6e', width: '100%' }}>
            Creators
          </Text>
          <FlatList
            data={[1,2,3,4]}
            horizontal={true}
            renderItem={({ item }) =>
              <FanJoyCard
                onPress={() => navigation.navigate("CreatorsPage")}
                name={item.user_name}
                style={{ width: 150, marginRight: 20, height: 180 }}
              />
            }
            //keyExtractor={(e) => e.id.toString()}
            contentContainerStyle={{
              marginTop: 10,
            }}
            // refreshControl={
            //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            // }
            keyExtractor={(item) => item.id}
          />
        </View>
        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          colors={["#420E92", "#E7003F"]}
          style={{ width: '100%', height: height * 0.38, justifyContent: 'center', paddingLeft: 5, marginTop: 10 }}
        >
          <View style={{ width: "95%", flexDirection: 'row', justifyContent: 'space-between',marginTop:14 }}>
            <View>
              <Text style={{ color: '#fff', fontSize: 14, fontFamily: "Axiforma Bold", width: '100%' }}>Trending Products</Text>
            </View>

          </View>

          <FlatList
            data={[1,2,3,4]}
            horizontal={true}
            renderItem={({ item }) =>
            <TrendingCards
            onPress={() => navigation.navigate("AllCreatorsPage")}
            name={item.user_name}
            style={{ width: 150, height: height*0.33, marginRight: 20,}}
            imageStyle={{width: 150, height: height*0.25,borderRadius: 15}}
          />
            }
            //keyExtractor={(e) => e.id.toString()}
            contentContainerStyle={{
              marginTop: 10,
            }}
            // refreshControl={
            //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            // }
            keyExtractor={(item) => item.id}
          />
        </LinearGradient>
        <View style={{ width: '100%', alignItems: 'center', marginLeft: 5,marginTop:15,paddingBottom:15 }}>
          <Text style={{ fontFamily: 'Axiforma Bold', color: '#eb3d6e', width: '100%' }}>
            Buy experience with celebrities
          </Text>
          <FlatList
            data={[1,2,3,4]}
            horizontal={true}
            renderItem={({ item }) =>
              <ExperienceCard
                onPress={() => navigation.navigate("AllCreatorsPage")}
                heading={"Q/A"}
                style={{ width: 170, marginRight: 20, height: 190 }}
              />
            }
            //keyExtractor={(e) => e.id.toString()}
            contentContainerStyle={{
              marginTop: 10,
            }}
            // refreshControl={
            //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            // }
            keyExtractor={(item) => item.id}
          />
        </View>
       
      </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
export default index;
