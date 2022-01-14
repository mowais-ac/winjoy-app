import React from "react";
import { TouchableOpacity, Dimensions, Image, Text, ImageBackground } from "react-native";
import Config from "react-native-config";
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get("window");
import styles from "./Styles";
function LifeCard({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={{
          width: width * 0.3,
          height: height * 0.18,
          //   backgroundColor: "black",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        colors={["#420E92", "#E7003F"]}
      >
        <Text style={{ color: '#fff', fontFamily: 'Axiforma SemiBold', fontSize: RFValue(12) }}>
          Buy
        </Text>
        <ImageBackground
          resizeMode="cover"
          style={{ width: 100, height: 80, justifyContent: 'center', alignItems: 'center' }}
          source={require('../../assets/imgs/life.png')}
        >

          <Text style={{ color: "#E7003F", fontFamily: 'Axiforma SemiBold', fontSize: RFValue(20) }}>1</Text>
        </ImageBackground>
        <Text style={styles.text}>
          5 AED
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export { LifeCard };
