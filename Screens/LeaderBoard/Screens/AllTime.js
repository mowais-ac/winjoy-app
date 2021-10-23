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
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
function ClosingSoon({ item }) {


  return (
    <View style={{
      width: width * 0.38,
      height: height * 0.26,
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
      Mercedez 2021 Limited
      </Label>  
      <Label  bold font={11} dark style={{ color: "#000000", }}>
      Edition
      </Label>
      <View style={styles.containerprogressBar}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#E7003F", "#420E92"]}
          style={[
            styles.LinerGradientProgrees,
            { width: 80 },
          ]}
        />
        <View style={styles.GreybarWidth} />
      </View>
      <Label primary font={10}  style={{ color: "#877C80",top:4 }}>
        1320 sold out of 2700
      </Label>
      
    </View>
  );
}
const AllTime = (props) => {
  const { Coins, navigation } = props;

  const [Banners, setBanners] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

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
        if (res.status && res.status.toLowerCase() === "success") {
          setBanners(res.data);
        }

      });
    };

    check();

  }
  useFocusEffect(
    React.useCallback(() => {
      UpdateCoinsOnce();
      initialLoad();
    }, [])
  );
  return (
    <View style={{backgroundColor:"rgba(0,0,0,0.0)"}}>

      {/* <LinearGradient
        colors={["#5B0C86", "#E7003F"]}
        style={styles.mainView}
      >



       
      </LinearGradient> */}
     
    </View>
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
    width: 120,
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
    height: height - 190,
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

export default connect(mapStateToProps, mapDispatchToProps)(AllTime);
