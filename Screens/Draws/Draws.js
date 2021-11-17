import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Image
} from "react-native";
import { connect } from "react-redux";
import Tabs from './Tabs/Tabs';
import BackgroundRound from "../../Components/BackgroundRound";
import Header from "../../Components/Header";
import Label from "../../Components/Label";
import LinearGradient from "react-native-linear-gradient";
const { width, height } = Dimensions.get("window");
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
      height: height * 0.24,
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
        source={{
          uri: 'https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg'
        }}
      />
      <Label notAlign primary font={12} dark style={{ color: "#000000" }}>
        Get a chance to
        <Label notAlign primary font={12} bold style={{ color: "#E7003F" }}>
          {" "}WIN
        </Label>
      </Label>
      <Label primary font={12} dark style={{ color: "#000000", }}>
        {item.title}
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
      <Label primary font={12} dark style={{ color: "#000000", }}>
        1320 sold out of 2700
      </Label>
    </View>
  );
}
const Draws = (props) => {

  return (

    <>
      <BackgroundRound height={1}/>
      <View style={{ height: 20 }} />
      <Header/>

      <Tabs />
     
    </>

  );
};

const styles = StyleSheet.create({
  ShoppingBanner: {
    width: width * 1.01,
    height: height * 0.245,
    marginTop: height * 0.015,
    resizeMode: "stretch",
    alignSelf: "center",

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

export default connect(mapStateToProps, mapDispatchToProps)(Draws);
