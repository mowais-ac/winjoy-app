import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  Linking,
  Alert
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
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import { WjBackground } from "../../Components";
import SelectLanguageModal from "../../Components/SelectLanguageModal";
import SelectCurrencyModal from "../../Components/SelectCurrencyModal";
import { connect, useDispatch, useSelector } from "react-redux";
const index = ({ props, navigation }) => {
  const userData = useSelector(state => state.app.userData);
  const { t, i18n } = useTranslation();
  const [headerValue, setHeaderValue] = useState(0);
  const ModalStateLanguage = useRef();
  const ModalStateCurrency = useRef();
  const [friendData, setFriendData] = useState([]);
  const { signOut } = React.useContext(AuthContext);

  let data2 = [
    {
      name: t("wallet"),
      icon: require('../../assets/imgs/humburgerIcons/wallet.png')
    },
    {
      name: t("played_games"),
      icon: require('../../assets/imgs/humburgerIcons/playedGames.png')

    },
    {
      name: t("my_order"),
      icon: require('../../assets/imgs/humburgerIcons/myOrders.png')

    },
    {
      name: t("leaderboard"),
      icon: require('../../assets/imgs/humburgerIcons/leaderBoard.png')

    },
    {
      name: t("Buy Lives"),
      icon: require('../../assets/imgs/humburgerIcons/buyLives.png')

    },
    {
      name: t("refer_&_Earn"),
      icon: require('../../assets/imgs/humburgerIcons/reffer.png')

    },
    {
      name: t("view_profile"),
      icon: require('../../assets/imgs/humburgerIcons/viewProfile.png')

    },
    {
      name: t("friends"),
      icon: require('../../assets/imgs/humburgerIcons/friends.png')

    },
    {
      name: t("logout"),
      icon: require('../../assets/imgs/humburgerIcons/logout.png')

    },
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
  useEffect(() => {
    MyFriends();
  }, []);
  const OpenWhatsApp = () => {
    Linking.openURL(
      'http://api.whatsapp.com/send?phone=971501235240'
    );
  };
  const OpenInsta = () => {
    let appUrl = "https://www.instagram.com/winjoyae?utm_medium=copy_link";
    Linking.openURL(appUrl).then(supported => {
      if (!supported) {
        alert("not supported")
      } else {
        return Linking.openURL(appUrl);
      }
    }).catch(err => {
      console.error(err);
    });
  };
  const OpenFB = () => {
    let appUrl = "https://www.facebook.com/winjoyae/";
    Linking.openURL(appUrl).then(supported => {
      if (!supported) {
        alert("not supported")
      } else {
        return Linking.openURL(appUrl);
      }
    }).catch(err => {
      console.error(err);
    });
  };

  return (

    <View style={{ backgroundColor: '#ffffff' }}>
      <Header
        noBell={true}
        back={true}
        style={{
          position: 'absolute',
          zIndex: 1000,
          height: height * 0.06,
          backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
          width: '100%',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          paddingTop: height * 0.017,
        }} />
      <ScrollView
        onScroll={(e) => {
          setHeaderValue(e.nativeEvent.contentOffset.y)
        }}
      >
        <WjBackground
          style={{ height: height * 0.39, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}
        />
        <View style={styles.aView}>
          <View style={styles.bView}>
            <View style={[styles.topView]}>
              <ProfilePicture
                picture={userData?.profile_image}
                id={userData?.id}
                name={
                  userData?.first_name?.slice(0, 1) +
                  userData?.last_name?.slice(0, 1)
                }
                style={styles.avatarView}
              />

              <View style={{ width: widthConverter(250), marginLeft: 20, justifyContent: 'center', }}>
                <Label
                  font={14}
                  notAlign
                  bold
                  style={{ color: "#FFFFFF", }}
                >
                  {userData?.first_name?.charAt(0)?.toUpperCase() + userData?.first_name?.slice(1)} {userData?.last_name?.charAt(0)?.toUpperCase() + userData?.last_name?.slice(1)}
                </Label>
                <Label
                  primary
                  notAlign
                  font={14}
                  bold
                  style={{ color: "#FFFFFF", }}
                >
                  {userData?.designation}
                  {userData?.company_name ? (
                    <Label
                      primary
                      font={14}
                      style={{ color: "#e2acc7" }}
                    >
                      {' '}at
                    </Label>
                  ) : null}

                  {' '}{userData?.company_name}
                </Label>
              </View>
            </View>
            <View
              style={{
                marginTop: height * 0.012,
                height: 1,
                width: widthConverter(375),
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
            />
            <Text style={[styles.text, { color: "#ffffff", paddingLeft: 15, paddingTop: height * 0.01, paddingBottom: 2, }]}>
              {t("my_friends")}
            </Text>
            <View style={{ height: height * 0.115, marginTop: height * 0.01 }}>
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
            </View>
            <View style={styles.footer}>
              <Text style={[styles.text, { color: '#ffffff' }]}>{friendData?.length} {friendData?.length < 2 ? "Friend" : "Freinds"}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Profile", {
                    selected: 3
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
                    backgroundColor: "#E6DFEE",
                  }}
                />
              );
            }}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width: width,
                    marginTop: 5,

                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (item.name === "Friends") {
                        navigation.navigate("Profile", {
                          selected: 3
                        });
                      }
                      if (item.name === "Wallet") {
                        // navigation.navigate("BottomTabStack"); 
                        navigation.navigate("BottomTabStack", {
                          screen: "WALLET",
                        });
                      }
                      if (item.name === "Leaderboard") {
                        navigation.navigate("LeaderBoard");
                      }
                      if (item.name === "View profile") {
                        navigation.navigate("Profile", {
                          selected: 2
                        });
                      }
                      if (item.name === "Played games") {
                        navigation.navigate("Profile", {
                          selected: 1
                        });
                      }
                      if (item.name === "My order") {
                        navigation.navigate("Orders");
                      }
                      if (item.name === "Logout") {
                        signOut()
                      }

                      if (item.name === "Buy Lives") {
                        navigation.navigate("BuyLife")
                      }
                      if (item.name === t("refer_&_Earn")) {
                        navigation.navigate("RefferAndEarn")
                      }


                    }}
                  >
                    <View style={{ flexDirection: 'row', marginLeft: width * 0.05 }}>
                      <Image
                        style={styles.iconImage}
                        source={item?.icon}
                        resizeMode='center'
                      />
                      <Text
                        style={[
                          styles.text,
                          {
                            color: "#0B2142",
                            height: heightPercentageToDP("5%"),
                            top: 10,
                          },
                        ]}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          {/* <View
            style={{
              height: 1,
              width: width,
              backgroundColor: "#E6DFEE",
            }}
          /> */}
          <View style={{ width: "95%", alignItems: 'center', marginTop: 10 }}>

            {/* <Text
              style={[
                styles.text,
                {
                  color: "#E7003F",
                  height: heightPercentageToDP("5%"),
                  width: "93%",
                  fontSize: RFValue(16),
                  fontFamily: 'Axiforma-SemiBold'
                },
              ]}
            >
              {t("setting")}
            </Text> */}
            {/* 
            <View style={styles.rowView}>

              <TouchableOpacity
                onPress={() => { ModalStateLanguage.current(true) }}
              >
                <View style={styles.twoBtnView}>
                  <Text style={[styles.text, { color: '#E9E3F0' }]}>
                    Language:{' '}
                    <Text style={styles.text}>
                      {i18n.language.toUpperCase()}
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { ModalStateCurrency.current(true) }}
              >
                <View style={styles.twoBtnView}>
                  <Text style={[styles.text, { color: '#E9E3F0' }]}>
                    Currency:{' '}
                    <Text style={styles.text}>
                      AED
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View> */}
            <View
              style={{
                // marginTop: height * 0.001,
                height: 1,
                width: width,
                backgroundColor: "#E6DFEE",
              }}
            />


            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: "100%", marginTop: height * 0.001 }}>
              <TouchableOpacity onPress={() => OpenInsta()}>
                <Image
                  style={styles.bottomImage}
                  source={require('../../assets/imgs/humburgerIcons/insta.png')}
                  resizeMode='center'
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => OpenFB()}>
                <Image
                  style={styles.bottomImage}
                  source={require('../../assets/imgs/humburgerIcons/faceBook.png')}
                  resizeMode='center'
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => OpenWhatsApp()}>
                <Image
                  style={styles.bottomImage}
                  source={require('../../assets/imgs/humburgerIcons/whatsApp.png')}
                  resizeMode='center'
                />
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => openLinkedIn()}>
              <Image
                style={styles.bottomImage}
                source={require('../../assets/imgs/humburgerIcons/linkedIn.png')}
                resizeMode='center'
              />
               </TouchableOpacity>
              <Image
                style={styles.bottomImage}
                source={require('../../assets/imgs/humburgerIcons/twiter.png')}
                resizeMode='center'
              /> */}
            </View>
            <View
              style={{
                marginTop: height * 0.001,
                height: 1,
                width: width,
                backgroundColor: "#E6DFEE",
              }}
            />

            <View style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              width: width,
              height: height * 0.15,
              marginTop: 5
            }}>
              <Text
                style={[
                  styles.text,
                  {
                    color: "#E7003F",
                    width: width,
                    fontSize: RFValue(16),
                    fontFamily: 'Axiforma-SemiBold',
                    textAlign: 'center',
                  },
                ]}
              >
                Need Help?
              </Text>
              <View style={{
                width: width * 0.9,
                height: height * 0.058,
                borderWidth: 1,
                borderColor: '#E9E3F0',
                borderRadius: height * 0.07,
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: -10

              }}>
                <TouchableOpacity onPress={() =>
                  Linking.openURL(`tel:+971501235240`)
                }>
                  <View style={[styles.bottomBtnView, {
                    backgroundColor: '#E9E3F0',
                    borderTopLeftRadius: height * 0.035,
                    borderBottomLeftRadius: height * 0.035,
                  }]}>
                    <Text
                      style={[
                        styles.text,
                        {
                          color: "#420E92",
                          fontSize: RFValue(16),
                          fontFamily: 'Axiforma-SemiBold',
                          textAlign: 'center'
                        },
                      ]}
                    >
                      Call Us
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>
                  Linking.openURL('mailto:support@winjoy.ae')
                }>
                  <View style={[styles.bottomBtnView, {
                    borderTopRightRadius: height * 0.035,
                    borderBottomRightRadius: height * 0.035,
                  }]}>
                    <Text
                      style={[
                        styles.text,
                        {
                          color: "#420E92",
                          fontSize: RFValue(16),
                          fontFamily: 'Axiforma-SemiBold',
                          textAlign: 'center'
                        },
                      ]}
                    >
                      Email Us
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <SelectLanguageModal ModalRef={ModalStateLanguage} details />
            <SelectCurrencyModal ModalRef={ModalStateCurrency} details />
          </View>
        </View>
      </ScrollView>
    </View>

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
    marginTop: height * 0.05,

  },
  bView: {
    // backgroundColor: "rgba(0,0,0,0.4)",
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
    width: widthPercentageToDP("100%"),
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topView: {
    width: widthPercentageToDP("100%"),
    paddingVertical: 10,
    flexDirection: "row",
  },
  avatarView: {
    width: height * 0.105,
    height: height * 0.105,
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
    fontFamily: "Axiformam Regular",
    color: "#0B2142",
    fontSize: RFValue(13),
  },
  rowView: {
    width: width * 0.9,
    justifyContent: 'space-between',
    // borderWidth:3
    //elevation:3,
    flexDirection: 'row',

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
  bottomImage: {
    width: width * 0.2,
    height: height * 0.1,
    resizeMode: "contain",
  },
  Margin: {
    height: height * 0.065,
    width: width * 0.36,
    backgroundColor: "#fcd9e2",
    borderRadius: 10
  },
  twoBtnView: {
    width: width * 0.4,
    height: height * 0.05,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E6DFEE',
    borderRadius: height * 0.06,
  },
  bottomBtnView: {
    width: width * 0.45,
    height: height * 0.058,
    justifyContent: 'center',
  }
});

export default index;