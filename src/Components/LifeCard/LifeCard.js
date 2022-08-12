import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('window');
import styles from './Styles';
function LifeCard({onPress, amount, lives, id}) {
  const getData = async () => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      const result = await fetch(`${Config.API_URL}/buy_lives_plan/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
      const json = await result.json();
      if (json.status === 'success') {
        console.log('jsonssss', json);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={{
          width: width * 0.3,
          height: height * 0.16,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        colors={['#420E92', '#E7003F']}>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'Axiforma-SemiBold',
            fontSize: RFValue(12),
          }}>
          Buy
        </Text>
        <ImageBackground
          resizeMode="contain"
          style={{
            marginTop: 10,
            width: 100,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={require('../../assets/imgs/life.png')}>
          <Text
            style={{
              color: '#E7003F',
              fontFamily: 'Axiforma-SemiBold',
              fontSize: RFValue(20),
            }}>
            {lives}
          </Text>
        </ImageBackground>
        <Text style={[styles.text, {marginTop: 10}]}>{amount} AED</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export {LifeCard};
