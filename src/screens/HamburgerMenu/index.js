import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  Image
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LongButton from "../../Components/LongButton";
import { AuthContext } from "../../Components/context";
import I18n from 'react-native-i18n';
I18n.locale="ar";
import { strings} from "../../i18n";
let data2 = [
  strings("hamburger_menu.wallet"),
  strings("hamburger_menu.leaderboard"),
  strings("hamburger_menu.played_games"),
  strings("hamburger_menu.friends"),
  strings("hamburger_menu.my_order"),
  strings("hamburger_menu.view_profile"),
  "Buy Lifes",
  strings("hamburger_menu.refer_&_Earn"),
  strings("hamburger_menu.logout"),
  
];
const index = ({ props, navigation }) => {
  const [userData, setUserData] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const { signOut } = React.useContext(AuthContext);
  const UserInfo = async () => {
    const userInfo = JSON.parse(await EncryptedStorage.getItem("User"));
    setUserData(userInfo);
    console.log(userInfo);
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
                  style={{ color: "#FFFFFF", marginTop: 6 }}
                >
                  {userData?.designation} {"\n"}
                  <Label
                    primary
                    font={14}
                    style={{ color: "#e2acc7" }}
                  >
                    {userData?.company_name ? " at \n" : null}
                  </Label>
                  {userData?.company_name}
                </Label>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                height: 1,
                width: widthConverter(375),
                backgroundColor: "#72407e",
              }}
            />
            <Text style={[styles.text, { color: "#ffffff", padding: 15, paddingTop: 10 }]}>
            {strings("hamburger_menu.my_friends")}
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
              <Text style={styles.text}>{friendData.length} {friendData.length < 2 ? "Friend" : "Freinds"}</Text>
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
                  {strings("hamburger_menu.view_all_friends")}
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

                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (item === "Friends") {
                        navigation.navigate("Friends", {
                          selected: 3 
                        });
                      }
                      if (item === "Wallet") {
                       // navigation.navigate("BottomTabStack"); 
                        navigation.navigate("BottomTabStack", {
                            screen: "WALLET", 
                         
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
                      if (item === "Logout") {
                        signOut()
                      }
                      if (item === "Settings") {
                        navigation.navigate("Settings")
                      }
                      if (item === "Buy Lifes") {
                        navigation.navigate("BuyLife")
                      }
                     
                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        style={styles.iconImage}
                        source={require('../../assets/imgs/wallet.png')}
                      />
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
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <View style={{ width: "93%", alignItems: 'center' }}>

            <Text
              style={[
                styles.text,
                {
                  color: "#ffff00",
                  height: heightPercentageToDP("5%"),
                  width: "93%",
                  fontSize: 22,
                },
              ]}
            >
              {strings("hamburger_menu.setting")}
            </Text>
            <View style={styles.rowView}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <View style={styles.innerRow}>
                  <MaterialIcons name="language" size={23} color="#fff" style={{ marginTop: 6.5, marginRight: 7 }} />
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
                {strings("hamburger_menu.language")}
                  </Text>
                </View>
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
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <View style={styles.innerRow}>
                  <MaterialCommunityIcons name="currency-usd-circle-outline" size={23} color="#fff" style={{ marginTop: 6.5, marginRight: 7 }} />
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
                     {strings("hamburger_menu.curreny")}
                  </Text>
                </View>
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
            <Text
              style={[
                styles.text,
                {
                  color: "#ffff00",
                  height: heightPercentageToDP("5%"),
                  width: "93%",
                  fontSize: 22,
                },
              ]}
            >
              {strings("hamburger_menu.general")}
              
            </Text>
            <View style={styles.rowView}>
              <View style={styles.innerRow}>
                <Ionicons name="information-circle-outline" size={26} color="#fff" style={{ marginTop: 6.5, marginRight: 6 }} />
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
                  {strings("hamburger_menu.how_it_works")}
                </Text>
              </View>
              <View style={styles.innerRow}>
                <Ionicons name="shirt-outline" size={23} color="#fff" style={{ marginTop: 6.5, marginRight: 7 }} />
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
               {strings("hamburger_menu.our_products")}
                </Text>
              </View>
            </View>
     
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: "100%", paddingBottom: 10 }}>
              <AntDesign name="instagram" size={28} color="#fff" />
              <Feather name="facebook" size={28} color="#fff" />
              <FontAwesome name="whatsapp" size={28} color="#fff" />
              <Feather name="linkedin" size={28} color="#fff" />
              <Feather name="twitter" size={28} color="#fff" />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%',paddingBottom:10}}>
              <LongButton
                style={styles.Margin}
                textstyle={{ color: "#eb2b5f" }}
                text={strings("hamburger_menu.call_us")}
                font={16}
              />
              <LongButton
                style={styles.Margin}
                textstyle={{ color: "#eb2b5f" }}
                text={strings("hamburger_menu.email_us")}
                font={16}
              />
            </View>
          </View>
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
    alignItems: 'center',
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
  rowView: {
    width: widthPercentageToDP("90%"),
    // borderWidth:3
    //elevation:3,
    marginBottom: 10,
    // backgroundColor: "rgba(128,0,128,0.5)",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  innerRow: {
    flexDirection: 'row'
  },
  iconImage: {
    width: width * 0.06,
    height: height * 0.04,
    resizeMode: "contain",
    marginTop:6,
    marginRight:10
  },
  Margin: {
    height: height * 0.065,
    width: width * 0.36,
    backgroundColor: "#fcd9e2",
    borderRadius: 10
  },
});

export default index;