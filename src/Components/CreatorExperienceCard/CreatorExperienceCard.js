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
function CreatorExperienceCard({
  style,
  textStyle,
  onPress,
  title,
  short_desc,
  imageUrl,
}) {
  return (
    <TouchableOpacity style={{paddingHorizontal: 8}} onPress={onPress}>
      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 15,

          width: '100%',
        }}>
        <Image
          style={styles.bgImage}
          source={{
            uri: imageUrl,
          }}
        />
        <View style={styles.bgView}>
          <Text
            style={{
              color: '#420E92',
              fontFamily: 'Axiforma-SemiBold',
              fontSize: RFValue(13),
              marginBottom: 2,
            }}>
            Baby Mares
          </Text>
          <Text
            style={{
              color: '#0B2142',
              fontFamily: 'Axiforma-Regular',
              width: width * 0.4,
            }}>
            Hi! I make great videos! Loving myFanPark!
          </Text>
          <Text
            style={{
              color: '#420E92',
              fontFamily: 'Axiforma-SemiBold',
              fontSize: RFValue(13),
              paddingVertical: 10,
            }}>
            AED 240
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export {CreatorExperienceCard};
