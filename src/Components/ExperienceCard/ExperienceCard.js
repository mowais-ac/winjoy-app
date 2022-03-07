import React, {useState} from 'react';
import {View, Image, Dimensions, TouchableOpacity, Text} from 'react-native';
import styles from './Styles';
import Label from '../Label';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('window');
function ExperienceCard({
  style,
  textStyle,
  onPress,
  title,
  short_desc,
  imageUrl,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[{width: 200}, style]}>
      <View>
        <Image
          style={[styles.bgImage, style]}
          source={{
            uri: imageUrl,
          }}
        />
        <LinearGradient
          colors={['rgba(0,0,128,0)', 'rgba(0,0,128,0)', 'rgba(0,0,128,0.9)']}
          style={[styles.bgView, style]}>
          <Text
            style={{
              color: '#ffffff',
              fontFamily: 'Axiforma-SemiBold',
              fontSize: RFValue(13),
              marginBottom: 2,
            }}>
            {title}
          </Text>
          <Text
            style={[
              {
                color: '#ffffff',
                fontFamily: 'Axiforma-Regular',
                textAlign: 'center',
                width: '98%',
              },
              textStyle,
            ]}>
            {short_desc}
          </Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

export {ExperienceCard};
