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
  TouchableOpacity,
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
import {GetCartData, RemoveCartData} from '../../redux/actions';
import {GetDate, JSONtoForm} from '../../Constants/Functions';
import types from '../../redux/types';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const {width, height} = Dimensions.get('window');
const index = ({route, navigation}) => {
  const [headerValue, setHeaderValue] = useState(0);
  const [selected, setSelected] = useState(0);
  const [activity, setActivity] = useState(false);
  const [orderinfo, setOrderinfo] = useState([]);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const onPressFirst = () => {
    setSelected(0);
  };
  const onPressSecond = () => {
    setSelected(1);
  };
  useEffect(() => {
    Postapi();
  }, []);
  const Postapi = async () => {
    const Token = await EncryptedStorage.getItem('Token');
    const orderid = await AsyncStorage.getItem('noon_orderid');
    console.log('orderid', orderid);
    const data = {
      is_wallet: false,
      orderId: orderid,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
      body: JSONtoForm(data),
    };
    console.log('paymentbodyC', requestOptions);
    await fetch(`${Config.API_URL}/order/paynow`, requestOptions)
      .then(async response => response.json())
      .then(async res => {
        try {
          console.log('productsresC', res);
          if (res.status === 'success') {
            setOrderinfo(res.order);
            Getapi();
            dispatch({
              type: types.CART_COUNTER,
              counter: '',
            });
          }
        } catch (error) {
          {
            console.log(error);
          }
        }
      });
  };
  const Getapi = async () => {
    const Token = await EncryptedStorage.getItem('Token');
    const orderid = await AsyncStorage.getItem('noon_orderid');
    setActivity(true);

    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    };
    await fetch(
      `https://winjoy.incubyter.com/public/api/order/get?orderId=${orderid}`,
      requestOptions,
    )
      .then(async response => response.json())
      .then(async res => {
        console.log('order_get0', res);
        if (res.status === 'Transaction Success') {
          console.log('order_get', res.response);
          setActivity(false);
          dispatch2(GetCartData());
          await AsyncStorage.removeItem('noon_orderid');
        }
      })
      .catch(e => {
        console.log(e);
      });
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
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#420E92', '#E7003F']}
            style={{
              height: 120,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}>
            <View
              style={{marginVertical: 10, alignItems: 'center', marginTop: 60}}>
              <Text style={[styles.headerText]}>Order Detail</Text>
            </View>
          </LinearGradient>

          {/*  <View
            style={{
              width: '100%',
              alignItems: 'center',
              flex: 1,
              padding: 10,
            }}>
            <Text>{orderinfo.order_reference}</Text>
          </View> */}

          <View
            style={{
              padding: 10,
              alignItems: 'center',
              height: 180,
              margin: 14,
              borderRadius: 12,
              backgroundColor: '#ffffff',
              elevation: 6,
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'green', fontSize: 16, fontWeight: '700'}}>
                Payment Successfull
              </Text>
              <Text
                style={{
                  marginTop: 8,
                  color: '#000000',
                  fontSize: 12,
                  fontFamily: 'Axiforma-Bold',
                }}>
                Payment Refercence{' '}
                <Text
                  style={{
                    color: '#420E92',
                    fontSize: 13,
                    fontWeight: '700',
                    fontFamily: 'Axiforma-Bold',
                  }}>
                  {orderinfo.order_reference
                    ? orderinfo.order_reference
                    : '....'}
                </Text>
              </Text>
              <Text
                style={{
                  marginTop: 8,
                  color: '#000000',
                  fontSize: 12,
                  fontFamily: 'Axiforma-Regular',
                  textAlign: 'center',
                  lineHeight: 19,
                }}>
                Thank you for your order your payment of{' '}
                <Text
                  style={{
                    color: '#420E92',
                    fontSize: 13,
                    fontWeight: '700',
                    fontFamily: 'Axiforma-Bold',
                  }}>
                  AED {orderinfo.total ? orderinfo.total : '....'}
                </Text>{' '}
                is now successful.
              </Text>
            </View>

            <TouchableOpacity
              style={{
                width: 140,
                height: 35,
                marginVertical: 20,
                backgroundColor: '#420E92',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 2,
              }}
              onPress={() => {
                navigation.navigate('Orders');
              }}>
              <Text style={{color: '#ffffff', fontFamily: 'Axiforma-Regular'}}>
                Go to Purchases
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default index;
