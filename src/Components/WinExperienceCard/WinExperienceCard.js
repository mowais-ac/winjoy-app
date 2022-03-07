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
  fun,
}) {
  return (
    <TouchableOpacity onPress={fun}>
      <View style={style}>
        <LoaderImage
          source={{
            uri: thumbnail,
          }}
          style={imageStyle}
          resizeMode="cover"
        />

        <View style={{paddingTop: 10}}>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Axiforma-SemiBold',
              textAlign: 'center',
              fontSize: RFValue(12),
              allowFontScaling: false,
              height: 29,
            }}>
            {short_desc}
          </Text>
        </View>
        <View
          style={{
            marginBottom: 5,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onPress}>
            <LinearGradient
              style={{
                paddingVertical: 6,
                borderRadius: height * 0.05,
                width: 130,
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#f8d7e8', '#c7dfe8']}>
              <Text numberOfLines={3} style={styles.textHeading}>
                Find Products
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export {WinExperienceCard};
