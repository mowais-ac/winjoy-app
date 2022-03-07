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
        style={{
          color: '#000000',
          fontFamily: 'Axiforma-SemiBold',
          width: width * 0.44,
          textAlign: 'center',
        }}>
        {short_desc}
      </Text>
      <Text
        style={{
          color: 'blue',
          fontFamily: 'Axiforma-Regular',
          textAlign: 'center',
          width: '85%',
        }}>
        {price} AED
      </Text>
    </TouchableOpacity>
  );
}

export {SecondExperienceCard};
