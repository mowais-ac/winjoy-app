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
  price,
  onPress,
  title,
  description,
  imageUrl,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: height * 0.3,
          width: width * 0.45,
          marginLeft: 10,
        }}>
        <Image
          style={styles.bgImage}
          resizeMode={'cover'}
          source={{
            uri: imageUrl,
          }}
        />
        <View style={styles.bgView}>
          <Text
            numberOfLines={2}
            style={{
              color: '#420E92',
              fontFamily: 'Axiforma-SemiBold',
              fontSize: RFValue(11),
              width: '94%',

              paddingTop: 10,
              paddingBottom: 6,
            }}>
            {title}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#0B2142',
              fontFamily: 'Axiforma-Regular',
              width: '94%',
              fontSize: RFValue(11),
              lineHeight: 15,
            }}>
            {description}
          </Text>
          <Text
            style={{
              color: '#420E92',
              fontFamily: 'Axiforma-SemiBold',
              fontSize: RFValue(11),
              paddingVertical: 10,
            }}>
            AED {price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export {CreatorExperienceCard};
