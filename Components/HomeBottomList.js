import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions, TouchableOpacity, FlatList, View } from "react-native";
import Label from "../Components/Label";
import { Images } from "../Constants/Index";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import axios from "axios";
const { width, height } = Dimensions.get("window");

function ClosingSoon({ item }) {

  return (
    <View style={{
      width: width * 0.7,
      height: height * 0.2,
      backgroundColor: '#F4EDEF',
      marginLeft: 10,
      borderRadius: 10,
      padding: 10,
      justifyContent: 'center'
    }}>

      <View style={{ flexDirection: 'row', }}>
        <Image
          style={{
            width: 60,
            height: 100,
          }}
          resizeMode={"contain"}
          source={{uri:item?.product_image}}

        />
        <View style={{ marginLeft: width * 0.14, }}>
          <Label notAlign primary font={12} bold style={{ color: "#E7003F" }}>
            Congratulations
          </Label>
          <Label notAlign bold font={12} dark style={{ color: "#000000", width: width * 0.3, }}>
           {item.winnerfull_name || (item?.user?.first_name + " " + item?.user?.last_name)}
          </Label>
          <Label notAlign primary font={12} dark style={{ color: "#000000", width: width * 0.3, }}>
            on winning
          </Label>
          <Label notAlign bold font={12} dark style={{ color: "#000000", width: width * 0.3, }}>
            {item.product_title}
          </Label>
        </View>
      </View>

    </View>
  );
}
const HomeBottomList = (props) => {

  const navigation = useNavigation();
  const { data } = props;



  return (
    <>
      <Label primary font={16} bold style={{ color: "#E7003F", marginTop: 10 }}>
        Past Winners
      </Label>
      <FlatList
        horizontal={true}
        style={{ marginLeft: 1, minHeight: 50, }}
        contentContainerStyle={{ alignSelf: "flex-start",paddingRight: width * 0.03 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <ClosingSoon
            props={props}
            index={item.index}
            item={item}

          />
        )}
        keyExtractor={(item) => item.id}
      //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
      />
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
  mainView: {
    height: height - 250,
    width: width,

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: 'hidden',
  }
});
const mapStateToProps = (state) => {
  const { Bell } = state;
  return {
    Bell,
  };
};

export default connect(mapStateToProps, null)(HomeBottomList);
