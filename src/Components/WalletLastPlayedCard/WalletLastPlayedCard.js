import React, {useState} from 'react';
import {View, Image, Dimensions, TouchableOpacity, Text} from 'react-native';
import styles from './Styles';
import Label from '../Label';
import {useTranslation} from 'react-i18next';
import {FormatNumber} from '../../Constants/Functions';
const {width, height} = Dimensions.get('window');
function WalletLastPlayedCard({
  noOfQuestions,
  onPress,
  wonPrize,
  result,
  optionDisable,
  data,
}) {
  const {t} = useTranslation();
  return (
    <TouchableOpacity
      style={{
        width: 'auto',
        height: height * 0.145,
        backgroundColor: '#ffffff',
        marginHorizontal: 14,
        borderRadius: 10,
        justifyContent: 'center',
        elevation: 3,
        marginBottom: 11,
        shadowColor: '#d9dbda',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 6,
        shadowRadius: 2,
        elevation: 3,
      }}
      onPress={onPress}>
      <View style={{marginHorizontal: 20}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#E7003F',
            lineHeight: 30,
            fontFamily: 'Axiforma-Regular',
            fontSize: 15.5,
          }}>
          Last Played Game
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#000000',
            lineHeight: 18,
            fontFamily: 'Axiforma-Regular',
            fontSize: 15,
          }}>
          Answer {noOfQuestions} simple questions and WIN amazing prizes
        </Text>

        <Text
          style={{
            fontWeight: 'bold',
            color: '#E7003F',
            lineHeight: 30,
            fontFamily: 'Axiforma-Regular',
            fontSize: 15.5,
          }}>
          Prizes won{' '}
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Axiforma-Bold',
              fontSize: 15,
            }}>
            AED {FormatNumber(+wonPrize?.toLocaleString())}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export {WalletLastPlayedCard};
