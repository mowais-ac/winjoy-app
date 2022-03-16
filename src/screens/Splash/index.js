import React, {useEffect} from 'react';
import {View, Image, Dimensions, Text} from 'react-native';
import {Images} from '../../Constants/Index';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
import Background from '../../Components/Background';
import {IsVerified} from '../../Constants/Functions';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('window');
export default function index({navigation}) {
  // useEffect(() => {
  //   const Check = async () => {
  //     try {
  //       var Token = await EncryptedStorage.getItem("Token");
  //       if (Token !== null) {
  //         if (await IsVerified(Token)) {
  //          // return navigation.replace("BottomTabStack");
  //         }
  //       }
  //     //  await EncryptedStorage.clear();
  //     //  return navigation.replace("LoginStack");
  //     } catch (error) {
  //
  //     }
  //   };
  //   Check();
  // });
  return (
    <>
      {/* <ActivityIndicator size="large" color="#000" /> 
      <Text>hiiiii</Text> */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#420E92', '#E7003F']}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Image
          source={Images.Logo}
          style={{
            width: width * 0.5,
            height: height * 0.3,
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            color: '#fff',
            fontFamily: 'Axiforma-Bold',
            fontSize: RFValue(35),
          }}>
          WINJOY
        </Text>
      </LinearGradient>
    </>
  );
}
