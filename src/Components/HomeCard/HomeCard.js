import React, { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, Image, } from "react-native";
import { widthConverter } from "../Helpers/Responsive";
import styles from "./Styles";
import CountDown from 'react-native-countdown-component';
function HomeCard({ style, startAt, onPress, finish, time, startIn }) {
console.log("time",time);
  return (
    <TouchableWithoutFeedback 
      onPress={onPress}
    >
      <View style={[styles.mainView, style]}>
        <Image
          style={[styles.mainView, { position: 'absolute' }]}
          source={require('../../assets/imgs/trivia-coming-soon.png')}
        />
        <View style={styles.textView}>
          <Text
            style={styles.commingSoonTxt}
          >
            TRIVIA
          </Text>
          <Text
            style={[styles.commingSoonTxt, { color: '#D9FE51' }]} >
            COMING
          </Text>
          <Text
            style={[styles.commingSoonTxt, { color: '#D9FE51' }]} >
            SOON
          </Text>
          <CountDown
            style={{ marginTop: 6 }}
            size={16}
            until={time}
            onFinish={finish}
            digitStyle={{ borderColor: '#D9FE51', borderWidth: 1 }}
            digitTxtStyle={{ color: '#D9FE51', fontSize: 18, fontFamily: 'Axiforma-Medium' }}
            timeLabelStyle={{ color: 'red', }}
            separatorStyle={{ color: '#D9FE51', paddingLeft: 5, paddingRight: 5 }}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{ m: null, s: null }}
            showSeparator
          />
        </View>
      </View>

    </TouchableWithoutFeedback>
  );
}

export { HomeCard };
