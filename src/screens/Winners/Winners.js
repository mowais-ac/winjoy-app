import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import Tabs from './Tabs/Tabs';
import BackgroundRound from "../../Components/BackgroundRound";
import Header from "../../Components/Header";
import Label from "../../Components/Label";
import LinearGradient from "react-native-linear-gradient";
import { heightConverter, heightPercentageToDP, widthConverter } from "../../Components/Helpers/Responsive";
import { TriviaAvatar } from "../../Components";
const { width, height } = Dimensions.get("window");
let data = [1, 2, 3]

const Winners = (props) => {

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

  mainView: {
    height: heightPercentageToDP("100%")
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

export default connect(mapStateToProps, mapDispatchToProps)(Winners);
