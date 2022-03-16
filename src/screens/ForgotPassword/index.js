import React, {useRef} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Config from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../../Components/Background';
import InputField from '../..//Components/InputField';
import Label from '../../Components/Label';
import LabelButton from '../../Components/LabelButton';
import LongButton from '../../Components/LongButton';
import Modals from '../../Components/Modals';

import {JSONtoForm} from '../../Constants/Functions';

import {Images} from '../../Constants/Index';
import GoBack from '../../Components/GoBack';

const {width, height} = Dimensions.get('window');

const index = ({navigation}) => {
  const emailref = useRef();
  const Buttonref = useRef();
  const ModalRef = useRef();

  const HandleClick = async () => {
    if (emailref.current.validateEmail()) {
      const email = emailref.current.getText();
      Buttonref.current.SetActivity(true);
      const body = JSONtoForm({
        email,
      });
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        body,
      };

      await fetch(`${Config.API_URL}/auth/forget-password`, requestOptions)
        .then(response => response.json())
        .then(async res => {
          if (res.message == 'We have emailed your password reset link!') {
            Alert.alert('Success', res.message);
            Buttonref.current.SetActivity(false);
          } else {
            ModalRef.current(true, {
              Error: res.message,
            });
            Buttonref.current.SetActivity(false);
          }
        })

        .catch(e => console.log(e));
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAwareScrollView keyboardDismissMode="interactive">
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
              <Modals ModalRef={ModalRef} Error />
              <Label bold headingtype="h1" style={styles.Heading}>
                Reset your password
              </Label>
              <Label
                light
                style={[styles.MarginLarge, {lineHeight: height * 0.03}]}>
                A link will be sent to your email using which you can reset your
                password
              </Label>
              <Label
                light
                style={[styles.MarginLarge, {lineHeight: height * 0.03}]}>
                Enter your email below to get the link
              </Label>
              <InputField
                style={styles.Margin}
                placeholder="test@domain.com"
                ref={emailref}
                Icon="user"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
              />
              <LongButton
                style={[styles.MarginLarge, {backgroundColor: '#ffffff'}]}
                text="Get link"
                font={17}
                onPress={HandleClick}
                ref={Buttonref}
                textstyle={{color: '#E7003F'}}
              />
            </View>
            {/* <GoBack style={styles.MarginLarge} /> */}
          </LinearGradient>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.85,
    alignItems: 'center',
  },

  Logo: {
    marginTop: height * 0.15,
    width: width * 0.2,
    height: height * 0.1,
    resizeMode: 'contain',
  },
  Heading: {marginTop: height * 0.015},
  Terms: {marginTop: height * 0.02},
  Margin: {marginTop: height * 0.014},
  MarginLarge: {marginTop: height * 0.025},
  NumberInitial: {
    position: 'absolute',
    marginTop: height * 0.038,
    marginLeft: width * 0.05,
  },
});

export default index;
