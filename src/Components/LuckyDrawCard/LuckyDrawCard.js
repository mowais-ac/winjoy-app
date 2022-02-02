import React, { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, Image, } from "react-native";
import { widthConverter } from "../Helpers/Responsive";
import styles from "./Styles";
import CountDown from 'react-native-countdown-component';
import LongButton from "../LongButton";
function LuckyDrawCard({ style, onPress, finish, time, startIn }) {
  const [renderBtn, setRenderBtn] = useState(false);
  console.log("time", time);
  return (
      <View style={[styles.mainView, style]}>
        <Image
          style={[styles.mainView, { position: 'absolute' }]}
          source={require('../../assets/imgs/luckydraw-results.png')}
        />
        <View style={styles.textView}>
        <Text style={[styles.commingSoonTxt, { color: '#D9FE51' }]} >
           LUCKY DRAW
          </Text>
          <Text
          style={[styles.commingSoonTxt,{fontFamily: "Axiforma-bold",}]}
          >
            RESULTS
          </Text>
        </View>
      </View>

  
  );
}

export { LuckyDrawCard };
