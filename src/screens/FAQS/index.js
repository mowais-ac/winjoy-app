import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  Text,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../Components/Header';
import {
  LifeCard,
  LifeCardRefferAndVideo,
  TopTab,
  WjBackground,
} from '../../Components';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const index = ({route, navigation}) => {
  const [headerValue, setHeaderValue] = useState(0);
  const [selected, setSelected] = useState(0);
  useEffect(() => {}, []);

  const onPressFirst = () => {
    setSelected(0);
  };
  const onPressSecond = () => {
    setSelected(1);
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#f8d7e8', '#c7dfe8']}
        style={{flex: 1}}>
        <Header
          style={{
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
            width: '100%',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
        <ScrollView
          onScroll={e => {
            setHeaderValue(e.nativeEvent.contentOffset.y);
          }}>
          <WjBackground
            style={{
              height: height * 0.18,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          />
          <View
            style={{
              marginTop: height * 0.07,
              height: height * 0.15,
              alignItems: 'center',
            }}>
            <View style={{marginBottom: height * 0.01}}>
              <Text style={[styles.headerText]}>FAQS</Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flex: 1,
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                backgroundColor: '#ffffff',
                width: '100%',
                padding: 15,
                borderRadius: 10,
              }}>
              <Text style={styles.heading}>
                Is WinJoy available on Android and IOS?
              </Text>
              <Text style={styles.paragraph}>
                Yes. WinJoy can be found on both the App Store and the Google
                Play Store.
              </Text>

              <Text style={styles.heading}>
                How do I set up my WinJoy account?
              </Text>
              <Text style={styles.paragraph}>
                To create an account, go to the top right corner of your screen
                and click 'Login/Register', and then enter your details in the
                fields required.
              </Text>

              <Text style={styles.heading}>
                Are there any hidden charges I should be aware of?
              </Text>
              <Text style={styles.paragraph}>
                There are no additional fees associated with any WinJoy
                purchase. However, you should check with your bank to see if
                they apply any transaction/processing fees.
              </Text>

              <Text style={styles.heading}>How can I access WinJoy.com?</Text>
              <Text style={styles.paragraph}>
                WinJoy can be accessed through desktop, smartphones or a tablet.
              </Text>

              <Text style={styles.heading}>
                Is WinJoy available on Android and IOS?
              </Text>
              <Text style={styles.paragraph}>
                Yes. WinJoy can be found on both the App Store and the Google
                Play Store.
              </Text>

              <Text style={styles.heading}>
                How do I set up my WinJoy account?
              </Text>
              <Text style={styles.paragraph}>
                To create an account, go to the top right corner of your screen
                and click 'Login/Register', and then enter your details in the
                fields required.
              </Text>

              <Text style={styles.heading}>
                Are there any hidden charges I should be aware of?
              </Text>
              <Text style={styles.paragraph}>
                There are no additional fees associated with any WinJoy
                purchase. However, you should check with your bank to see if
                they apply any transaction/processing fees.
              </Text>

              <Text style={styles.heading}>How can I access WinJoy.com?</Text>
              <Text style={styles.paragraph}>
                WinJoy can be accessed through desktop, smartphones or a tablet.
              </Text>

              <Text style={styles.heading}>
                Is WinJoy available on Android and IOS?
              </Text>
              <Text style={styles.paragraph}>
                Yes. WinJoy can be found on both the App Store and the Google
                Play Store.
              </Text>

              <Text style={styles.heading}>
                How do I set up my WinJoy account?
              </Text>
              <Text style={styles.paragraph}>
                To create an account, go to the top right corner of your screen
                and click 'Login/Register', and then enter your details in the
                fields required.
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default index;
