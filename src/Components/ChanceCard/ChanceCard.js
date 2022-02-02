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
function ChanceCard({ onPress, updated_stocks, stock, title, description, image, price, prize_title }) {
  console.log("stockk", stock);
  let progress = updated_stocks
    ? (updated_stocks / stock) * 100
    : 0;

  return (
    <View
      style={{
        width: width * 0.94,
        height: height * 0.53,
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

    >
      <View
        style={{
          width: width * 0.95,
          height: height * 0.28,
          borderRadius: 10,
          marginTop: height * 0.02
        }}>
        <LoaderImage
          source={{
            uri: image,
          }}
          style={{
            width: width * 0.95,
            height: height * 0.25,

          }}

          resizeMode="contain"
        />
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: "#e2ebed" }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 70, marginTop: 5, marginBottom: 5 }}>
          <Text style={{ fontFamily: 'Axiforma-Regular', fontSize: 14, color: 'grey' }}>
            {title}
          </Text>
          <Text style={{ fontFamily: 'Axiforma-SemiBold', fontSize: 14, color: "#E7003F" }}>
            {price}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 60, marginTop: 5, marginBottom: 5 }}>
        <View>
          <Text style={{ fontFamily: 'Axiforma-Regular', fontSize: 14, color: "#E7003F" }}>
            Get a chance to win
          </Text>
          <Text style={{ fontFamily: 'Axiforma-Regular', fontSize: 14, color: "#000000" }}>
            {prize_title}
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
              <Text style={{ fontFamily: 'Axiforma SemiBold', fontSize: 12, color: "#E7003F", lineHeight: 12, }}>
                {updated_stocks || 0}
              </Text>
              <Text style={{ fontFamily: 'Axiforma SemiBold', fontSize: 12, color: "#E7003F", lineHeight: 12 }}>
                sold
              </Text>
              <Text style={{ fontFamily: 'Axiforma SemiBold', fontSize: 12, color: "#E7003F", lineHeight: 12 }}>
                out of
              </Text>
              <Text style={{ fontFamily: 'Axiforma SemiBold', fontSize: 12, color: "#E7003F", lineHeight: 14 }}>
                {stock}
              </Text>
            </View>
          </ProgressCircle>
        </View>

      </View>
      <View style={{ flexDirection: 'row', width: width - 90, justifyContent: 'space-around', marginTop: 5 }}>
        <TouchableOpacity
          onPress={onPress}
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
          onPress={onPress}
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
        textAlign: 'center',
        marginTop: 5,
        width: width - 50,
      }}>
        {description}
      </Text>
    </View>
  );
}

export { ChanceCard };
