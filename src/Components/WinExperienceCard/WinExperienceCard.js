import React, {useState} from 'react';
import {View, Image, Dimensions, TouchableOpacity, Text} from 'react-native';
import styles from './Styles';
import Label from '../Label';
import LinearGradient from 'react-native-linear-gradient';
import {heightConverter, widthPercentageToDP} from '../Helpers/Responsive';
import LoaderImage from '../LoaderImage';
import Config from 'react-native-config';
import ProgressCircle from 'react-native-progress-circle';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('window');
function WinExperienceCard({
  imageStyle,
  style,
  onPress,
  short_desc,
  thumbnail,
}) {
  return (
    <View
      // onPress={onPress}
      style={style}>
      <View style={{paddingBottom: 10}}>
        <LoaderImage
          source={{
            // uri: ImgUrl.replace("http://", "https://"),
            uri: thumbnail,
          }}
          style={imageStyle}
          resizeMode="cover"
        />
        <View style={{paddingHorizontal: 10}}>
          <View
            style={{
              paddingTop: 10,
            }}>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Axiforma-SemiBold',
                textAlign: 'left',
                fontSize: RFValue(12),
              }}>
              {short_desc}
            </Text>
          </View>
          <TouchableOpacity onPress={onPress}>
            <LinearGradient
              style={{
                marginTop: height * 0.01,
                paddingVertical: 6,
                borderRadius: height * 0.05,
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#f8d7e8', '#c7dfe8']}>
              <Text style={[styles.textHeading, {textAlign: 'center'}]}>
                Find Products
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export {WinExperienceCard};
