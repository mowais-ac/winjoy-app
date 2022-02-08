import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  Animated,
  Text,
  Image,
  ImageBackground
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { FormatNumber, wait } from "../../Constants/Functions";
import LoaderImage from "../../Components/LoaderImage";
import Label from "../../Components/Label";
import { Colors } from "../../Constants/Index";
import { useFocusEffect } from "@react-navigation/native";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
const { width, height } = Dimensions.get("window");
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import HomeBottomList from "../../Components/HomeBottomList";
import {
  heightConverter,
  heightPercentageToDP,
  widthConverter,
} from "../../Components/Helpers/Responsive";
import BackgroundRound from "../../Components/BackgroundRound";
import Header from "../../Components/Header";

import AvatarBtn from "../../Components/AvatarBtn";
import { RFValue } from "react-native-responsive-fontsize";
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';
import { HomeCard, LuckyDrawCard, TriviaAvatar, ProductViewCard, TriviaNightCard, ButtonWithRightIcon, TrendingCards } from '../../Components';
import dayjs from "dayjs"
import LongButton from "../../Components/LongButton";
import { FanJoyCard, WjBackground } from "../../Components";
import Carousel from 'react-native-snap-carousel';
import Video from "react-native-video";
import { getLandingScreen, CheckGameEnterStatus } from '../../redux/actions';
import socketIO from "socket.io-client";
import { useTranslation } from 'react-i18next';
import WatchAddModal from "../../Components/WatchAddModal";
const MYServer = "https://node-winjoyserver-deploy.herokuapp.com/";
function ClosingSoon({ item }) {
  let progress = item.updated_stocks
    ? (item?.updated_stocks / item?.stock) * 100
    : 0;

  // const ImgUrl = `${Config.PRODUCT_IMG}/${item.id}/${JSON.parse(item.image)[0]
  //   }`;
  return (
    <View
      style={{
        width: width * 0.38,
        height: heightConverter(190),
        backgroundColor: "#ffffff",
        marginLeft: 10,
        borderRadius: 10,
        padding: 10,
      }}
    >
      <LoaderImage
        source={{
          // uri: ImgUrl.replace("http://", "https://"),
          uri: item?.image
        }}
        style={{
          width: 120,
          height: 90,
        }}
        resizeMode="contain"
      />
      <Label primary font={11} dark style={{ color: "#000000" }}>
        Get a chance to
        <Label
          notAlign
          bold
          primary
          font={11}
          bold
          style={{ color: "#E7003F" }}
        >
          {" "}
          WIN
        </Label>
      </Label>
      <Label bold font={11} dark style={{ color: "#000000", width: "110%" }}>
        {item.title}
      </Label>
      {/* <Label  bold font={11} dark style={{ color: "#000000", }}>
      Edition
      </Label> */}
      <View style={styles.containerprogressBar}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#E7003F", "#420E92"]}
          style={[styles.LinerGradientProgrees, { width: `${progress}%` }]}
        />
        <View style={styles.GreybarWidth} />
      </View>
      <Label primary font={10} style={{ color: "#877C80", top: 4 }}>
        {item.updated_stocks ? item.updated_stocks : 0} sold out of {item.stock}
      </Label>
    </View>
  );
}
const index = (props) => {
  const { t, i18n } = useTranslation();
  // const scrollY = new Animated.Value(0)
  // const diffClamp = Animated.diffClamp(scrollY, 0, 45)
  // const translateY = diffClamp.interpolate({
  //   inputRange: [0, 45],
  //   outputRange: [0, -45]
  // })

  const [headerValue, setHeaderValue] = useState(0);
  const { Coins, navigation } = props;
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [winnerData, setWinnerData] = useState([]);
  const [imgActive, setImgActive] = useState(0);
  const [homeData, setHomeData] = useState([]);
  const [gameShowData, setGameShowData] = useState([]);
  const [time, setTime] = useState("");
  const [activeSlide, setActiveSlide] = useState();
  const userData = useSelector(state => state.app.userData);
  const LandingData = useSelector(state => state.app.LandingData);
  const gameEnterStatus = useSelector(state => state.app.gameEnterStatus);
  const totalLives = useSelector(state => state.app.totalLives);
  const [buffer, setBuffer] = useState(false);
  const [videoAction, setVideoAction] = useState(true);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const socket = socketIO(MYServer);
  const AddModalState = useRef();
  const onRefresh = React.useCallback(() => {
    // setBanners(null);
    setRefreshing(true);
    dispatch(getLandingScreen());
    var CurrentDate = new Date().toLocaleString()
    var duration = dayjs(LandingData?.gameShow?.start_date).diff(dayjs(CurrentDate), 'seconds');
    setTime(duration)
    initialLoad();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const UpdateLandingDataOnce = () => {
    initialLoad();
    dispatch(getLandingScreen());
  };
  const initialLoad = () => {

    var CurrentDate = new Date().toLocaleString()
    var duration = dayjs(LandingData?.gameShow?.start_date).diff(dayjs(CurrentDate), 'seconds');
    setTime(duration)
    setGameShowData(LandingData?.gameShow)
  }
  useFocusEffect(
    React.useCallback(() => {
      UpdateLandingDataOnce();
      initialLoad();
    }, [])
  );
  useEffect(() => {

    dispatch(getLandingScreen());
    setGameShowData(LandingData?.gameShow)
  }, []);
  const LetBegin = () => {
    dispatch2(CheckGameEnterStatus());
    if (gameEnterStatus.status === "success") {
      if (gameEnterStatus.message === "Welcome to Live Game Show") {
        navigation.navigate("GameStack", {
          screen: "Quiz",
          params: {
            uri: LandingData?.gameShow?.live_stream?.key
          }
        })
      } else {
        alert("game not started yet!")
      }
    } else {
      alert("game not started yet!")
    }

  }
  function _renderItem({ item, index }) {
    if (item.type === "image") {
      return (
        <View key={index}>
          <Image source={{ uri: item.url }}
            resizeMode={"cover"}
            style={styles.ShoppingBanner}
          />
        </View>
      )
    } else {
      return (
        <View key={index} style={{ backgroundColor: '#000000', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
          {item.url ? (
            <Video
              source={{ uri: item.url }}  // Can be a URL or a local file.
              // ref={(ref) => { this.player = ref }}  // Store reference
              resizeMode={"cover"}
              paused={index !== activeSlide}
              //  onError={this.onVideoError}
              minLoadRetryCount={2}
              fullScreen={true}
              ignoreSilentSwitch={"obey"}
              onLoad={() => setBuffer(false)}
              onLoadStart={() => setVideoAction(false)}
              controls={false}
              onEnd={() => setVideoAction(true)}
              style={styles.ShoppingBanner}
            />

          ) : (
            null
          )}
        </View>
      )
    }
  }
  return (

    <View>
      {/* <Animated.View
        style={{
          transform: [
            { translateY: translateY }
          ],
          elevation: 4,
          zIndex: 100,
        }}
      > */}
      <Header style={{
        position: 'absolute',
        zIndex: 1000,
        backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
        width: '100%',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
      }} />
      {/* </Animated.View> */}
      <ScrollView
        onScroll={(e) => {
          setHeaderValue(e.nativeEvent.contentOffset.y)
        }}
        style={{ backgroundColor: "#f6f1f3" }}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <View style={{ width: '100%', alignItems: 'center', }}>
          <LinearGradient colors={["#5B0C86", "#E7003F"]} style={styles.mainView}>


            <View style={styles.wrap}>
              {loader ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <Carousel
                  layout={"default"}
                  resizeMode={"cover"}
                  loop={videoAction}
                  autoplay={videoAction}
                  autoplayInterval={3000}

                  // ref={ref => this.carousel = ref}
                  data={LandingData?.banners}
                  sliderWidth={width}
                  itemWidth={width}
                  renderItem={_renderItem}
                  style={styles.ShoppingBanner}
                  onSnapToItem={index => setActiveSlide(index)}
                />

              )}
            </View>
            <View
              style={styles.yellowBtn}
            >

              <View style={{ borderWidth: 2, borderColor: "#fff", borderRadius: 45, }}>
                <AvatarBtn
                  picture={userData?.profile_image}
                  // id={userInfo?.id}
                  //  name={(name.slice(0, 1) + name.slice(0, 1))}
                  size={50}
                  font={28}
                />
              </View>

              <TouchableOpacity onPress={() => navigation.navigate("WALLET")}>
              <View style={styles.secondHeaderMiddleView}>
                <Text style={[styles.text, { color: '#fff', fontSize: RFValue(14) }]}>
                  {userData?.first_name?.charAt(0).toUpperCase() + userData?.first_name?.slice(1)} {userData?.last_name?.charAt(0).toUpperCase() + userData?.last_name?.slice(1)}
                </Text>
                <Text style={[styles.text, { color: '#fff', fontSize: RFValue(14) }]}>Your balance: <Text style={[styles.text, { color: '#ffff00', fontSize: RFValue(14) }]}>
                  AED {userData?.balance ? FormatNumber(+(userData?.balance).toLocaleString()) : 0}

                </Text>
                </Text>
              </View>
              </TouchableOpacity> 
              <TouchableOpacity onPress={() => navigation.navigate("MenuStack", { screen: 'BuyLife' })}>
              <ImageBackground
                resizeMode="center"
                style={{ width: 50, height: 40, justifyContent: 'center', alignItems: 'center' }}
    
                source={require('../../assets/imgs/pinkHeart.png')}
              >

                <Text style={{ color: "#E7003F", fontFamily: 'Axiforma-SemiBold', fontSize: RFValue(12) }}>
                  {totalLives?totalLives:0} 
                </Text>
                
              </ImageBackground>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => navigation.navigate("WALLET")}>
                <Entypo name="chevron-thin-right" size={22} color="#fff" style={{ marginTop: 6.5, marginRight: 6 }} />
              </TouchableOpacity> */}
            </View>

          </LinearGradient>

          <View style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.08, marginTop: 10 }}>
            <ButtonWithRightIcon
              btnStyle={{ backgroundColor: '#420E92' }}
              text={"How it works"}
              textStyle={{ color: '#fff', fontFamily: 'Axiforma SemiBold' }}
              onPress={() => AddModalState.current(true)}
            />
          </View>


          <FlatList
            horizontal={true}
            style={{ marginLeft: 1, width: '100%', }}
            contentContainerStyle={{

              marginLeft: 10,
              alignSelf: "flex-start",
              paddingRight: width * 0.04,


            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={LandingData?.lowerBanner}
            renderItem={({ item, index }) => (

              // <TouchableOpacity
              //   onPress={() =>
              //    // navigation.navigate("SimpeStackScreen", { screen: "ProductDetail", params: item })
              //    alert("hii")
              //   }
              // >
              <TriviaNightCard
                uri={item.url}
                index={item.index}
                item={item}
                onPress={() => {
                  index === 0 ? (
                    navigation.navigate("TriviaJoy")
                  ) : index === 1 ? (
                    navigation.navigate("DealsJoy")
                  ) : (
                    //  navigation.navigate("FanJoy")
                    navigation.navigate("AllCreatorsPage")
                  )
                }} />
              // </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
          />
          <HomeCard
            //onPress={() => navigation.navigate("GameStack")} 
            onPress={() => LetBegin()}

            //style={{ marginTop: 10, }}
            gameShowData={"hiii"}
            time={time}
          />
          <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
            <Text style={{ color: '#E7003F', fontSize: 16, fontFamily: "Axiforma-Bold" }}>Shop to Win</Text>

            <TouchableOpacity onPress={() => navigation.navigate("PRODUCTS", {
              screen: "PrizeList"
            })}>
              <Text style={{ color: '#E7003F', fontSize: 16, fontFamily: "Axiforma-Bold" }}>View all</Text>
            </TouchableOpacity>

          </View>
          <FlatList
            horizontal={true}
            style={{ marginLeft: 1, minHeight: 50 }}
            contentContainerStyle={{
              alignSelf: "flex-start",
              paddingRight: width * 0.04,
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={LandingData?.products}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PRODUCTS", { params: item })
                }
              >
                <ClosingSoon props={props} index={item.index} item={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
          />
          <View style={styles.avatarBannerView}>
            <Image
              style={styles.avatarBanner}
              source={require('../../assets/imgs/avatarBannar.gif')}
              resizeMode="center"
            />
            <LongButton
              style={[
                styles.Margin,
                { backgroundColor: "#ffffff", position: 'absolute', bottom: 48, right: 25, },
              ]}
              textstyle={{ color: "#000000", fontFamily: "Axiforma SemiBold", fontSize: 10 }}
              text="View Leaderboard"
              font={10}
              shadowless
              onPress={() => navigation.navigate("MenuStack", { screen: 'LeaderBoard' })}
            />
          </View>
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={["#f8d7e8", "#c7dfe8"]}
            style={{ width: '100%', justifyContent: 'center', paddingLeft: 15, paddingTop: 20, paddingBottom: 20 }}
          >
            <View style={{ width: "95%", flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ color: '#E7003F', fontSize: 20, fontFamily: "Axiforma-Bold" }}>FANJOY</Text>
                <Text style={{ color: '#0B2142', fontSize: 16, fontFamily: "Axiforma Regular" }}>Products By Creators</Text>
              </View>
              <LongButton
                style={[
                  styles.Margin,
                  { backgroundColor: "#ffffff", },
                ]}
                textstyle={{ color: "#000000", fontFamily: "Axiforma SemiBold", fontSize: 14 }}
                text="View all Stars"
                font={16}
                shadowless
                onPress={() => navigation.navigate("AllCreatorsPage")}
              />
            </View>

            <FlatList
              data={LandingData?.products}
              horizontal={true}
              //   style={{ paddingLeft: 12 }}
              renderItem={({ item }) =>
                <TrendingCards
                  onPress={() => navigation.navigate("AllCreatorsPage")}
                  imageUrl={item.image}
                  title={item?.title}
                  price={item?.price}
                  style={{ width: width * 0.38, height: height * 0.33, }}
                  imageStyle={{ width: width * 0.35, height: height * 0.22, borderRadius: 15 }}
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
          <TouchableOpacity onPress={() => navigation.navigate('WINNERS', {
            selected: 1
          })}>
            <LuckyDrawCard
              style={{ marginTop: 15, }}
            />
          </TouchableOpacity>
          <View style={{ height: 10 }} />
        </View>
        <WatchAddModal ModalRef={AddModalState} details
          video={"https://winjoy-assets.s3.amazonaws.com/banners/banner-3.mp4"}
          cross={true}
        // id={idVideoAdd}
        // onPressContinue={onPressContinue} 
        />
      </ScrollView>
    </View >
  );
};

export default index;
