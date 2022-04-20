import React, {useRef, useState} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import {useTranslation} from 'react-i18next';
import Background from '../../Components/Background';
import InputField from '../../Components/InputField';
import Label from '../../Components/Label';
import LabelButton from '../../Components/LabelButton';
import LongButton from '../../Components/LongButton';
import LinearGradient from 'react-native-linear-gradient';
import {
  JSONtoForm,
  IsVerified,
  GetUserDeviceDetails,
} from '../../Constants/Functions';
import {Images} from '../../Constants/Index';
import Modals from '../../Components/Modals';
import GoBack from '../../Components/GoBack';
import {useDispatch} from 'react-redux';
import types from '../../redux/types';
const {width, height} = Dimensions.get('window');

const index = ({navigation, route}) => {
  const referral_code = route.params;
  const {t} = useTranslation();
  const fnameref = useRef();
  const lnameref = useRef();
  const unameref = useRef();
  const emailref = useRef();
  const passref = useRef();
  const phoneref = useRef();
  const cpassref = useRef();
  const r = useRef();
  const ModalState = useRef();
  const dispatch = useDispatch();
  {
    console.log(referral_code);
  }
  const HandleClick = async () => {
    let isnull = false;
    if (
      emailref.current.validateEmail() &&
      phoneref.current.validatePhone() &&
      !r.current.GetActivity()
    ) {
      for (let e of [
        fnameref,
        lnameref,
        unameref,
        emailref,
        phoneref,
        passref,
        cpassref,
      ]) {
        if (e.current.IsNull()) {
          isnull = true;
          break;
        }
      }
      if (isnull) return;

      const first_name = fnameref.current.getText();
      const last_name = lnameref.current.getText();
      const user_name = unameref.current.getText();
      const email = emailref.current.getText();
      const phone_no = phoneref.current.getText();
      const password = passref.current.getText();
      const password_confirmation = cpassref.current.getText();

      if (user_name?.length < 5) {
        ModalState.current(true, {
          heading: 'Error',
          Error: 'Username must have atleast 5 characters',
        });
        return;
      }

      var arr = [
        first_name,
        last_name,
        user_name,
        email,
        phone_no,
        password,
        password_confirmation,
      ].filter(e => e == null || e == '');

      if (arr?.length >= 1) return;

      if (password !== password_confirmation) {
        passref.current.Error();
        cpassref.current.Error();
        return;
      }
      r.current.SetActivity(true);
      const body = JSONtoForm({
        first_name,
        last_name,
        user_name,
        email,
        phone_no: `+${phone_no}`,
        password,
        password_confirmation,
        ...(await GetUserDeviceDetails()),
      });

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        body,
      };

      await fetch(`${Config.API_URL}/auth/new_register`, requestOptions)
        .then(response => response.json())
        .then(async res => {
          // console.log('res', res);
          if (res.status && res.status.toLowerCase() === 'success') {
            await EncryptedStorage.setItem('Token', res.data.token);
            //console.log('res.data.token', res.data.token);
            r.current.SetActivity(false);
            navigation.replace('Verify', {email, phone: phone_no});
          } else {
            r.current.SetActivity(false);
            const array = res.errors
              ? Object.values(res.errors).reduce((p, n) => {
                  p.push(
                    n[0] === 'The phone no has already been taken.'
                      ? ['The phone number you entered already exists.']
                      : n,
                  );
                  return p;
                }, [])
              : [];

            ModalState.current(true, {
              heading: 'Error',
              Error: res.message,
              array,
            });
          }
        })
        .catch(e => console.log(e));
    }
  };

  const GetUserName = () => {
    return (
      <InputField
        style={styles.Margin}
        placeholder={t('user')}
        autoCapitalize="none"
        ref={unameref}
        Icon="user"
        CheckUser
      />
    );
  };
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#420E92', '#E7003F']}
      style={{
        display: 'flex',
        flex: 1,
      }}>
      <ScrollView>
        <KeyboardAwareScrollView keyboardDismissMode="interactive">
          <View style={styles.MainTop}>
            <GoBack />
            <Image source={Images.Logo} style={styles.Logo} />
            <Label bold headingtype="h1" style={styles.Margin}>
              {t('create_account')}
            </Label>

            <Modals ModalRef={ModalState} Error />
            <InputField
              style={styles.MarginLarge}
              placeholder={t('f_name')}
              ref={fnameref}
              Icon="id"
            />
            <InputField
              style={styles.Margin}
              placeholder={t('l_name')}
              ref={lnameref}
              Icon="id"
            />
            <GetUserName />

            <InputField
              style={styles.Margin}
              placeholder="test@domain.com"
              ref={emailref}
              Icon="user"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <View>
              <InputField
                style={styles.Margin}
                placeholder={t('phone_number')}
                ref={phoneref}
                keyboardType="number-pad"
                phone
              />
            </View>
            <InputField
              style={styles.Margin}
              placeholder={t('password')}
              secureTextEntry={true}
              ref={passref}
              Icon="lock"
            />
            <Label
              light
              muted
              style={[styles.PasswordTxt, {lineHeight: height * 0.03}]}
              font={11}>
              The minimum password length is 8 characters and must contain at
              least 1 letter and 1 number
            </Label>
            <InputField
              style={styles.Margin}
              placeholder={t('confirm_password')}
              secureTextEntry={true}
              ref={cpassref}
              Icon="lock"
            />

            <LongButton
              style={[styles.Margin, {backgroundColor: '#ffffff'}]}
              text={t('create_account')}
              font={17}
              onPress={HandleClick}
              ref={r}
              textstyle={{color: '#E7003F'}}
            />
            <Label
              light
              style={[styles.Terms, {lineHeight: height * 0.03}]}
              font={11}>
              By clicking "Create an acccount" you agree to the{' '}
              <LabelButton
                light
                style={styles.Margin}
                text="Terms and Conditions"
                notAlign
                underline
                Notdark
                Without
                font={11}
              />{' '}
              and{' '}
              <LabelButton
                light
                style={styles.Margin}
                text="Privacy Policy"
                underline
                Notdark
                Without
                font={11}
              />
            </Label>
          </View>

          <View style={{marginTop: height * 0.05}} />
        </KeyboardAwareScrollView>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 1.04,
    alignItems: 'center',
  },
  Logo: {
    marginTop: height * 0.04,
    width: width * 0.2,
    height: height * 0.1,
    resizeMode: 'contain',
  },
  Terms: {marginTop: height * 0.014},
  Margin: {marginTop: height * 0.014},
  MarginLarge: {marginTop: height * 0.025},
  MarginBack: {
    marginTop: height * 0.052,
  },
  PasswordTxt: {
    width: width * 0.85,
    marginTop: height * 0.01,
  },
});

export default index;
