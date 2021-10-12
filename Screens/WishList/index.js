import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import PlayerView from "react-native-aws-ivs-player-view";
import CountDown from "react-native-countdown-component";
import { Colors, Images } from "../../Constants/Index";
import LongButton from "../../Components/LongButton";
import { GetMaxCoins } from "../../Constants/Functions";
import Header from "../../Components/Header";
import Background from "../../Components/Background";
import SafeArea from "../../Components/SafeArea";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import axios from "axios";
import LoaderImage from "../../Components/LoaderImage";
import { differenceInSeconds, getTime } from "date-fns";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import SmallButton from "../../Components/SmallButton";
import NotFound from "../../Components/NotFound";
import GoBackLiveStreaming from "../../Components/GoBackLiveStreaming";
const { width, height } = Dimensions.get("window");

const index = ({ navigation }) => {
  const [player, setPlayer] = useState();
  const [productScreenData, setProductScreenData] = useState([]);
  const [liveStreamUrl, setliveStreamUrl] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [countDown, setCountDown] = useState(null);
  const [streamCompleted, setStreamCompleted] = useState(false);
  const [bought, setBought] = useState(false);
  const [productId, setProductId] = useState(null);

  const setProductScreen = async () => {
    const timeInterval = parseInt(await AsyncStorage.getItem("timeInterval"));
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios
      .get(`${Config.API_URL}/livestream/product`, requestOptions)
      .then((response) => {
        if (response.data.message === "No Livestream Available at this time") {
          setStreamCompleted(true);
          setliveStreamUrl(undefined);
          if (timeInterval) { 
            clearInterval(timeInterval);
          }
        } else {
          setProductScreenData(response.data);
          setProductId(response?.data[0]?.id);
          const Time = getTime(new Date(response.data[0].livestream_end));
          const TimeNow = getTime(new Date());
          setCountDown(differenceInSeconds(Time, TimeNow));
          setStreamCompleted(false);
        }
      })
      .catch((err) => {
        Alert.alert("Error", err.message);
      });
  };

  const getLiveStream = async () => {
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios
      .post(
        `${Config.API_URL}/enter/${productId}/livestream`,
        null,
        requestOptions
      )
      .then((response) => {
    
        if (response?.data?.message === "You do not have enough gold coins") {
          Alert.alert("Attention", "You do not have enough gold coins");
        } else {
          player.load(response?.data?.livestream_url);
          setBought(true);
          setliveStreamUrl(response?.data?.livestream_url);
          setStreamCompleted(false);
        }
      })
      .catch((err) => {
        Alert.alert("Error", err.message);
      });
  };

  const removeUserLiveStream = async () => {
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios
      .get(
        `${Config.API_URL}/user/left/livestream/${productId}`,
        requestOptions
      )
      .then((response) => {})
      .catch((err) => {
        Alert.alert("Error", err.message);
      });
  };

  const refreshLiveStream = () => {
    setRefreshing(true);
    setProductScreen();
    if (liveStreamUrl) {
      player.load(liveStreamUrl && liveStreamUrl);
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2500);
  };
  const checkUserBuyStatus = async () => {
    const Token = await EncryptedStorage.getItem("Token");
    const timeInterval = parseInt(await AsyncStorage.getItem("timeInterval"));
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios
      .get(
        `${Config.API_URL}/livestream/checking/user/buy/status`,
        requestOptions
      )
      .then((response) => {
        console.log("res",response);
        if (response.data.message === "No Livestream Available at this time") {
          setStreamCompleted(true);
          setliveStreamUrl(undefined);
          if (timeInterval) {
            clearInterval(timeInterval);
          }
        } else {
          if (response.data.status === "isBought") {
            if (response?.data?.livestream_url) {
              player.load(response?.data?.livestream_url);
            }
            setliveStreamUrl(response?.data?.livestream_url);
            setBought(true);
          } else if (response.data.status === "notBought") {
            setBought(false);
          }
        }
      })
      .catch((err) => {
        Alert.alert("Error", err.message);
      });
  };
  const focusLogic = async () => {
    if (bought && streamCompleted === false) {
      checkUserBuyStatus();
      const timeInterval = setInterval(() => {
        setProductScreen();
      }, 5000);
      AsyncStorage.setItem("timeInterval", timeInterval.toString());
    } else {
      setProductScreen();
    }
  };

  const notFocusLogic = async () => {
    const timeInterval = parseInt(await AsyncStorage.getItem("timeInterval"));
    if (timeInterval && bought) {
      await removeUserLiveStream();
      clearInterval(timeInterval);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      focusLogic();
      if (streamCompleted === false) {
        return () => {
          notFocusLogic();
        };
      }
    }, [streamCompleted])
  );

  useEffect(async () => {
    await setProductScreen();
    if (productId) {
      checkUserBuyStatus();
      removeUserLiveStream();
    }
  }, [productId]);

  const rewardModal = () => {
    if (productScreenData.length > 0 && !streamCompleted) {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView
            style={{
              flex: 1,
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: Colors.PRIMARY_LABEL,
                opacity: 0.9,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20, color: Colors.WHITE }}>
                  HURRY UP!
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    color: Colors.WHITE,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  Time is running out
                </Text>
                {countDown ? (
                  <CountDown
                    size={20}
                    until={countDown && countDown}
                    onFinish={() => alert("Finished")}
                    digitStyle={{
                      backgroundColor: "#FFF",
                      height: 35,
                      width: 45,
                    }}
                    digitTxtStyle={{
                      color: Colors.PRIMARY_LABEL,
                      fontSize: 20,
                    }}
                    timeLabelStyle={{ color: "red", fontWeight: "bold" }}
                    separatorStyle={{
                      color: Colors.WHITE,
                      marginHorizontal: 2,
                      marginBottom: 25,
                    }}
                    timeToShow={["D", "H", "M", "S"]}
                    timeLabels={{
                      d: "days",
                      h: "hours",
                      m: "minutes",
                      s: "seconds",
                    }}
                    timeLabelStyle={{ color: "white" }}
                    showSeparator
                  />
                ) : (
                  <ActivityIndicator size={"large"} color={"white"} />
                )}
              </View>
              <LoaderImage
                source={{
                  uri:
                    productScreenData[1] &&
                    productScreenData[1].replace("http://", "https://"),
                }}
                resizeMode={"contain"}
                style={{
                  width: "96%",
                  height: "32%",
                  marginHorizontal: "2%",
                  borderRadius: 20,
                }}
              />
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 25,
                    color: Colors.WHITE,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  Get a chance to win
                </Text>
                <Text style={{ fontSize: 20, color: Colors.WHITE }}>
                  New {productScreenData[0]?.livestream_product_title}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={Images[GetMaxCoins(0).type.split(" ")[0]]}
                    style={styles.CoinIconModal}
                  />
                  <Text
                    style={{
                      fontSize: 25,
                      color: Colors.WHITE,
                      fontWeight: "bold",
                      marginVertical: 10,
                    }}
                  >
                    {" "}
                    {parseInt(
                      productScreenData[0]?.livestream_fee
                    ).toLocaleString()}
                  </Text>
                </View>
                <LongButton
                  text="Enter Live Draw"
                  onPress={async () => {
                    await getLiveStream();
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      );
    }
  };

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => refreshLiveStream()}
          />
        }
      >
        
        {productScreenData.length > 0 && !streamCompleted ? undefined:(
          <>
          <SafeArea style={{ height: height }}>
            <Background height={0.25} />
            <Header />
            <View
              style={{
                alignItems: "center",
                marginTop: "5%",
                height: height * 0.14,
              }}
            >
              <Text
                style={{
                  fontSize:
                    productScreenData.length > 0 && !streamCompleted ? 20 : 30,
                  color: Colors.WHITE,
                  fontWeight:
                    productScreenData.length > 0 && !streamCompleted
                      ? undefined
                      : "bold",
                }}
              >
                {"Live Stream"}
              </Text>
              <SmallButton
                style={{
                  width: "42%",
                  height: "40%",
                  marginTop: "2%",
                  backgroundColor: "#333ad0",
                }}
                textstyle={{ color: Colors.WHITE, fontSize: 14 }}
                shadowless
                text="Refresh"
                onPress={() => refreshLiveStream()}
              />
            </View>
            </SafeArea>
          </>
        )}
        {productScreenData.length > 0 && !streamCompleted ? (
          <>
            <PlayerView
              style={{ height: height, width: width }}
              ref={(e) => {
                setPlayer(e);
              }}
            />
            <View style={{ position: "absolute", left: "2%" }}>
              <GoBackLiveStreaming />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  top: "20%",
                  left: "30%",
                }}
              >
                <Image source={Images.JoinedAvatar} />
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.MUTED,
                    fontWeight: "bold",
                    marginLeft: 5,
                  }}
                >
                  {productScreenData[0]?.user_joined}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <NotFound
            style={{ marginTop: "3%" }}
            text={"Live Stream"}
            desc={
              "We're sorry, no live stream found at the moment, please check back later."
            }
            buttonText={"Back to Home"}
            con
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        )}
      </ScrollView>
      {!bought && productScreenData && rewardModal()}
    </>
  );
};

const styles = StyleSheet.create({
  CoinIconModal: {
    width: width * 0.08,
    height: width * 0.08,
    resizeMode: "contain",
    alignSelf: "center",
    paddingRight: width * 0.1,
  },
  CoinIcon: {
    width: width * 0.11,
    height: width * 0.11,
    resizeMode: "contain",
    alignSelf: "center",
    paddingRight: width * 0.1,
    marginBottom: 10,
  },
});

const options = {
  container: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.PRIMARY_LABEL,
    marginLeft: 7,
  },
};

export default index;
