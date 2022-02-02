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
  Image
} from "react-native";
import GalleryViewModal from "../../Components/GalleryViewModal";
import { TrendingCards } from "../../Components";
import { connect, useDispatch, useSelector } from "react-redux";
import { wait } from "../../Constants/Functions";
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
import { HomeCard, LuckyDrawCard, TriviaAvatar, ProductViewCard, TriviaNightCard } from '../../Components';
import dayjs from "dayjs"
import LongButton from "../../Components/LongButton";
import { FanJoyCard, WjBackground } from "../../Components";
import Carousel from 'react-native-snap-carousel';
import Video from "react-native-video";
import { getLandingScreen } from '../../redux/actions';
import socketIO from "socket.io-client";
import { useTranslation } from 'react-i18next';
import ModalCelebrityProducts1 from "../../Components/ModalCelebrityProducts1";
const MYServer = "https://node-winjoyserver-deploy.herokuapp.com/";

function ClosingSoon({ item }) {
  let progress = item.updated_stocks
    ? (item?.updated_stocks / item?.stock) * 100
    : 0;

  return (
    <View
      style={{
        width: width * 0.38,
        height: heightConverter(height * 0.43),
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
          height: height * 0.15,
        }}
        resizeMode="contain"
      />
      <Label primary font={11} dark style={{ color: "#000000" }}>
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
      <View style={{ height: height * 0.05 }}>
        <Label bold font={10} dark style={{ color: "#000000", width: "120%" }}>
          {item.title}
        </Label>
      </View>

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
  const [buffer, setBuffer] = useState(false);
  const [videoAction, setVideoAction] = useState(true);
  const dispatch = useDispatch();
  const socket = socketIO(MYServer);
  const ModalState = useRef()
  const celebrityModalState = useRef();
  const onRefresh = React.useCallback(() => {
    // setBanners(null);
    setRefreshing(true);
    dispatch(getLandingScreen());
    var CurrentDate = dayjs().format("YYYY-MM-DDThh:mm:ss.000000Z");
    var duration = dayjs(LandingData?.gameshow?.start_date).diff(dayjs(CurrentDate), 'seconds');
    setTime(duration)
    initialLoad();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onPressvideo = () => {
    return (celebrityModalState.current(true))
  }

  const UpdateLandingDataOnce = () => {
    initialLoad();
    dispatch(getLandingScreen());
  };
  const initialLoad = () => {

    var CurrentDate = dayjs().format("YYYY-MM-DDThh:mm:ss.000000Z");
    var duration = dayjs(LandingData?.gameshow?.start_date).diff(dayjs(CurrentDate), 'seconds');
    setTime(duration)
    setGameShowData(LandingData?.gameShow)
  }

  useFocusEffect(
    React.useCallback(() => {
      UpdateLandingDataOnce();
      // initialLoad();
    }, []));

  useEffect(() => {
    dispatch(getLandingScreen());
    setGameShowData(LandingData?.gameShow)
  },
    []);

  function _renderItem({ item, index }) {
    //console.log("item.url",item.url);
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
        <View key={index} style={{
          backgroundColor: '#000000',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15
        }}>
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
  // const onPressWithdraw = ()=>{
  //   ModalState.current(true)}

  return (

    <View>
      <Header style={{
        position: 'absolute',
        zIndex: 1000,
        backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
        width: '100%',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
      }} />
      <ScrollView
        onScroll={(e) => {
          setHeaderValue(e.nativeEvent.contentOffset.y)
        }}
        style={{ backgroundColor: "#f6f1f3" }}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }>
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
                  data={LandingData?.banners}
                  sliderWidth={width}
                  itemWidth={width}
                  renderItem={_renderItem}
                  style={styles.ShoppingBanner}
                  onSnapToItem={index => setActiveSlide(index)}
                />
              )}
            </View>

            <View style={styles.yellowBtn}>
              <View style={{ borderWidth: 2, borderColor: "#ffffff", borderRadius: 40 }}>
                <AvatarBtn
                  picture={userData?.profile_image}
                  size={height * 0.08}
                  font={28} />
              </View>

              <TouchableOpacity onPress={() => navigation.navigate("WALLET")}>
                <View style={styles.secondHeaderMiddleView}>
                  <Text allowFontScaling={false} style={[styles.text, { color: '#fff', fontSize: RFValue(12) }]}>
                    {userData?.first_name.charAt(0).toUpperCase() + userData?.first_name.slice(1)} {userData?.last_name.charAt(0).toUpperCase() + userData?.last_name.slice(1)}
                  </Text>
                  <Text allowFontScaling={false} style={[styles.text, { color: '#fff', fontSize: RFValue(12) }]}>Your balance: <Text allowFontScaling={false} style={[styles.text, { color: '#ffff00', fontSize: RFValue(14) }]}>AED {userData.balance ? userData.balance : 0}</Text></Text>
                </View>
              </TouchableOpacity>
              <Entypo name="chevron-thin-right" size={17} color="#fff" style={{ marginTop: 6.5, marginRight: 6 }} />
            </View>
          </LinearGradient>

          <View style={styles.howitWorksbutton}>
            <TouchableOpacity style={styles.howitWorksbuttonInner} onPress={onPressvideo}>
              <View><Image
                style={{ width: 35, height: 35, }}
                source={require('../../assets/play_icon.png')}
              /></View>
              <Text allowFontScaling={false} style={styles.howItWorks}>How It Works</Text>
            </TouchableOpacity>
          </View>

          <ModalCelebrityProducts1 ModalRef={celebrityModalState} details
            onPressContinue={() => {
              celebrityModalState.current(false)
            }}/>

          <FlatList
            horizontal={true}
            style={{ marginLeft: width * 0.01, width: '100%', }}
            contentContainerStyle={{
              marginLeft: width * 0.02,
              borderWidth: 2,
              borderColor: '#00000',
              alignSelf: "flex-start",
              paddingRight: width * 0.04,
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={LandingData?.lowerBanner}
            renderItem={({ item }) => (
              <TriviaNightCard
                uri={item.url}
                index={item.index}
                item={item}
                onPress={() => {
                  item.id === 1 ? (
                    navigation.navigate("TriviaJoy")
                  ) : item.id === 2 ? (
                    navigation.navigate("DealsJoy")
                  ) : (
                    //  navigation.navigate("FanJoy")
                    alert("Under Construction")
                  )
                }} />)}
            keyExtractor={(item) => item.id} />

          <HomeCard
            onPress={() => navigation.navigate("GameStack", {
              screen: "Quiz",
              params: {
              uri: LandingData?.gameShow?.live_stream?.key
              }
            })}
            gameShowData={"hiii"}
            time={time} />

          <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
            <Text allowFontScaling={false} style={{ color: '#E7003F', fontSize: 13, fontFamily: "Axiforma Bold" }}>Shop to Win</Text>
            <TouchableOpacity onPress={() => navigation.navigate("PRODUCTS", {
              screen: "PrizeList"
            })}>
              <Text allowFontScaling={false} style={{ color: '#E7003F', fontSize: 13, fontFamily: "Axiforma Bold" }}>View all</Text>
            </TouchableOpacity>
          </View>


          <FlatList
            horizontal={true}
            // style={{ marginLeft: 1, minHeight: 20 }}
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
                  navigation.navigate("PRODUCTS", { params: item })}>
                <ClosingSoon props={props} index={item.index} item={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id} />

          <View style={styles.avatarBannerView}>
            <Image
              style={styles.avatarBanner}
              source={require('../../assets/imgs/avatarBannar.gif')}
              resizeMode="center"
            />
            <LongButton
              style={[
                styles.Margin,
                { flexdirection: "column", justifyContent: 'center', backgroundColor: "#ffffff", position: 'absolute', bottom: 46, right: 15, alignItems: "center" },
              ]}
              textstyle={{ color: "#000000", fontFamily: "Axiforma SemiBold", fontSize: 10 }}
              text="View Leaderboard"
              font={8}
              shadowless
              onPress={() => navigation.navigate("WINNERS", { screen: 'All Time' })}
            />
          </View>
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={["#f8d7e8", "#c7dfe8"]}
            style={{ width: '100%', justifyContent: 'center', paddingLeft: width * 0.03, paddingTop: height * 0.0090, paddingBottom: height * 0.02 }}
          >
            <View style={{ width: "96%", flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text allowFontScaling={false} style={{ color: '#E7003F', fontSize: 19, fontFamily: "Axiforma Bold" }}>FANJOY</Text>
                <Text allowFontScaling={false} style={{ color: '#0B2142', fontSize: 11.5, fontFamily: "Axiforma Regular" }}>Products By Creators</Text>
              </View>
              <LongButton
                style={{ height: height * 0.055, width: width * 0.31, backgroundColor: "#ffffff" }}
                textstyle={{ color: "#000000", fontFamily: "Axiforma SemiBold", fontSize: 10 }}
                text="View all Stars"
                font={10}
                shadowless
                onPress={() => navigation.navigate("AllCreatorsPage")} />
            </View>

            <FlatList
              data={LandingData?.products}
              horizontal={true}
              style={{ paddingLeft: 12 }}
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

          <LuckyDrawCard
            onPress={() => navigation.navigate("GameStack")}
            style={{ marginTop: height * 0.017 }} />
          <View style={{ height: height * 0.017 }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
