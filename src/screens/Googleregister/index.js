import React, {useRef, useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Background from '../../Components/Background';
import InputField from '../../Components/InputField';
import Label from '../../Components/Label';
import LabelButton from '../../Components/LabelButton';
import LongButton from '../../Components/LongButton';
import {AuthContext} from '../../Components/context';
import {GetUserDeviceDetails, JSONtoForm} from '../../Constants/Functions';
import Config from 'react-native-config';
import types from '../../redux/types';
import {Colors, Images} from '../../Constants/Index';
import GoBack from '../../Components/GoBack';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import Modals from '../../Components/Modals';
const {width, height} = Dimensions.get('window');
const index = ({route, navigation}) => {
  const {signIn} = React.useContext(AuthContext);
  const [referral, setReferral] = useState(null);
  useEffect(async () => {
    setReferral(await EncryptedStorage.getItem('myreferral'));
  }, []);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const {data} = route.params;
  const passref = useRef();
  const phoneref = useRef();
  const cpassref = useRef();
  const loading = useRef();
  const ModalState = useRef();
  console.log('data2', data);

  const HandleClick = async () => {
    const phone_no = phoneref.current.getText();
    const password = passref.current.getText();
    const password_confirmation = cpassref.current.getText();
    const first_name = data.user.givenName;
    const last_name = data.user.familyName;
    const user_name = data.user.name;
    const email = data.user.email;

    if (password !== password_confirmation) {
      passref.current.Error();
      cpassref.current.Error();
      return;
    }
    loading.current.SetActivity(true);

    const body = JSONtoForm({
      first_name,
      last_name,
      user_name,
      email,
      referral_code: referral,
      phone_no: `+${phone_no}`,
      password,
      password_confirmation,
      google_register: true,
      ...(await GetUserDeviceDetails()),
    });
    {
      console.log('bodyy', body);
    }
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
        console.log('Before_success_res', res);
        if (res.status && res.status.toLowerCase() === 'success') {
          console.log('after_success_res', res);
          if (res?.data?.message === 'Registration Successfull') {
            console.log('google_mytoken', res.data.token);
            dispatch({
              type: types.USER_DATA,
              userData: res?.data?.user,
            });
            dispatch2({
              type: types.TOTAL_LIVES,
              totalLives: '0',
            });
            await EncryptedStorage.setItem('Token', res.data.token);
            loading.current.SetActivity(false);
            signIn(res.data.token);
          }
        } else {
          loading.current.SetActivity(false);
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
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#420E92', '#E7003F']}
          style={{
            display: 'flex',
            height: height,
          }}>
          <View style={styles.MainTop}>
            <GoBack />
            <Image source={Images.Logo} style={styles.Logo} />
            <Label bold headingtype="h1" style={styles.Heading}>
              Google signin
            </Label>
            <Label
              light
              style={[
                styles.Margin,
                {lineHeight: height * 0.03, marginVertical: 10},
              ]}>
              Enter your's phone no and password
            </Label>
            <Modals ModalRef={ModalState} Error />
            <View>
              <InputField
                style={styles.Margin}
                placeholder={'phone_number'}
                ref={phoneref}
                keyboardType="number-pad"
                phone
              />
            </View>
            <View>
              <InputField
                style={styles.MarginField}
                fieldstyle={styles.Text}
                secureTextEntry={true}
                Icon="lock"
                placeholder="password"
                ref={passref}
                keyboardType="default"
                placeholderTextColor={Colors.MUTED}
              />
            </View>

            <InputField
              style={styles.MarginField}
              fieldstyle={styles.Text}
              placeholder="confirm_password"
              secureTextEntry={true}
              Icon="lock"
              ref={cpassref}
              keyboardType="default"
              placeholderTextColor={Colors.MUTED}
            />
            <LongButton
              style={[styles.Margin3, {backgroundColor: '#ffffff'}]}
              text="Google_Register"
              onPress={HandleClick}
              ref={loading}
              textstyle={{color: '#E7003F'}}
            />
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.905,
    alignItems: 'center',
  },

  Logo: {
    marginTop: height * 0.15,
    width: width * 0.2,
    height: height * 0.1,
    resizeMode: 'contain',
  },
  Heading: {marginTop: height * 0.015},
  Text: {color: Colors.LABEL},
  Margin: {marginTop: height * 0.023},
  Margin2: {marginTop: height * 0.04},
  Margin3: {marginTop: height * 0.03},

  MarginField: {
    marginTop: height * 0.018,
  },
});

export default index;
