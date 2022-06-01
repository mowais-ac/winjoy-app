import React, {useState} from 'react';
import {View, Image, Dimensions, TouchableOpacity, Text} from 'react-native';
import styles from './Styles';
import Label from '../Label';
import LinearGradient from 'react-native-linear-gradient';
import {widthConverter, widthPercentageToDP} from '../Helpers/Responsive';
import LoaderImage from '../LoaderImage';
import Config from 'react-native-config';
import LongButton from '../LongButton';
const {width, height} = Dimensions.get('window');
import {useTranslation} from 'react-i18next';
import {FormatNumber} from '../../Constants/Functions';
//I18n.locale="ar";
function WalletBlanceCard({
  yourBalance,
  onPressTopup,
  onPress,
  onPressWithdraw,
  result,
  optionDisable,
  onPressaccountdetails,
  data,
}) {
  const {t} = useTranslation();

  return (
    <View
      style={{
        paddingHorizontal: 15,
        width: '100%',
        shadowColor: '#d9dbda',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 6,
        shadowRadius: 2,
        elevation: 3,
      }}>
      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 10,
          padding: 6,
          marginVertical: 15,
          justifyContent: 'center',
          elevation: 3.5,
          width: '100%',
        }}>
        <View
          style={{
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#E7003F',
              marginLeft: 16,
              lineHeight: 25,
              fontSize: 17,
              fontFamily: 'Axiforma-Regular',
            }}>
            Your wallet
          </Text>
          {/*  <Label
            notAlign
            primary
            font={14}
            bold2
            style={{color: '#E7003F', marginLeft: 16, lineHeight: 25}}>
            {t('your_wallet')}
          </Label>

          <Label
            notAlign
            primary
            bold2
            font={14}
            dark
            style={{color: '#000000', marginLeft: 16, lineHeight: 25}}>
            AED {FormatNumber(parseFloat(yourBalance).toFixed(2))}
          </Label> */}
          <Text
            style={{
              fontWeight: 'bold',
              color: '#000000',
              marginLeft: 16,
              lineHeight: 25,
              fontFamily: 'Axiforma-Regular',

              fontSize: 15.5,
            }}>
            AED {FormatNumber(parseFloat(yourBalance).toFixed(2))}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 13,
          }}>
          <LongButton
            style={styles.Margin}
            textstyle={{color: '#eb2b5f'}}
            text={t('Top Up')}
            font={16}
            onPress={onPressTopup}
          />

          <LongButton
            style={[styles.Margin, {backgroundColor: '#e3dbef'}]}
            textstyle={{color: '#420e92'}}
            text={'Withdraw'}
            font={15}
            onPress={onPressaccountdetails}
          />
        </View>
      </View>
    </View>
  );
}

export {WalletBlanceCard};
