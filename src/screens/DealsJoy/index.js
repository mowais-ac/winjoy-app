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
} from "react-native";
import {  wait } from "../../Constants/Functions";
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
function ClosingSoon({ item }) {
  let progress = item.updated_stocks
    ? (item?.updated_stocks / item?.stock) * 100
    : 0;

  const ImgUrl = `${Config.PRODUCT_IMG}/${item.id}/${
    JSON.parse(item.image)[0]
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
const index = (props) => {
  const { Coins, navigation } = props;

  const [Banners, setBanners] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [productList, setProductList] = React.useState([]);
  const [winnerData, setWinnerData] = useState([]);
  // const onRefresh = React.useCallback(() => {
  //   // setBanners(null);
  //   setRefreshing(true);
  //   UpdateCoinsOnce();
  //   wait(500).then(() => setRefreshing(false));
  // }, []);
  const UpdateCoinsOnce = () => {
    initialLoad();
    props.UpdateCoins(UpdateCoins());
  };
  const initialLoad = () => {
    const check = async () => {
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
        .get(`${Config.API_URL}/banners`, requestOptions)
        .then((response) => {
          let res = response.data;
          if (res.status && res.status.toLowerCase() === "success") {
            setBanners(res.data);
          }
        });
    };

    check();
  };
  const ProductList = async () => {
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
      .get(`${Config.API_URL}/products/list`, requestOptions)
      .then((response) => {
        let res = response.data;
        let arr = [];
        if (res.status && res.status.toLowerCase() === "success") {
          res.data.map((item) => {
            console.log("item",item);
            item.map((v, i) => {
              arr.push(v);
            });
          });

          setProductList(arr);
        }
      });
  };
  const PastWinner = async () => {
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    }; 
    // alert(13123);
    
    await axios.get(`${Config.API_URL}/luckydraw/winner`, requestOptions).then(response => {
      let res = response;
      setWinnerData(res?.data[0])
    });
  
  }
  useFocusEffect(
    React.useCallback(() => {
    //  UpdateCoinsOnce();
      initialLoad();
      ProductList();
      PastWinner();
    }, [])
  );
 
  return (
    <ScrollView
      style={{ backgroundColor: "#ffffff" }}
      // refreshControl={
      //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      // }
    >
      <LinearGradient colors={["#5B0C86", "#E7003F"]} style={styles.mainView}>
      <Header style={{ top: 5, position: 'absolute', zIndex: 1000,left:0 }} />
        {Banners === null ? (
          <ActivityIndicator size="large" color={Colors.BLACK} />
        ) : (
             <LoaderImage
              source={{ uri: Banners[1].replace('http://', 'https://') }}
              style={styles.ShoppingBanner}
              resizeMode="contain"
            /> 
        )}

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
          data={productList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SimpeStackScreen",{screen:"ProductDetail",params:item})
              }
            >
              <ClosingSoon props={props} index={item.index} item={item} />
            </TouchableOpacity>
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
        <TouchableOpacity onPress={()=>navigation.navigate("TabsStack", { screen: "Product" })}>
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
      <HomeBottomList data = {winnerData}/>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ShoppingBanner: {
    width: "100%",
    height: height * 0.3,
    alignSelf: "center",
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
});

export default index;
