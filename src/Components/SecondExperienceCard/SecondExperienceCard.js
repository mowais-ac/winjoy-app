import React, {useState} from 'react';
import {View, Image, Dimensions, TouchableOpacity, Text} from 'react-native';
import styles from './Styles';

const {width, height} = Dimensions.get('window');
function SecondExperienceCard({
  style,
  onPress,
  heading,
  cover_photo,
  short_desc,
  price,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[style]}>
      <View>
        <Image
          style={styles.bgImage}
          source={{
            uri: cover_photo,
          }}
        />
      </View>
      <Text
        numberOfLines={3}
        style={{
          color: '#000000',
          height: 30,
          fontFamily: 'Axiforma-SemiBold',
          width: width * 0.44,
          textAlign: 'center',
          lineHeight: 25,
        }}>
        {short_desc}
      </Text>
      <Text
        style={{
          color: '#eb3d6e',
          fontFamily: 'Axiforma-Regular',
          textAlign: 'center',
          width: '85%',
          fontWeight: '700',
        }}>
        AED {price}
      </Text>
    </TouchableOpacity>
  );
}

export {SecondExperienceCard};
