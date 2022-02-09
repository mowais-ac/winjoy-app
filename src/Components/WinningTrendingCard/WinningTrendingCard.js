import React, { useState } from "react";
import { View, Image, Dimensions, TouchableOpacity, Text } from "react-native";
import styles from "./Styles";
import Label from "../Label";
import LinearGradient from "react-native-linear-gradient";
import { heightConverter, widthPercentageToDP } from "../Helpers/Responsive";
import LoaderImage from "../LoaderImage";
import Config from "react-native-config";
import ProgressCircle from 'react-native-progress-circle'
import { RFValue } from "react-native-responsive-fontsize";
import * as Progress from 'react-native-progress';
import { FormatNumber } from "../../Constants/Functions"; 
const { width, height } = Dimensions.get("window");
function WinningTrendingCard({ imageStyle, style, onPress, title, price, imageUrl, mainViewStyle, updated_stocks, stock,trending }) {
  return (
   <TouchableOpacity onPress={onPress}>
      <View
      style={{
        width: width * 0.4,
        height:height*0.25,
        backgroundColor: "#ffffff",
        marginLeft: 10,
        borderRadius: 10,
        padding: 10,
        justifyContent:'center',
        alignItems:'center'
       
      }}
    >
      {trending?(
          <Image
          source={require('../../assets/imgs/trendingStar.png')}
          style={{ width: 25, height: 25,position:'absolute',top:10,left:10,zIndex:1000,}}
        />
      ):null}
    
      <LoaderImage
        source={{
          // uri: ImgUrl.replace("http://", "https://"),
          uri: imageUrl
        }}
        style={{
          width: 120,
          height: 90,
        }}
        resizeMode="contain"
      />
   
      <Label bold font={11} dark style={{ color: "#000000", width:width*0.35,}}>
        {title}
      </Label>
      <Label bold font={13} dark style={{ color: "#E7003F",width:width*0.35,paddingVertical:4 }}>
        AED {FormatNumber(price)}
      </Label> 
      
    {trending?(
      <>
          <Progress.Bar
          progress={1/stock}
          width={130}
          color={'#E7003F'}
          unfilledColor={"#D7D7EB"}
          borderWidth={0}
          height={7}
        />
     
      <Label primary font={10} style={{ color: "#877C80", top: 4,width:width*0.35,}}>
        {updated_stocks ? updated_stocks : 0} sold out of {stock}
      </Label>
      </>
    ):null}
    </View>
    </TouchableOpacity>
  );
   
}

export { WinningTrendingCard };
