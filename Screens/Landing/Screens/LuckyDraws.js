import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Text,
  FlatList,
  ImageBackground
} from "react-native";
import UpdateCoins from "../../../redux/actions/Coins-action";
import { connect } from "react-redux";
import { GetCoins, GetMaxCoins, wait } from "../../../Constants/Functions";
import SafeArea from "../../../Components/SafeArea";
import BackgroundHome from "../../../Components/BackgroundHome";
import LoaderImage from "../../../Components/LoaderImage";
import Label from "../../../Components/Label";
import Header from "../../../Components/Header";
import { Colors, Images } from "../../../Constants/Index";
import { useFocusEffect } from "@react-navigation/native";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
const { width, height } = Dimensions.get("window");
import axios from 'axios';
import LinearGradient from "react-native-linear-gradient";
import HomeBottomList from "../../../Components/HomeBottomList";
import { heightConverter, heightPercentageToDP, widthConverter, widthPercentageToDP } from "../../../Components/Helpers/Responsive";

function ClosingSoon({ item }) {
console.log("itemarr",item);
let progress=(item.updated_stocks?item?.updated_stocks:0/item?.stock)*32
  return (
    <View style={{
      width: width * 0.38,
      height: heightConverter(190),
      backgroundColor: '#ffffff',
      marginLeft: 10,
      borderRadius: 10,
      padding: 10
    }}>

      <Image
        style={{
          width: 130,
          height: 100,
        }}
        source={require('../../../assets/imgs/jeep.png')}
      />
      <Label  primary font={11} dark style={{ color: "#000000" }}>
        Get a chance to
        <Label notAlign bold primary font={11} bold style={{ color: "#E7003F" }}>
          {" "}WIN
        </Label>
      </Label>
      <Label  bold font={11} dark style={{ color: "#000000", }}>
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
          style={[
            styles.LinerGradientProgrees,
            { width: widthPercentageToDP(progress) },
          ]}
        />
        <View style={styles.GreybarWidth} />
      </View>
      <Label primary font={10}  style={{ color: "#877C80",top:4 }}>
      {item.updated_stocks?item.updated_stocks:0}  sold out of  {item.stock}
      </Label>
    </View>
  );
}
const LuckyDraws = (props) => {
  const { Coins, navigation } = props;

  const [Banners, setBanners] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [productList, setProductList] = React.useState([]);

  const onRefresh = React.useCallback(() => {
    // setBanners(null);
    setRefreshing(true);
    UpdateCoinsOnce();
    wait(500).then(() => setRefreshing(false));
  }, []);
  const UpdateCoinsOnce = () => {
    initialLoad();
    props.UpdateCoins(UpdateCoins());
  };
  const CoinChangeRef = useRef();

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
      await axios.get(`${Config.API_URL}/banners`, requestOptions).then(response => {
        let res = response.data;
        console.log('res: ', res)
        if (res.status && res.status.toLowerCase() === "success") {
          setBanners(res.data);
        }

      });
    };

    check();

  }
  const ProductList = async() => {

      const Token = await EncryptedStorage.getItem("Token");
      const requestOptions = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
      };
      // alert(13123);
      await axios.get(`${Config.API_URL}/products/list`, requestOptions).then(response => {
        let res = response.data;
        console.log('res plist: ', res)
        let arr=[];
        if (res.status && res.status.toLowerCase() === "success") {
          res.data.map((item) => {
            item.map((v, i)=>{
              arr.push(v)
            })
          });
      
         setProductList(arr);
        }

      });

  }
  useFocusEffect(
    React.useCallback(() => {
      UpdateCoinsOnce();
      initialLoad();
      ProductList();
    }, [])
  );
  return (
    <ScrollView
    style={{backgroundColor:'#ffffff'}}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >

      <LinearGradient
        colors={["#5B0C86", "#E7003F"]}
        style={styles.mainView}
      >



        {Banners === null ? (
          <ActivityIndicator size="large" color={Colors.BLACK} />
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("EShopping")}>
            {/* <LoaderImage
              source={{ uri: Banners[1].replace('http://', 'https://') }}
              style={styles.ShoppingBanner}
            /> */}
            <ImageBackground
              style={styles.ShoppingBanner}
              source={require('../../../assets/imgs/banner.png')}
            >
              <View style={styles.bgImageUpperView}>
                <Label notAlign bold primary font={40} bold style={{ color: "#FFFF13" }}>
                  Win
                </Label>
                <Label primary font={16} bold notAlign dark style={{ color: "#ffffff",   }}>
                The National Day Grand Prize
                </Label>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}

        <Label notAlign primary font={16} dark style={{ color: "#ffff", marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
          Closing Soon
        </Label>
        <FlatList
          horizontal={true}
          style={{ marginLeft: 1, minHeight: 50, }}
          contentContainerStyle={{ alignSelf: "flex-start" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={productList}
          renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>navigation.navigate('SimpeStackScreen',{screen:'PrizeList'})}>
              <ClosingSoon
              props={props}
              index={item.index}
              item={item}

            />
          </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
        />
        <View style={{ height: 1, width: width * 1, backgroundColor: '#E74F7D', marginTop: 13 }} />
        <Label primary font={16} bold dark style={{ color: "#ffffff", marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
          View All Prizes
        </Label>
        <View style={{ marginBottom: height * 0.01 }} />
      </LinearGradient>
      <HomeBottomList />
      <View style={{height:20}}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ShoppingBanner: {
    width: width * 1.01,
    height: height * 0.3,
    marginTop: height * 0.015,
    resizeMode: "stretch",
    alignSelf: "center",

  },
  bgImageUpperView: {
    width: width * 1.01,
    height: height * 0.3,
    backgroundColor: 'rgba(231,0,63,0.15)',
    justifyContent: 'flex-end',
    paddingLeft: 16,
    paddingBottom:10
  },
  LinerGradientProgrees: {
    alignItems: "center",
    justifyContent: "center",
    width: 25,
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
    width: 100,
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
    overflow: 'hidden',
  }
});

const mapStateToProps = (state) => {
  const { Coins } = state;
  return {
    Coins,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateCoins: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LuckyDraws);
