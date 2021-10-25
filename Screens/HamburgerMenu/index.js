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
  "Dashboard",
  "Leaderboard",
  "Played games",
  "Friends",
  "View profile",
  "My orders",
  "My address",
  "Logout",
];
const HamburgerMenu = ({ props, navigation }) => {
  const [userData, setUserData] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const UserInfo = async () => {
    const userInfo = JSON.parse(await EncryptedStorage.getItem("User"));
    setUserData(userInfo);
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
        console.log(res.data[0]);
      });
  };
  useEffect(() => {
    UserInfo();
    MyFriends();
  }, []);
  return (
    <ScrollView>
      <LinearGradient colors={["#420E92", "#E7003F"]}>
        <View style={{ height: 20 }} />
        <Header back={true} height={20} />
        <View style={styles.aView}>
          <View style={styles.bView}>
            <View style={styles.topView}>
              <ProfilePicture
                picture={userData?.profile_image}
                id={userData?.id}
                name={
                  userData?.first_name?.slice(0, 1) +
                  userData?.last_name?.slice(0, 1)
                }
                style={styles.avatarView}
              />

              <View style={{ width: widthConverter(250), marginLeft: 20 }}>
                <Label
                  font={14}
                  notAlign
                  bold
                  style={{ color: "#FFFFFF", marginTop: 8 }}
                >
                  {userData?.first_name} {userData?.last_name}
                </Label>
                <Label
                  primary
                  notAlign
                  font={14}
                  bold
                  style={{ color: "#FFFFFF", marginTop: 8 }}
                >
                  {userData?.designation}
                  <Label
                    primary
                    font={14}
                    notAlign
                    style={{ color: "#e2acc7" }}
                  >
                    {userData?.company_name ? " at " : null}
                  </Label>
                  {userData?.company_name}
                </Label>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                height: 1,
                width: widthConverter(375),
                backgroundColor: "#72407e",
              }}
            />
            <Text style={[styles.text, { color: "#ffffff", padding:15  }]}>
              My Friends
            </Text>
            <FlatList
              data={friendData}
              horizontal={true}
              renderItem={({ item, index }) => {
                return (
                  <ProfilePicture
                    picture={item?.profile_image}
                    id={item?.id}
                    name={
                      item?.first_name?.slice(0, 1) +
                      item?.last_name?.slice(0, 1)
                    }
                    style={styles.avatarView}
                  />
                );
              }}
            />
            <View style={styles.footer}>
              <Text style={styles.text}>2,034 Friends HC</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("TabsStack", {
                    screen: "Profile",
                    params: {
                      screen: "ProfileScreen",
                      params: { selected: 3 },
                    },
                  })
                }
              >
                <Text style={[styles.text, { color: "#ffff00" }]}>
                  View all Friends
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={data2}
            contentContainerStyle={{
              paddingBottom: height * 0.02,
            }}
            // horizontal={true}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    marginTop: 5,
                    height: 1,
                    width: "100%",
                    backgroundColor: "#994e7c",
                  }}
                />
              );
            }}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width: widthPercentageToDP("90%"),
                    marginTop: 5,
                    marginLeft: 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (item === "Friends") {
                        navigation.navigate("TabsStack", {
                          screen: "Profile",
                          params: {
                            screen: "ProfileScreen",
                            params: { selected: 3 },
                          },
                        });
                      }
                      if (item === "Dashboard") {
                        navigation.navigate("SimpeStackScreen", {
                          screen: "DashBoard",
                        });
                      }
                      if (item === "Leaderboard") {
                        navigation.navigate("SimpeStackScreen", {
                          screen: "LeaderBoard",
                        });
                      }
                      if (item === "View profile") {
                        navigation.navigate("TabsStack", {
                          screen: "Profile",
                          params: {
                            screen: "ProfileScreen",
                            params: { selected: 2 },
                          },
                        });
                      }
                      if (item === "Played games") {
                        navigation.navigate("TabsStack", {
                          screen: "Profile",
                          params: {
                            screen: "ProfileScreen",
                            params: { selected: 1 },
                          },
                        });
                      }
                      if (item === "My orders") {
                        navigation.navigate("Orders");
                      }
                    }}
                  >
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
                      {item}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 20,
  },
  bView: {
    backgroundColor: "rgba(0,0,0,0.4)",
    height: heightPercentageToDP("37%"),
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
    justifyContent: "center",
    width: widthPercentageToDP("100%"),
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topView: {
    width: widthPercentageToDP("100%"),
    justifyContent: "center",
    paddingTop: 15,
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

export default HamburgerMenu;
