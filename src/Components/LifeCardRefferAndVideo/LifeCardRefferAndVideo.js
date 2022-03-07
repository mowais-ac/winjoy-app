import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Config from 'react-native-config';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('window');
import styles from './Styles';
function LifeCardRefferAndVideo({
  imagePath,
  heading,
  description,
  onPress,
  video_url,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: width * 0.45,
          height: height * 0.2,
          backgroundColor: '#fff',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="cover"
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: height * 0.02,
          }}
          source={imagePath}
        />

        <Text style={styles.text}>{heading}</Text>
        <Text style={styles.text2}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export {LifeCardRefferAndVideo};
