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
  Image
} from "react-native";
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
import Header from "../../Components/Header";
import { DealsJoyAPI } from '../../redux/actions';
import { connect, useDispatch, useSelector } from "react-redux";
import Video from "react-native-video";
import Carousel from "react-native-snap-carousel";
import { ButtonWithRightIcon } from '../../Components'
import HowItWorkModal from "../../Components/HowItWorkModal";
import { RFValue } from "react-native-responsive-fontsize";

function ClosingSoon({ item }) {
  let progress = item?.updated_stocks
    ? (item?.updated_stocks / item?.stock) * 100
    : 0;


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
          uri: item?.image,
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
        {item.luckydraw.gift_title}
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
const index = ({ props, navigation }) => {
  const dispatch = useDispatch();
  const dealsJoyData = useSelector(state => state.app.dealsJoyData);
  const [buffer, setBuffer] = useState(false);
  const [videoAction, setVideoAction] = useState(true);
  const [loader, setLoader] = useState(false);
  const [activeSlide, setActiveSlide] = useState();
  const AddModalState = useRef();
  useEffect(() => {
    dispatch(DealsJoyAPI());
  }, []);
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
    <ScrollView
      style={{ backgroundColor: "#ffffff" }}
    // refreshControl={
    //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
    // }
    >
      <LinearGradient colors={["#5B0C86", "#E7003F"]} style={styles.mainView}>
        <Header style={{ top: 5, position: 'absolute', zIndex: 1000, left: 0 }} />
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
              data={dealsJoyData?.banners}
              sliderWidth={width}
              itemWidth={width}
              renderItem={_renderItem}
              style={styles.ShoppingBanner}
              onSnapToItem={index => setActiveSlide(index)}
            />
          )}
        </View>
     
        <TouchableOpacity onPress={() => { AddModalState.current(true) }}>
          <View style={{ flexDirection: 'row', marginTop: height * 0.015,justifyContent:'center',width:width }}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/imgs/circlePlaybtn.png')}
            />
            <Label primary font={RFValue(13)} bold dark style={{ color: "#ffff", width: width * 0.4 }}>
              How it works
            </Label>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            width: width * 1,
            backgroundColor: "rgba(178, 190, 181,0.5)",
            marginTop: height * 0.02,
          }}
        />
        <Label
          notAlign
          primary
          font={16}
          dark
          style={{
            color: "#ffff",
            marginLeft: 10,
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
          data={dealsJoyData?.products}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BottomTabStack", {
                  screen: "PRODUCTS",
                  params: {
                    screen: 'ProductDetail',
                    params: {
                      data: item
                    },
                  }
                });
              }}
            >
              <ClosingSoon props={props} index={item.index} item={item} />
            </TouchableOpacity>
            // , { data: item }
          )}
          keyExtractor={(item) => item.id}
        //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
        />
        <View
          style={{
            height: 1,
            width: width * 1,
            backgroundColor: "#E74F7D",
            marginTop: 13,
          }}
        />
        <TouchableOpacity onPress={() =>
          navigation.navigate("BottomTabStack", {
            screen: "PRODUCTS",

          })
        }>
          <Label
            primary
            font={16}
            bold
            dark
            style={{
              color: "#ffffff",
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            View All Prizes
          </Label>
        </TouchableOpacity>
        <View style={{ marginBottom: height * 0.01 }} />
      </LinearGradient>
     
      <HomeBottomList data={dealsJoyData?.winners_collection} />
      <View style={{ height: 20 }} />
      <HowItWorkModal ModalRef={AddModalState} details
        cross={true}
        video={"https://winjoy-assets.s3.amazonaws.com/banners/banner-3.mp4"}
      // id={idVideoAdd}
      // onPressContinue={onPressContinue} 
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ShoppingBanner: {
    width: width,
    height: height * 0.3,
    // marginTop: height * 0.015,
    alignSelf: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  bgImageUpperView: {
    width: width * 1.01,
    height: height * 0.3,
    backgroundColor: "rgba(231,0,63,0.15)",
    justifyContent: "flex-end",
    paddingLeft: 16,
    paddingBottom: 10,
  },
  LinerGradientProgrees: {
    width: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    height: 9,
  },
  GreybarWidth: {
    width: widthConverter(120),
    height: 9,
    zIndex: -1,
    position: "absolute",
    backgroundColor: "#EADFE3",
    borderRadius: 9,
  },
  containerprogressBar: {
    width: widthConverter(120),
    marginBottom: 2,
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    height: 3,
    marginLeft: 2,
  },
  mainView: {
    height: heightPercentageToDP("70"),
    width: width,

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: "hidden",
  },
  wrap: {
    width: width,
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default index;
