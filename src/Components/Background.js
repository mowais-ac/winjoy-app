import React from 'react';
import {Image, StyleSheet, Dimensions, StatusBar} from 'react-native';

import {Images} from '../Constants/Index';

const {width, height} = Dimensions.get('window');

const Background = props => {
  const val = props.height || 0.5;
  const extra =
    Platform.OS === 'android'
      ? StatusBar.currentHeight + Dimensions.get('window').height * 0.005
      : 0;

  const styles = StyleSheet.create({
    image: {
      height: height * val + extra,
      width: width,

      resizeMode: props.resize || 'stretch',
    },
    design: {
      width: width * 0.7,
      height: height * 0.23,
      borderWidth: 5,
      alignSelf: 'baseline',
    },
  });

  const GetImage = () => {
    if (props.green) return Images.BackgroundGreen;
    if (props.yellow) return Images.BackgroundYellow;
    return Images.Background;
  };

  const ImgStyle = [styles.image, props.style];

  return (
    <>
      <Image style={ImgStyle} source={GetImage()} />
      {/* {props.design && <Image source={Images.Design} style={styles.design} />} */}
    </>
  );
};

export default Background;
