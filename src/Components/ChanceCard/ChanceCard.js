import React, { useState } from "react";
import { View, Image, Dimensions, TouchableOpacity, Text } from "react-native";
import styles from "./Styles";
import Label from "../Label";
import LinearGradient from "react-native-linear-gradient";
import { heightConverter, widthPercentageToDP } from "../Helpers/Responsive";
import LoaderImage from "../LoaderImage";
import Config from "react-native-config";
import ProgressCircle from 'react-native-progress-circle';
const { width, height } = Dimensions.get("window");
function ChanceCard({ options, onPress, reset, result, optionDisable, data }) {
  let progress = data.item.updated_stocks
    ? (data.item?.updated_stocks / data.item.stock) * 100
    : 0;
  const ImgUrl = `${Config.PRODUCT_IMG}/${data.item.id}/${JSON.parse(data.item.image)[0]
    }`;
  return (
    <TouchableOpacity
      style={{
        width: width - 25,
        height: height * 0.56,
        backgroundColor: "#ffffff",
        marginLeft: 10,
        borderRadius: 10,
        top: 15,
        left: 2,
        // justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        marginBottom: 15,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: width - 25,
          height: height * 0.28,
          borderRadius: 10,
        }}>
        <LoaderImage
          source={{
            uri: ImgUrl.replace("http://", "https://"),
          }}
          style={{
            width: width - 25,
            height: height * 0.25,
          }}

          resizeMode="contain"
        />
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: "#e2ebed" }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 70, marginTop: 5, marginBottom: 5 }}>
          <Text style={{ fontFamily: 'Axiforma-Regular', fontSize: 14 }}>
            Buy outwear jacket
          </Text>
          <Text style={{ fontFamily: 'Axiforma-SemiBold', fontSize: 14, color: "#E7003F" }}>
            AED 240
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 60, marginTop: 5, marginBottom: 5 }}>
        <View>
          <Text style={{ fontFamily: 'Axiforma-Regular', fontSize: 14, color: "#E7003F" }}>
            Get a chance to win
          </Text>
          <Text style={{ fontFamily: 'Axiforma-Regular', fontSize: 14, color: "#000000" }}>
          {data.item.luckydraw.gift_title}
          </Text>
        </View>
        <View>
          <ProgressCircle
            percent={progress}
            radius={35}
            borderWidth={6}
            color="#e7003f"
            shadowColor="#d3d9dd"
            bgColor="#fff"
          >
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ fontFamily: 'Axiforma-SemiBold', fontSize: 12, color: "#E7003F", lineHeight: 12, }}>
                {data.item.updated_stocks || 0}
              </Text>
              <Text style={{ fontFamily: 'Axiforma-SemiBold', fontSize: 12, color: "#E7003F", lineHeight: 12 }}>
                sold
              </Text>
              <Text style={{ fontFamily: 'Axiforma-SemiBold', fontSize: 12, color: "#E7003F", lineHeight: 12 }}>
                out of
              </Text>
              <Text style={{ fontFamily: 'Axiforma-SemiBold', fontSize: 12, color: "#E7003F", lineHeight: 14 }}>
                {data.item.stock}
              </Text>
            </View>
          </ProgressCircle>
        </View>

      </View>
      <View style={{ flexDirection: 'row', width: width - 90, justifyContent: 'space-around',marginTop:5 }}>
        <TouchableOpacity
          //onPress={() => {}}
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              height: heightConverter(45),
              width: widthPercentageToDP(35),
              borderWidth: 2,
              borderColor: '#E7003F',
              borderRadius: 35,
              justifyContent: 'center',
              alignItems: 'center'
            }}


          >
            <Text style={{ fontFamily: 'Axiforma-Regular', fontSize: 16, color: "#E7003F" }}>
              Prize Details
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          //onPress={() => {}}
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={{
              height: heightConverter(45),
              width: widthPercentageToDP(35),
              borderRadius: 35,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            colors={["#E7003F", "#420E92"]}

          >
            <Text style={{ fontFamily: 'Axiforma-Regular', fontSize: 16, color: "#ffffff" }}>
              Buy Now
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Text style={{
         fontFamily: 'Axiforma-Light',
          fontSize: 13,
           color: "#627482",
           textAlign:'center',
           marginTop:5 ,
           width: width - 50,
         }}>
        Max draw date 300 April 2021 or when the campaign
        is sold out, whichever is earliest
      </Text>
      {/* <Label notAlign primary font={16} dark style={{ color: "#000000" }}>
        Get a chance to
        <Label notAlign primary font={16} bold style={{ color: "#E7003F" }}>
          {" "}
          WIN
        </Label>
      </Label>
      <Label notAlign primary font={16} dark style={{ color: "#000000" }}>
        {data.item.luckydraw.gift_title}
      </Label> */}
      {/* <View style={styles.containerprogressBar}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#E7003F", "#420E92"]}
          style={[styles.LinerGradientProgrees, { width: `${progress}%` }]}
        />
        <View style={styles.GreybarWidth} />
      </View>
      <Label primary font={11} dark style={{ color: "#000000", top: 9 }}>
        {data.item.updated_stocks || 0} sold out of {data.item.stock}
      </Label> */}
    </TouchableOpacity>
  );
}

export { ChanceCard };