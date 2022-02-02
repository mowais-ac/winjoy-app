import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, ActivityIndicator, Image } from "react-native";
import { widthConverter, widthPercentageToDP } from "../Helpers/Responsive";
import styles from "./Styles";

function ButtonWithRightIcon({ btnStyle, textStyle, onPress, text, activity, activityColor, disabled }) {
  return (
    <TouchableWithoutFeedback
      disabled={activity || disabled}
      onPress={onPress}>
      <View
        style={[
          {
            backgroundColor: "#fff",
            padding: '3%',
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            width: widthPercentageToDP("93%"),
            flexDirection: 'row',
            paddingLeft: 25,
            paddingRight: 25,
          },
          btnStyle,
        ]}
      >
        {activity ? (

          <ActivityIndicator size="small" color={activityColor ? activityColor : "#E7003F"} />

        ) : (
          <View style={{flexDirection:'row',width:widthPercentageToDP("45%"),alignItems:'center',justifyContent:'space-around'}}>
            <Image
              style={{ height: 30, width: 30 }}
              source={require('../../assets/imgs/circlePlaybtn.png')}
              resizeMode={"stretch"}
            />
            <Text
              style={[styles.text, textStyle]}
            >
              {text}
            </Text>

          </View>
        )}

      </View>
    </TouchableWithoutFeedback>
  );
}

export { ButtonWithRightIcon };
