import React from "react";
import { View, Dimensions,Text } from "react-native";
import Config from "react-native-config";
import LoaderImage from "../LoaderImage";
const { width, height } = Dimensions.get("window");
import ProgressCircle from 'react-native-progress-circle';
function Card({ options, onPress, reset, result, optionDisable,imageUrl,updated_stocks,stock }) {
  let progress = updated_stocks
  ? (updated_stocks / stock) * 100
  : 0;
  return (
    <View
      style={{
        width: width - 25,
        height: height * 0.21,
        backgroundColor: "#ffffff",
        marginLeft: 10,
        borderRadius: 10,
        padding: 10,
        top: 15,
        left: 2,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        marginBottom: 15,
      }} 
    >
          <View style={{position:'absolute',top:10,zIndex:1000,left:10}}>
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
      <LoaderImage
        source={{
          uri: imageUrl,
        }}
        style={{
          width: 230,
          height: 120,
        }}
        resizeMode="contain"
      />
    </View>
  );
}

export { Card };
