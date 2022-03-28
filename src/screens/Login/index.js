import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  I18nManager,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../../Components/context';
import Background from '../../Components/Background';
import InputField from '../../Components/InputField';
import InputFieldWithModal from '../../Components/InputFieldWithModal';
import Label from '../../Components/Label';
import LabelButton from '../../Components/LabelButton';
import LongButton from '../../Components/LongButton';
import SmallButton from '../../Components/SmallButton';
import {useDispatch} from 'react-redux';
import {Images} from '../../Constants/Index';
import types from '../../redux/types';
import {
  JSONtoForm,
  IsVerified,
  IsSuspended,
  GetUserDeviceDetails,
} from '../../Constants/Functions';
import {useTranslation} from 'react-i18next';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import Modals from '../../Components/Modals';
import SelectLanguageModal from '../../Components/SelectLanguageModal';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

const index = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const {signIn} = React.useContext(AuthContext);
  const emailref = useRef();
  const passref = useRef();
  const ButtonRef = useRef();
  const ModalState = useRef();
  const ModalStateLanguage = useRef();
  const [lang, setLang] = useState('');
  const tokenForLang = useRef('');
  const activityLang = useRef(false);
  useEffect(() => {}, []);
  const LanguageChange = () => {
    LanguagePost();
    i18n.changeLanguage(lang).then(() => {
      I18nManager.forceRTL(i18n.language === 'ar');
      //  RNRestart.Restart();
    });
  };
  const LanguagePost = async () => {
    activityLang.current = true;
    const body = JSONtoForm({
      preferred_language: `+${lang}`,
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${tokenForLang.current}`,
      },
      body,
    };
    await fetch(`${Config.API_URL}/user/update_language`, requestOptions)
      .then(async response => response.json())
      .then(async res => {
        console.log('resLang', res);
        if (res.message === 'Language has been updated') {
          dispatch({
            type: types.USER_DATA,
            userData: res?.user,
            //  user: res.data.data,
          });
          dispatch2({
            type: types.TOTAL_LIVES,
            totalLives: res?.user?.lives_count,
          });
          await EncryptedStorage.setItem('Token', tokenForLang?.current);
          signIn(tokenForLang?.current);
          activityLang.current = false;
        }
      })
      .catch(e => {
        Alert.alert('Error', e);
        activityLang.current = false;
      });
  };
  const HandleLogin = async () => {
    if (
      emailref.current.validatePhone() &&
      passref.current.ValidatePass() &&
      !ButtonRef.current.GetActivity()
    ) {
      const phone_no = emailref.current.getText();
      const password = passref.current.getText();

      if ([phone_no, password].filter(e => e == null || e == '')?.length >= 1)
        return;
      ButtonRef.current.SetActivity(true);
      const body = JSONtoForm({
        phone_no: `+${phone_no}`,
        password,
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

      await fetch(`${Config.API_URL}/auth/login`, requestOptions)
        .then(async response => response.json())
        .then(async res => {
          // console.log('res', res);
          tokenForLang.current = res?.data?.token;
          ButtonRef.current.SetActivity(false);
          if (res?.data?.token) {
            if (res?.data?.user?.preferred_language === null) {
              ModalStateLanguage.current(true);
            } else {
              dispatch({
                type: types.USER_DATA,
                userData: res?.data?.user,
                //  user: res.data.data,
              });
              dispatch2({
                type: types.TOTAL_LIVES,
                totalLives: res?.data?.user?.lives_count,
              });
              await EncryptedStorage.setItem('Token', res.data.token);
              signIn(res.data.token);
              // navigation.replace("HomeStack");
              if (await IsSuspended(res.data.token))
                return ModalState.current(true, {
                  heading: 'Account suspended',
                  Error:
                    'Your account has been inactive/suspended. Please contact support for further details.',
                });
              if (await IsVerified(res.data.token)) {
                await EncryptedStorage.setItem('Token', res.data.token);
                signIn(res.data.token);
                //  navigation.replace("HomeStack");
              } else {
                dispatch({
                  type: types.USER_DATA,
                  userData: res?.data?.user,
                  //  user: res.data.data,
                });
                navigation.replace('Verify', {
                  phone: phone_no,
                  token: res.data.token,
                });
              }
            }
          } else if (
            res?.message === 'Enter 6 Digit Code which sent on your mobile'
          ) {
            await EncryptedStorage.setItem('Token', res.data.token);
            navigation.replace('Verify', {phone: phone_no});
          } else if (
            res?.message ===
            'Your account has been inactive/suspended by our admin, please contact support for further details'
          )
            ModalState.current(true, {
              heading: 'Account suspended',
              Error: res?.message,
            });
          else {
            console.log('res?.message', res?.message);
            ModalState.current(true, {
              heading: 'Error',
              Error: res?.message,
              // array: res.errors ? Object.values(res.errors) : [],
            });
            ButtonRef.current.SetActivity(false);
          }
        })
        .catch(e => {
          Alert.alert('Error', e);
          ButtonRef.current.SetActivity(false);
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#420E92', '#E7003F']}
        style={{
          display: 'flex',
          flex: 1,
        }}>
        <View style={styles.MainTop}>
          <Image source={Images.Logo} style={styles.Logo} />
          <Label bold2 headingtype="h2" style={[styles.MarginLarge]}>
            {t('login_heading')}
          </Label>
          <Modals ModalRef={ModalState} Error />
          <InputFieldWithModal
            style={styles.MarginLarge}
            placeholder={t('phone_number')}
            ref={emailref}
            keyboardType="number-pad"
            phone
          />

          <InputField
            style={styles.MarginSmall}
            ref={passref}
            placeholder={t('password')}
            secureTextEntry={true}
            Icon="lock"
            //  lang={lang}
          />
          <LongButton
            style={[styles.Margin, {backgroundColor: '#ffffff'}]}
            textstyle={{color: '#E7003F'}}
            text={t('login')}
            onPress={HandleLogin}
            ref={ButtonRef}
          />
          <LabelButton
            style={styles.MarginSmall}
            Notdark
            text={t('forgot_password')}
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </View>

        <Label
          bold
          muted
          style={[styles.ORButton, {lineHeight: height * 0.03, top: 10}]}
          font={15}>
          {t('or')}
        </Label>
        <View style={{marginTop: height * 0.052}}>
          <LongButton
            text={t('create_account')}
            onPress={() => navigation.navigate('Register')}
            style={[styles.Margin, {backgroundColor: '#ffffff'}]}
            textstyle={{color: '#E7003F'}}
          />
        </View>
        <SelectLanguageModal
          ModalRef={ModalStateLanguage}
          details
          onPressLang={la => {
            setLang(la);
          }}
          lang={lang}
          onSelect={LanguageChange}
          activityLang={activityLang.current}
        />
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.7,
    alignItems: 'center',
  },
  Logo: {
    marginTop: height * 0.12,
    width: width * 0.2,
    height: height * 0.12,
    resizeMode: 'contain',
  },
  MarginLarge: {
    marginTop: height * 0.037,
  },
  Margin: {marginTop: height * 0.027},
  MarginMed: {marginTop: height * 0.022},
  MarginSmall: {marginTop: height * 0.015},
});

export default index;
