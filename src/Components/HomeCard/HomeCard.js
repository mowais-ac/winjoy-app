import React, { useState } from "react";
import { View, Text, Dimensions, TouchableWithoutFeedback, StyleSheet, Image, } from "react-native";
import { widthConverter } from "../Helpers/Responsive";
import styles from "./Styles";
import CountDown from 'react-native-countdown-component';
import LongButton from "../LongButton";
import Carousel from 'react-native-snap-carousel';
function HomeCard({ style, onPress, gameShow, time, images }) {
  console.log("images", images);
  const { width, height } = Dimensions.get("window");
  const [renderBtn, setRenderBtn] = useState(false);
  function _renderItem({ item, index }) {
    console.log("test", item.url);
    return (
      <View key={index}>
        <Image
          style={[styles.mainView, { overlayColor: '#f6f1f3' }]}
          source={{ uri: item.url }}
        />
      </View>
    )
  }
  return (
    <View style={[styles.mainView, style]}>
      <View style={[styles.mainView, { position: 'absolute', overlayColor: '#f6f1f3' }]}>
        <Carousel
          layout={"default"}
          resizeMode={"cover"}
          loop={true}
          autoplay={true}
          autoplayInterval={3000}

          // ref={ref => this.carousel = ref}
          data={images}
          sliderWidth={width}
          itemWidth={width}
          renderItem={_renderItem}
          style={styles.mainView}
        // onSnapToItem={index => setActiveSlide(index)}
        />
      </View>
      {/* <Image
          style={[styles.mainView, { position: 'absolute', overlayColor: '#f6f1f3', }]}
          source={{uri:image}}
        /> */}
      <View style={styles.textView}>
        {renderBtn || time<=0 ? (
          <>
            <Text
              style={styles.commingSoonTxt}
            >
              LIVE
            </Text>
            <Text
              style={[styles.commingSoonTxt, { color: '#D9FE51' }]} >
              TRIVIA
            </Text>
            {gameShow==="no Live game shoe at this time" ? (
              <Text
                style={[styles.commingSoonTxt, { fontSize: 16 }]}
              >
               no Live game show at this time
              </Text>
            ) : (
              <LongButton
                style={[
                  styles.Margin,
                  { backgroundColor: null, bottom: -3, left: 0, borderWidth: 2, borderColor: '#fff' },
                ]}
                textstyle={{ color: "#fff", fontFamily: "Axiforma-SemiBold", fontSize: 14 }}
                text="Lets Begin"
                font={16}
                shadowless
                onPress={onPress}
              />
            )}
          </>
        ) : (
          <>
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
              onFinish={() => setRenderBtn(true)}
              digitStyle={{ borderColor: '#D9FE51', borderWidth: 1 }}
              digitTxtStyle={{ color: '#D9FE51', fontSize: 18, fontFamily: 'Axiforma-Medium' }}
              timeLabelStyle={{ color: 'red', }}
              separatorStyle={{ color: '#D9FE51', paddingLeft: 5, paddingRight: 5 }}
              timeToShow={['D', 'H', 'M', 'S']}
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
