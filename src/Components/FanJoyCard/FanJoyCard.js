import React from 'react';
import {View, Image, Dimensions, TouchableOpacity, Text} from 'react-native';
import styles from './Styles';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';

function FanJoyCard({style, id, name, fans, imageUrl}) {
  function nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
  }

  //console.log({thousands: formatCash(100000)});
  const navigation = useNavigation();
  const onPressCard = () => {
    navigation.navigate('CreatorsPage', {
      id: id,
    });
  };
  return (
    <TouchableOpacity onPress={onPressCard} style={[{width: 180}, style]}>
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
              fontSize: RFValue(11),
            }}>
            {name}
          </Text>
          <Text
            style={{
              color: '#ffffff',
              fontFamily: 'Axiforma-Regular',
              fontSize: RFValue(11),
            }}>
            {nFormatter(fans)} Fans
          </Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

export {FanJoyCard};
