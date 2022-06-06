import React, {useRef} from 'react';
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
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');
const index = ({route, navigation}) => {
  const {Token1} = route?.params;
  const {signIn} = React.useContext(AuthContext);
  const email = route.params && route.params.email;
  const phone = route.params && route.params.phone;
  const token = route.params && route.params.token;
  console.log('mytoken', token);
  const evref = useRef();
  const phvref = useRef();
  const ButtonRef = useRef();
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const HandleClick = async () => {
    if (evref.current.validateVerify() && !ButtonRef.current.GetActivity()) {
      // phvref.current.validateVerify();
      ButtonRef.current.SetActivity(true);
      const body = JSONtoForm({
        two_factor_code: evref.current.getText(),
        ...(await GetUserDeviceDetails()),
      });
      var Token = await EncryptedStorage.getItem('Token');
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token || Token1}`,
        },
        body,
      };
      await fetch(`${Config.API_URL}/verify/otp`, requestOptions)
        .then(async response => response.json())
        .then(async res => {
          console.log('otpres', res);
          if (res.message && res.message === 'Congrats!! Account verified') {
            dispatch({
              type: types.USER_DATA,
              userData: res?.user,
            });
            dispatch2({
              type: types.TOTAL_LIVES,
              totalLives: 0,
            });
            ButtonRef.current.SetActivity(false);
            signIn(token);
          } else {
            /*  Alert.alert('Error', res.message);
            ButtonRef.current.SetActivity(false); */
          }
        })
        .catch(e => {
          ButtonRef.current.SetActivity(false);
        });
    }
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
            flex: 1,
          }}>
          <View style={styles.MainTop}>
            <GoBack />
            <Image source={Images.Logo} style={styles.Logo} />
            <Label bold headingtype="h1" style={styles.Heading}>
              Verify account
            </Label>
            <Label light style={[styles.Margin, {lineHeight: height * 0.03}]}>
              Enter the 6 digit code which sent to{' '}
              <Label light underline>
                {email || 'test@domain.com'}
              </Label>{' '}
            </Label>

            <Label style={styles.Margin2}>Email Verification</Label>
            <InputField
              style={styles.MarginField}
              fieldstyle={styles.Text}
              placeholder="******"
              maxLength={6}
              ref={evref}
              verify
              keyboardType="numeric"
              placeholderTextColor={Colors.MUTED}
            />

            <LongButton
              style={[styles.Margin3, {backgroundColor: '#ffffff'}]}
              text="Verify"
              onPress={HandleClick}
              ref={ButtonRef}
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

  MarginField: {marginTop: height * 0.01},
});

export default index;
