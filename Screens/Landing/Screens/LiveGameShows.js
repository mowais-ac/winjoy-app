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
  FlatList
} from "react-native";
import Label from "../../../Components/Label";
const { width, height } = Dimensions.get("window");
import LinearGradient from "react-native-linear-gradient";
import HomeBottomList from "../../../Components/HomeBottomList";
import { heightConverter, heightPercentageToDP, widthConverter } from "../../../Components/Helpers/Responsive";
const LiveGameShows = ({ props, navigation }) => {

  return (
    <ScrollView>
      <LinearGradient
        colors={["#420E92", "#E7003F"]}
        style={styles.mainView}
      >
       
        <Text style={styles.heading}>
          Daily Challenge & Win
        </Text>
        <Label primary font={16} bold dark style={{ color: "#ffff", lineHeight: 27 }}>
          Answer 12 simple questions and <Label primary font={16} bold dark style={{ color: "yellow", }}>
            WIN
          </Label>
          <Label primary font={20} bold dark style={{ color: "#ffff", }}>
            {" "}amazing prizes
          </Label>
        </Label>
        <TouchableOpacity onPress={() => navigation.navigate("SimpeStackScreen")}>
          <View style={styles.btnView}>
            <Label primary font={16} bold dark style={{ color: "#EA245A", }}>
              Let's Begin
            </Label>
          </View>
        </TouchableOpacity>
        <LinearGradient
          colors={["#FFFF13", "#A4FF00"]}
          style={styles.newGameView}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        >
          <Label primary font={16} bold dark style={{ color: "#420E92", }}>
            NEXT GAME
          </Label>
          <Label primary font={16} dark style={{ color: "#420E92", }}>
            TOMORROW 3PM PST
          </Label>
        </LinearGradient>
      </LinearGradient>
      <HomeBottomList />
      <View style={{ marginBottom: height * 0.05 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height:heightPercentageToDP('55'),
    width: width,

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignItems: 'center'
  },
  newGameView: {
    marginTop: 10,
    width: width - 25,
    height: heightConverter(120),
    justifyContent: 'center',
    borderRadius: 20
  },
  btnView: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    width: width - 200,
    height: heightConverter(60),
    justifyContent: 'center',
    borderRadius: 30
  },
  heading:{
    color: "#ffff",
    fontFamily: "Axiforma-Regular",
    fontSize:35,
    width:widthConverter(210),
    textAlign:'center',
    lineHeight:heightConverter(40),
    marginTop:heightConverter(30)
  }
});



export default LiveGameShows;
