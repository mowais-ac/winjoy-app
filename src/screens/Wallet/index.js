import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import BackgroundRound from "../../Components/BackgroundRound";
import Header from "../../Components/Header";
import Label from "../../Components/Label";
import LongButton from "../../Components/LongButton";
import { WalletBlanceCard, WalletLastPlayedCard } from "../../Components";
import ProfilePicture from "../../Components/ProfilePicture";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import I18n from 'react-native-i18n';
I18n.locale="ar";
import { strings} from "../../i18n";
import axios from 'axios';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from "../../Components/Helpers/Responsive";
const { width, height } = Dimensions.get("window");
const index = ({ props, navigation }) => {
  const [productData, setProductData] = useState([]);
  const [userInfo, setUserInfo] = useState();
  useEffect(async () => {
    const userInfo = JSON.parse(await EncryptedStorage.getItem("User"));
    setUserInfo(userInfo);
    GetData();
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
      .get(`${Config.API_URL}/livegameshow/user/game/history`, requestOptions)
      .then((response) => {
        let res = response;
        if (res.data.message === "No Data Found.") {
          setUserData([]);
        } else {
          setUserData(res?.data);
        }
      });
  };
  return (
    <SafeAreaView>
      <BackgroundRound height={0.14} />
      <View style={{ height: 20 }} />
      <Header back={true} />
      <ScrollView>
        <View style={{ flexDirection: 'row', width: widthConverter(420), marginLeft: 25, marginTop: 4 }}>
          <View style={styles.avatarView}>
            <ProfilePicture
              picture={userInfo?.profile_image}
              id={userInfo?.id}
              name={(userInfo?.first_name.slice(0, 1) + userInfo?.last_name.slice(0, 1))}
              style={styles.avatarView}
              font={28}
            />
          </View>

          <View style={{ width: widthConverter(250), marginLeft: widthConverter(8), marginTop: 2 }}>
            <Text style={{ color: "#FFFFFF", marginTop: 8, fontFamily: "Axiforma-Bold", fontSize: 15 }}>
              {userInfo?.first_name} {userInfo?.last_name}
            </Text>
            <Text

              style={{ color: "#FFFFFF", marginTop: 2, fontFamily: "Axiforma-Bold", fontSize: 12 }}
            >
              {userInfo?.designation || "Senior Product Analyst"}
              <Text style={{ color: "#e2acc7", fontFamily: "Axiforma-Regular", fontSize: 12 }}>
                {" "}
                at{" "}
              </Text>
              {userInfo?.company_name || "MicroSoft"}
            </Text>
          </View>
        </View>

        <View>

          <WalletBlanceCard />
          <WalletLastPlayedCard
            onPress={() => navigation.navigate("LastGameWinner")}
          />
          <View
            style={{
              width: width - 25,
              height:heightConverter(500),
              backgroundColor: "#ffffff",
              marginLeft: 10,
              borderRadius: 10,
              padding: 10,
              top: height * 0.06,
              left: 2,
              justifyContent: "center",
              alignItems: "center",
              elevation: 3,
              marginBottom: 15,
            }}
          >

            <View style={{ marginLeft: 30 }}>
              <Label notAlign primary font={14} bold style={{ color: "#E7003F", }}>
              {strings("wallet.last_five_transcation")}
              </Label>
              <FlatList
                data={[1, 2, 3, 4, 5]}
                contentContainerStyle={{
                  //paddingBottom: height * 0.48,
                  height: "100%"
                }}
                scrollEnabled={true}
                // ListEmptyComponent={
                //   <NotFound
                //     text="Games"
                //     desc="You don't have win any Games yet "
                //     ConModal
                //   />
                // }
                ItemSeparatorComponent={() => {
                  return (
                    <View
                      style={{
                        marginTop: 10,
                        height: 1,
                        width: "92%",
                        backgroundColor: "#dedae9",
                      }}
                    />
                  );
                }}
                renderItem={({ item, index }) => {
                  return (

                    <View style={{
                      flexDirection: 'row',
                      width: widthConverter(300),
                      marginTop: 7

                    }}>
                      <View style={{ marginTop: 10 }}>
                        <Image
                          style={styles.tinyLogo}
                          source={require('../../assets/imgs/lpgame.png')}
                        />
                      </View>
                      <View style={{
                        width: widthConverter(200),
                        marginLeft: 15,

                      }}>
                        <Text style={styles.text}>
                          12,200
                        </Text>
                        <Text style={styles.text2}>
                          21 Dec, 2020
                        </Text>
                      </View>

                    </View>



                  );
                }}
              />

            </View>


          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Margin: {
    height: height * 0.06,
    width: width * 0.4,
    backgroundColor: "#ffffff",
  },
  avatarView: {
    //position: 'absolute',

    width: widthConverter(70),
    height: widthConverter(70),
    borderRadius: heightConverter(130),
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
  },
  aView: {
    alignItems: "center",
    width: widthConverter("100%"),
    marginTop: 20,
  },
  tinyLogo: {
    width: 30,
    height: 20,
  },
  text: {
    fontFamily: "Axiforma-SemiBold",
    color: '#000000',
    fontSize: 14
  },
  text2: {
    fontFamily: "Axiforma-Light",
    color: "#627482",
    fontSize: 14
  }
});

export default index;
