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
  Platform,
  Text,
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
import {Settings, AppEventsLogger} from 'react-native-fbsdk-next';
import appsFlyer from 'react-native-appsflyer';
import {useTranslation} from 'react-i18next';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import Modals from '../../Components/Modals';
import SelectLanguageModal from '../../Components/SelectLanguageModal';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const {width, height} = Dimensions.get('window');
import {URLSearchParams} from '@visto9259/urlsearchparams-react-native';
const index = ({navigation}) => {
  Settings.setAppID('1149665975867657');
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
  //Deep Link refrral

  GoogleSignin.configure({
    webClientId:
      '389658608176-lv2ddmmfpnv2uoaf5nf333e5jj4oku7o.apps.googleusercontent.com',
  });

  useEffect(() => {
    // Defining the URL as a constant
    //let params = {width: 1680};

    dynamicLinks()
      .getInitialLink()
      .then(async link => {
        const myreferral = link.url.replace('https://winjoy.ae?referral=', '');
        // let urlParams = new URLSearchParams(`${link.url}`);
        // {
        //   console.log('urlparams', urlParams);
        //   const refr = urlParams.get('referral');
        //   console.log('urlparams1', Object.entries(refr));
        // }
        try {
          const refer = await EncryptedStorage.setItem(
            'myreferral',
            myreferral,
            //link.url.slice(27),
          );
        } catch (error) {
          console.log(error);
        }
        if (`${link.url}`) {
          {
            console.log('mylink', link.url);
          }
          navigation.navigate('Register', {
            // referral_code: urlParams.get('referral'),
            referral_code: myreferral,
            //link.url.slice(27),
          });
        } else {
          alert(`${link.url}`);
        }
      });
  }, []);

  const fb_Login = () => {
    AppEventsLogger.logEvent('Login', {parameters: 'Winjoy_user'});
  };
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
  singin();
  appsFlyer.initSdk(
    {
      isDebug: true,
      appId: '1613371170',
      devKey: 'WsirNxAS4HZB9sjUxGjHtD',
    },
    result => {
      console.log('result', result);
    },
    error => {
      console.error(error);
    },
  );
  const eventName = 'af_login';
  const eventValues = {
    af_user_name: 'Winjoy_user',
  };
  const fun_login = () => {
    appsFlyer.logEvent(
      eventName,
      eventValues,
      res => {
        console.log(res);
      },
      err => {
        console.error(err);
      },
    );
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
          if (res.message === 'Verification required') {
            navigation.navigate('Verify', {
              Token1: res.token,
            });
          }

          console.log('loginres', res);

          tokenForLang.current = res?.data?.token;
          ButtonRef.current.SetActivity(false);

          if (res?.data?.token) {
            fun_login();
            fb_Login();
            /* if (res?.data?.user?.preferred_language === null) {
              ModalStateLanguage.current(true);
            } else  */

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

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
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
            onPress={() => {
              HandleLogin();
            }}
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
        <View style={{marginTop: 15}}>
          <LongButton
            text={t('create_account')}
            onPress={() => navigation.navigate('Register')}
            style={[styles.Margin, {backgroundColor: '#ffffff'}]}
            textstyle={{color: '#E7003F'}}
          />
          {/*  <LongButton
            style={{backgroundColor: '#ffffff', marginTop: 15}}
            text="Sign in with Google"
            black
            Icon="google"
            onPress={() => {
              onGoogleButtonPress();
            }}
          /> */}
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
  Margin: {marginTop: height * 0.02},
  MarginMed: {marginTop: height * 0.022},
  MarginSmall: {marginTop: height * 0.015},
});
export const singin = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  console.log(user);
  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
};
export default index;
