import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  I18nManager
} from "react-native";
import Label from "../../Components/Label";
const { width, height } = Dimensions.get("window");
import LinearGradient from "react-native-linear-gradient";
import DropDownPicker from 'react-native-dropdown-picker';
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
import { RFValue } from "react-native-responsive-fontsize";
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';

const index = ({ props, navigation }) => {
  const {t, i18n} = useTranslation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(I18n.locale);
  const [items, setItems] = useState([
    { label: 'AR', value: 'ar' },
    { label: 'EN', value: 'en' }
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState("AED");
  const [items2, setItems2] = useState([
    { label: 'AED', value: 'AED' },
    { label: 'PKR', value: 'PKR' }
  ]);


  const [userData, setUserData] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const { signOut } = React.useContext(AuthContext);
  const UserInfo = async () => {
    const userInfo = JSON.parse(await EncryptedStorage.getItem("User"));
    setUserData(userInfo);
    console.log(userInfo);
  };
  let data2 = [
    t("wallet"),
    t("leaderboard"),
    t("played_games"),
    t("friends"),
    t("my_order"),
    t("view_profile"),
    "Buy Lifes",
    t("refer_&_Earn"),
    t("logout"),
  
  ];
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
  const languageRestart = async(item) => {
  console.log("lang",item.value);
   
    if (item.value === "ar") {
      if (I18nManager.isRTL) {
        I18nManager.forceRTL(false);
      }
    } else {
      if (!I18nManager.isRTL) {
        I18nManager.forceRTL(true);
      }
    }
    RNRestart.Restart();
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
              {t("my_friends")}
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
                  {t("view_all_friends")}
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
              {t("setting")}
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
                    {t("language")}
                  </Text>
                </View>
                <View>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onSelectItem={(item) => {
                      i18n
                      .changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
                      .then(() => {
                        I18nManager.forceRTL(i18n.language === 'ar');
                        RNRestart.Restart();
                      });
                    }}
                    containerStyle={{
                      width: width * 0.25,
                    }}
                    zIndex={2000}
                    textStyle={{
                      fontSize: RFValue(14),
                      fontFamily: "Axiforma-Regular",
                      color: "#ffffff",
                    }}
                    dropDownContainerStyle={{
                      backgroundColor: "#fff",
                      marginTop: -height * 0.02,


                    }}
                    arrowIconStyle={{
                      marginTop: -height * 0.023
                    }}


                    listItemLabelStyle={{
                      color: '#000000',
                      fontFamily: "Axiforma-Regular",

                    }}
                    labelStyle={{
                      fontFamily: "Axiforma-Regular",
                      color: "#ffffff",
                      fontSize: RFValue(13),

                      marginTop: -height * 0.028

                    }}
                    style={[

                      styles.text,
                      {

                        color: "#ffffff",
                        //height: heightPercentageToDP("5%"),
                        width: width * 0.2,

                        backgroundColor: null,
                        borderWidth: 0,
                        marginTop: 5
                      },
                    ]}
                    disableBorderRadius={false}
                  />
                </View>
                {/* <Text
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
                </Text> */}
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
                    {t("curreny")}
                  </Text>
                </View>
                <View>
                  <DropDownPicker
                    open={open2}
                    value={value2}
                    items={items2}
                    setOpen={setOpen2}
                    setValue={setValue2}
                    setItems={setItems2}
                    zIndex={1000}
                    containerStyle={{
                      width: width * 0.25,
                    }}

                    textStyle={{
                      fontSize: RFValue(14),
                      fontFamily: "Axiforma-Regular",
                      color: "#ffffff",
                    }}
                    dropDownContainerStyle={{
                      backgroundColor: "#fff",
                      marginTop: -height * 0.02,


                    }}
                    arrowIconStyle={{
                      bottom: 8
                    }}


                    listItemLabelStyle={{
                      color: '#000000',
                      fontFamily: "Axiforma-Regular",

                    }}
                    labelStyle={{
                      fontFamily: "Axiforma-Regular",
                      color: "#ffffff",
                      fontSize: RFValue(13),
                      height: 22,
                      bottom: 8

                    }}
                    style={[

                      styles.text,
                      {

                        color: "#ffffff",
                        //height: heightPercentageToDP("5%"),
                        width: width * 0.2,

                        backgroundColor: null,
                        borderWidth: 0,
                        marginTop: 5
                      },
                    ]}
                    disableBorderRadius={false}
                  />
                </View>
                {/* <Text
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
                </Text> */}
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
              {t("general")}

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
                  {t("how_it_works")}
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
                  {t("our_products")}
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingBottom: 10 }}>
              <LongButton
                style={styles.Margin}
                textstyle={{ color: "#eb2b5f" }}
                text={t("call_us")}
                font={16}
              />
              <LongButton
                style={styles.Margin}
                textstyle={{ color: "#eb2b5f" }}
                text={t("email_us")}
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
    height: height*0.32,
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
    width: height*0.09,
    height: height*0.09,
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
    fontSize: RFValue(13),
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
    marginTop: 6,
    marginRight: 10
  },
  Margin: {
    height: height * 0.065,
    width: width * 0.36,
    backgroundColor: "#fcd9e2",
    borderRadius: 10
  },
});

export default index;