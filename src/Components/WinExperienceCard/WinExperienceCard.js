import React, {useState} from 'react';
import {View, Dimensions, TouchableOpacity, Text, Image} from 'react-native';
import styles from './Styles';
import LinearGradient from 'react-native-linear-gradient';
import LoaderImage from '../LoaderImage';
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
    <TouchableOpacity activeOpacity={0.6} onPress={fun}>
      <View style={style}>
        {/*  <LoaderImage
          source={{
            uri: thumbnail,
          }}
          style={imageStyle}
          resizeMode="cover"
        /> */}
        <Image
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
