import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import Label from "../../Components/Label";
const { width, height } = Dimensions.get("window");
import LinearGradient from "react-native-linear-gradient";
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from "../../Components/Helpers/Responsive";
import Header from "../../Components/Header";
import { Avatar } from "react-native-elements";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import axios from "axios";
import ProfilePicture from "../../Components/ProfilePicture";

let data2 = [
  "Language",
  "Currency",
];
const index = ({ props, navigation }) => {
  const [userData, setUserData] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const UserInfo = async () => {
    const userInfo = JSON.parse(await EncryptedStorage.getItem("User"));
    setUserData(userInfo);
    console.log(userInfo);
  };
  const HandleLogout = async () => {
    await EncryptedStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "Splash" }],
    });
  };
  const MyFriends = async () => {
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
      .get(`${Config.API_URL}/accepted-connections/list`, requestOptions)
      .then((response) => {
        let res = response.data;
        setFriendData(res.data[0]);
      });
  };

  useEffect(() => {
    UserInfo();
    MyFriends();
  }, []);
  return (
    <LinearGradient
      colors={["#420E92", "#E7003F"]}
      style={{ height: '100%' }}
    >
      <View style={{ height: 20 }} />
      <Header back={true} height={20} />
      <View style={styles.aView}>

        <View
          style={styles.tabsView}
        >
          <Text
            style={[
              styles.text,
              {
                color: "#ffffff",
                height: heightPercentageToDP("5%"),
                top: 10,
                fontSize:22
              },
            ]}
          >
            Settings
          </Text>
          <View style={styles.rowView}>
            <Text
              style={[
                styles.text,
                {
                  color: "#ffffff",
                  height: heightPercentageToDP("5%"),
                  top: 10,
                },
              ]}
            >
              Language
            </Text>
            <Text
              style={[
                styles.text,
                {
                  color: "#ffffff",
                  height: heightPercentageToDP("5%"),
                  top: 10,
                },
              ]}
            >
              English
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text
              style={[
                styles.text,
                {
                  color: "#ffffff",
                  height: heightPercentageToDP("5%"),
                  top: 10,
                },
              ]}
            >
              Currency
            </Text>
            <Text
              style={[
                styles.text,
                {
                  color: "#ffffff",
                  height: heightPercentageToDP("5%"),
                  top: 10,
                },
              ]}
            >
              AED
            </Text>
          </View>
        </View>


      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  tabsView: {
    width: widthPercentageToDP("90%"),
    marginTop: 5,
    marginLeft: 15,
    alignItems:'center'
  },
  rowView:{ 
    flexDirection: 'row', justifyContent: 'space-between',width: widthPercentageToDP("90%"), 
  },
  mainView: {
    height: 800,
    width: width,
    alignItems: "center",
  },
  newGameView: {
    marginTop: 10,
    width: width - 25,
    height: height - 600,
    justifyContent: "center",
    borderRadius: 20,
  },
  btnView: {
    marginTop: 10,
    backgroundColor: "#ffffff",
    width: width - 200,
    height: height - 665,
    justifyContent: "center",
    borderRadius: 30,
  },

  aView: {
    // alignItems: 'center',
    width: widthPercentageToDP("100%"),
    marginTop: 10,
  },
  bView: {
    backgroundColor: "rgba(0,0,0,0.4)",
    height: heightPercentageToDP("34.5%"),
  },
  flatListHeader: {
    marginTop: heightConverter(20),
    width: widthPercentageToDP("100%"),
    backgroundColor: "rgba(0,0,0,0.4)",
    height: heightConverter(65),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  footer: {
    height: heightConverter(40),
    width: widthPercentageToDP("100%"),
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topView: {
    width: widthPercentageToDP("100%"),
    paddingTop: 10,
    flexDirection: "row",
  },
  avatarView: {
    width: widthConverter(65),
    height: widthConverter(65),
    borderRadius: heightConverter(65),
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ffffff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    marginLeft: 15,
  },
  text: {
    fontFamily: "Axiforma-Regular",
    color: "#ffffff",
    fontSize: 14,
  },
});

export default index;