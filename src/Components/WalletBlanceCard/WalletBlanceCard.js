import React, {useState} from 'react';
import {View, Image, Dimensions, TouchableOpacity} from 'react-native';
import styles from './Styles';
import Label from '../Label';
import LinearGradient from 'react-native-linear-gradient';
import {widthConverter, widthPercentageToDP} from '../Helpers/Responsive';
import LoaderImage from '../LoaderImage';
import Config from 'react-native-config';
import LongButton from '../LongButton';
const {width, height} = Dimensions.get('window');
import {useTranslation} from 'react-i18next';
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
    <View style={{paddingHorizontal: 15, width: '100%'}}>
      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 10,
          padding: 6,
          marginVertical: 10,
          // top: height * 0.06,
          justifyContent: 'center',
          //alignItems: 'center',
          elevation: 3,
          //marginBottom: 15,
          width: '100%',
        }}>
        <View>
          <Label
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
            AED {parseFloat(yourBalance).toFixed(2)}
          </Label>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            //marginTop: 10,
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
