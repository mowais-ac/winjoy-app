import React, { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, Image, } from "react-native";
import { widthConverter } from "../Helpers/Responsive";
import styles from "./Styles";
import CountDown from 'react-native-countdown-component';
import LongButton from "../LongButton";
function HomeCard({ style, onPress, gameShowData, time, startIn }) {
  const [renderBtn, setRenderBtn] = useState(false);
  console.log("time", time);
  return (
    <View style={[styles.mainView, style]}>
      <Image
        style={[styles.mainView, { position: 'absolute', overlayColor: 'white', }]}
        source={require('../../assets/imgs/trivia-coming-soon.gif')}
      />
      <View style={styles.textView}>
        {!renderBtn ? (
          <>
            <Text allowFontScaling={false}
              style={styles.commingSoonTxt}>
              LIVE
            </Text>
            <Text allowFontScaling={false}
              style={[styles.commingSoonTxt, { color: '#D9FE51' }]} >
              TRIVIA
            </Text>
            {!gameShowData ? (
              <Text allowFontScaling={false}
                style={[styles.commingSoonTxt, { fontSize: 16 }]}
              >
              {gameShowData}
              </Text>
            ) : (
              <LongButton
                style={[
                  styles.Margin,
                  { backgroundColor: null, bottom: -3, left: -13, borderWidth: 2, borderColor: '#ffff' }]}
                textstyle={{ color: "#fff", fontFamily: "Axiforma SemiBold", fontSize: 12 }}
                text="Lets Begin"
                font={15}
                shadowless
                onPress={onPress}
              />)}
          </>
        ) : (
          <>
            <Text allowFontScaling={false} style={styles.commingSoonTxt}>
              TRIVIA
            </Text>

            <Text allowFontScaling={false} style={[styles.commingSoonTxt, { color: '#D9FE51' }]} >
            COMING
            </Text>

            <Text allowFontScaling={false}
              style={[styles.commingSoonTxt, { color: '#D9FE51' }]} >
              SOON
            </Text>

            <CountDown
              style={{ marginTop: 6 }}
              size={16}
              until={time}
              onFinish={() => setRenderBtn(true)}
              digitStyle={{ borderColor: '#D9FE51', borderWidth: 1 }}
              digitTxtStyle={{ color: '#D9FE51', fontSize: 18, fontFamily: 'Axiforma-Medium' }}
              timeLabelStyle={{ color: 'red', }}
              separatorStyle={{ color: '#D9FE51', paddingLeft: 5, paddingRight: 5 }}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{ m: null, s: null }}
              showSeparator
            />
          </>
        )}
      </View>
    </View>


  );
}

export { HomeCard };
