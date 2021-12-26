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
  ImageBackground,
  Text,
  Image
} from "react-native";
import { connect, useSelector } from "react-redux";
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
import { HomeCard, ButtonWithIcon, TriviaAvatar, ProductViewCard, TriviaNightCard } from '../../Components';
import dayjs from "dayjs"
import LongButton from "../../Components/LongButton";
import { FanJoyCard, WjBackground } from "../../Components";
import Carousel from 'react-native-snap-carousel';
import Video from "react-native-video";


function ClosingSoon({ item }) {
  let progress = item.updated_stocks
    ? (item?.updated_stocks / item?.stock) * 100
    : 0;

  const ImgUrl = `${Config.PRODUCT_IMG}/${item.id}/${JSON.parse(item.image)[0]
    }`;
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
          uri: ImgUrl.replace("http://", "https://"),
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
  const { Coins, navigation } = props;

  const [banners, setBanners] = useState([]);
  const [lowerBanner, setLowerBanner] = useState([]);
  const [fanjoyData, setFanjoyData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [productList, setProductList] = React.useState([]);
  const [winnerData, setWinnerData] = useState([]);
  const [imgActive, setImgActive] = useState(0);
  const [homeData, setHomeData] = useState([]);
  const [gameShowData, setGameShowData] = useState([]);
  const [time, setTime] = useState("");
  const [activeSlide, setActiveSlide] = useState();
  const userData = useSelector(state => state.app.userData);
  const [buffer, setBuffer] = useState(false);
  console.log("userData", userData);
  const onRefresh = React.useCallback(() => {
    // setBanners(null);
    setRefreshing(true);
    UpdateCoinsOnce();
    wait(500).then(() => setRefreshing(false));
  }, []);
  
  useEffect(() => {
    GetData()
  }, []);
  const finish = () => {
    //here put the code for time completion
  }
  const GetData = async () => {
    setLoader(true)
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
      .get(`${Config.API_URL}/home`, requestOptions)
      .then((response) => {
        let res = response.data;
        if (res.status === "success") {
          var CurrentDate = dayjs().format("YYYY-MM-DDThh:mm:ss.000000Z");
          var duration = dayjs(res?.gameshow?.start_date).diff(dayjs(CurrentDate), 'seconds');
          setTime(duration)
          setBanners(res?.banners);
          setLowerBanner(res?.lowerBanner)
          setProductList(res?.products)
          setFanjoyData(res?.funJoy)
          setGameShowData(res?.gameshow)
          //setBanners(res?.banners)

        }
        setLoader(false)

      });
  };


  

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
        <View key={index}>
          {item.url ? (
            <Video
              source={{ uri: item.url }}  // Can be a URL or a local file.
              // ref={(ref) => { this.player = ref }}  // Store reference
              resizeMode={"cover"}
              // paused={index !== activeSlide}
              //  onError={this.onVideoError}
              minLoadRetryCount={2}
              fullScreen={true}
              ignoreSilentSwitch={"obey"}
              onLoad={() => setBuffer(false)}
              onLoadStart={() => setBuffer(true)}
              controls={false}
              style={styles.ShoppingBanner}
            />

          ) : (null)}
        </View>
      )
    }
  }
  return (
    <ScrollView
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
                loop={true}
                autoplay={true}
                autoplayInterval={8000}

                // ref={ref => this.carousel = ref}
                data={banners}
                sliderWidth={width}
                itemWidth={width}
                renderItem={_renderItem}
                style={styles.ShoppingBanner}
                onSnapToItem={index => setActiveSlide(index)}
              />
            )}

          </View>


          <Header style={{ top: 0, position: "absolute", marginTop: 10 }} />
          <View
            style={styles.yellowBtn}
          >

            <View style={{ borderWidth: 2, borderColor: "#fff", borderRadius: 45 }}>
              <AvatarBtn
                picture={"https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg"}
                // id={userInfo?.id}
                //  name={(name.slice(0, 1) + name.slice(0, 1))}
                size={50}
                font={28}

              />
            </View>

            <View style={styles.btnTextView}>
              <Text style={[styles.text, { color: '#fff', fontSize: RFValue(16) }]}>
                {userData.first_name.charAt(0).toUpperCase() + userData.first_name.slice(1)} {userData.last_name.charAt(0).toUpperCase() + userData.last_name.slice(1)}
              </Text>
              <Text style={[styles.text, { color: '#fff', fontSize: RFValue(16) }]}>Your balance: <Text style={[styles.text, { color: '#ffff00', fontSize: RFValue(16) }]}>AED {userData.balance ? userData.balance : 0}</Text></Text>
            </View>
            <Entypo name="chevron-thin-right" size={22} color="#fff" style={{ marginTop: 6.5, marginRight: 6 }} />
          </View>

        </LinearGradient>


        <FlatList
          horizontal={true}
          style={{ marginLeft: 1, minHeight: 50 }}
          contentContainerStyle={{
            marginTop: 15,
            marginLeft: 10,
            alignSelf: "flex-start",
            paddingRight: width * 0.04,
            paddingBottom: 30
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={lowerBanner}
          renderItem={({ item }) => (
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
              onPress={() => navigation.navigate("FanJoy")} />
            // </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
        />
        <HomeCard
          onPress={() => navigation.navigate("Landing")}
          style={{ marginTop: 15, }}
          time={time}
          Finish={finish()}
        />
        <Label
          notAlign
          primary
          font={16}
          dark
          style={{
            color: "#E7003F",
            marginLeft: width * 0.04,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Closing Soon
        </Label>
        <FlatList
          horizontal={true}
          style={{ marginLeft: 1, minHeight: 50 }}
          contentContainerStyle={{
            alignSelf: "flex-start",
            paddingRight: width * 0.04,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={productList}
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
            source={require('../../assets/imgs/avatarBannar.png')}
            resizeMode="stretch"
          />
          <LongButton
            style={[
              styles.Margin,
              { backgroundColor: "#ffffff", position: 'absolute', bottom: 30, left: 30, },
            ]}
            textstyle={{ color: "#000000", fontFamily: "Axiforma SemiBold", fontSize: 14 }}
            text="View Leaderboard"
            font={16}
            shadowless
          />
        </View>
        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          colors={["#f8d7e8", "#c7dfe8"]}
          style={{ width: '100%', justifyContent: 'center', paddingLeft: 20, paddingTop: 20, paddingBottom: 20 }}
        >
          <View style={{ width: "95%", flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: '#E7003F', fontSize: 20, fontFamily: "Axiforma Bold" }}>FANJOY</Text>
              <Text style={{ color: '#0B2142', fontSize: 16, fontFamily: "Axiforma Regular" }}>Created By Stars</Text>
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
              onPress={() => navigation.navigate("FanJoy")}
            />
          </View>

          <FlatList
            data={fanjoyData}
            horizontal={true}
            renderItem={({ item }) =>
              <FanJoyCard
                name={item.first_name + item.last_name}
                style={{ width: 150, marginRight: 20 }}
              />
            }
            //keyExtractor={(e) => e.id.toString()}
            contentContainerStyle={{
              marginTop: 20,
            }}
          // refreshControl={
          //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          // }
          keyExtractor={(item) => item.id}
          />
        </LinearGradient>
        <View style={{ height: 200 }} />
      </View>
    </ScrollView>
  );
};

export default index;
