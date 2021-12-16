import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback,ActivityIndicator,Image } from "react-native";
import { widthConverter, widthPercentageToDP } from "../Helpers/Responsive";
import styles from "./Styles";

function ButtonWithIcon({ btnStyle, textStyle, onPress, text,activity,activityColor,disabled}) {
  return (
    <TouchableWithoutFeedback
    disabled={activity||disabled}
    onPress={onPress}>
      <View
        style={[
          {
            backgroundColor: "#fff",
            padding: '3%',
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 10,
            width: widthPercentageToDP("93%"),
            flexDirection:'row',
            paddingLeft:25,
            paddingRight:25,
          },
          btnStyle,
        ]}
      >
      {activity?(
       
        <ActivityIndicator size="small" color={activityColor?activityColor:"#E7003F"} />
       
      ):(
      <>
        <Text
        style={[styles.text, textStyle]}
      >
        {text}
        </Text>
        <Image
          style={{height:30,width:45}}
          source={require('../../assets/imgs/Wrong.png')}
          resizeMode={"stretch"}
        />
      </>
      )}
       
      </View>
    </TouchableWithoutFeedback>
  );
}

export { ButtonWithIcon };
