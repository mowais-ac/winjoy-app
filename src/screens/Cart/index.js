import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import {Settings, AppEventsLogger} from 'react-native-fbsdk-next';
import {firebase} from '@react-native-firebase/analytics';
import Background from '../../Components/Background';
import SafeArea from '../../Components/SafeArea';
import Label from '../../Components/Label';
import Header from '../../Components/Header';
import appsFlyer from 'react-native-appsflyer';
import {Colors} from '../../Constants/Index';
import Section from '../../Components/Section';
import UserInfo from '../../Components/UserInfo';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import NotFoundCart from '../../Components/NotFoundCart';
import {FormatNumber, wait} from '../../Constants/Functions';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightConverter,
  widthConverter,
  widthPercentageToDP,
} from '../../Components/Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import LongButton from '../../Components/LongButton';
import PaymentModals from '../../Components/PaymentModals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modals from '../../Components/Modals';
import BuyLifeCongrats from '../../Components/BuyLifeCongrats';
import {GetCartData, RemoveCartData} from '../../redux/actions';
const {width, height} = Dimensions.get('window');

import {connect, useDispatch, useSelector} from 'react-redux';
import types from '../../redux/types';
import {WjBackground} from '../../Components';
import {getWalletData} from '../../redux/actions';
const index = ({props, navigation}) => {
  const defaultAppAnalytics = firebase.analytics();
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const dispatch3 = useDispatch();
  const dispatch6 = useDispatch();
  const ModalState = useRef();
  const SucessModalState = useRef();
  const ModalStateError = useRef();
  const [Data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activity, setActivity] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [listloader, setListloader] = useState(false);
  const [id, setId] = useState(null);
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const walletData = useSelector(state => state.app.walletData);
  const cartData = useSelector(state => state.app.cartData);
  const removeCartData = useSelector(state => state.app.removeCartData);
  const loading = useSelector(state => state.event.loading);
  const counterMain = useSelector(state => state.app.counter);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch6(getWalletData());
    dispatch(GetCartData());
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const PostData = async () => {
    ModalState.current(true);
  };

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
  console.log('cartData', cartData);
  const eventName = 'af_initiated_checkout';
  const eventValues = {
    af_price: 99,
    af_content_id: 13,
    af_content_type: 'General',
    af_currency: 'AED',
    af_quantity: 1,
    //  af_revenue: pd?.product?.price,
  };
  const fun_initiatedcheckout = () => {
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

  useEffect(() => {
    dispatch6(getWalletData());
    dispatch(GetCartData());

    firebase.app();
    firebase.analytics();
  }, []);
  const addCustomEvent = async () => {
    await defaultAppAnalytics.logAddToCart({
      currency: '0088',
      value: 4,
    });
  };
  console.log('wallet', walletData?.wallet?.your_balance);
  const RemoveItem = (id, qty) => {
    setId(id);
    dispatch2(RemoveCartData(id));
    onRefresh();
    setUpdateData(!updateData);
    dispatch3({
      type: types.CART_COUNTER,
      counter: counterMain - qty,
    });
  };
  const [active, setactive] = useState(false);

  const Switchhandle = tab => {
    setactive(tab);
  };
  const renderItem = ({item, i}) => {
    return (
      <Section
        style={styles.Section}
        disabled={true}
        //onPress={() => navigation.navigate("ProductDetails", { item })}
      >
        <View style={styles.SectionView}>
          <View style={styles.ImageView}>
            <Image
              source={{
                uri: item?.product?.image,
              }}
              style={styles.Image}
            />
          </View>
          <View style={[styles.TextView, {width: width * 0.53}]}>
            <Label
              notAlign
              dark
              bold2
              headingtype="h6"
              style={{width: width * 0.48}}>
              {item?.product?.title} x {item?.qty}
            </Label>

            <Label
              notAlign
              primary
              bold
              headingtype="h6"
              style={styles.LessMargin}>
              Total: AED {FormatNumber(+item?.product?.price * item?.qty)}
            </Label>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 20,
            }}
            onPress={() => {
              RemoveItem(item.id, item?.qty);
              remove_from_cart();
            }}>
            {loading && item.id === id ? (
              <ActivityIndicator
                size="small"
                color="#000000"
                style={{left: 5}}
              />
            ) : (
              <Entypo
                name="cross"
                size={25}
                color={Colors.DARK_MUTED}
                style={{left: 5, opacity: 0.5}}
              />
            )}
          </TouchableOpacity>
        </View>
      </Section>
    );
  };
  /*   {
    console.log('cartData?.total', cartData?.data?.price);
  } */
  const eventName3 = 'remove_from_cart';
  const eventValues3 = {
    af_content_id: 12,
    af_content_type: 'T-shirt',
  };
  const remove_from_cart = () => {
    appsFlyer.logEvent(
      eventName3,
      eventValues3,
      res => {
        console.log(res);
      },
      err => {
        console.error(err);
      },
    );
  };
  return (
    <SafeAreaView
      style={{
        height: height,
        backgroundColor: Platform.OS === 'android' ? null : '#420E92',
      }}>
      <View style={{backgroundColor: '#f6f1f3'}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#420E92', '#E7003F']}
          style={{
            height: 'auto',
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}>
          <Header />
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.headerText, {marginVertical: 20}]}>Cart</Text>
          </View>
        </LinearGradient>

        {cartData?.data === null ? (
          <Label primary bold headingtype="h4" style={{marginTop: 15}}>
            No data
          </Label>
        ) : (
          <View style={{marginTop: 5}}>
            <View style={{height: '80%'}}>
              <FlatList
                data={cartData?.data}
                renderItem={renderItem}
                scrollEnabled={true}
                keyExtractor={i => i}
                extraData={updateData}
                ListEmptyComponent={
                  listloader ? (
                    <ActivityIndicator
                      size="large"
                      color="#000000"
                      style={{marginTop: height * 0.2}}
                    />
                  ) : (
                    <NotFoundCart
                      text="Cart"
                      onPress={() => navigation.navigate('PRODUCTS')}
                    />
                  )
                }
                contentContainerStyle={{
                  paddingBottom: height * 0.06,
                }}
              />
            </View>
            {cartData?.data?.length > 0 ? (
              <View style={styles.card2Wrap}>
                <View style={styles.card2}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: widthPercentageToDP('83'),
                    }}>
                    <Text style={[styles.metaText, {fontSize: RFValue(17)}]}>
                      Total
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        {fontWeight: 'bold', fontSize: RFValue(17)},
                      ]}>
                      {'AED '}
                      {FormatNumber(+cartData?.sub_total)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: widthPercentageToDP('83'),
                    }}>
                    <Text style={styles.metaText}>Sub Total</Text>
                    <Text style={styles.text}>
                      {'AED '}
                      {FormatNumber(Math.trunc(cartData?.total))}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: widthPercentageToDP('83'),
                    }}>
                    <Text style={styles.metaText}>Vat 5%</Text>
                    <Text style={styles.text}>
                      {'AED '}
                      {FormatNumber(Math.trunc(cartData?.vat))}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      {
                        Platform.OS === 'android'
                          ? fun_initiatedcheckout()
                          : null;
                      }
                      addCustomEvent();
                      ModalState.current(true);
                      PostData();
                    }}
                    disabled={activity}
                    style={{
                      height: heightConverter(55),
                      width: width - 25,
                      position: 'absolute',
                      bottom: 0,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{
                        height: heightConverter(55),
                        width: width - 25,
                        position: 'absolute',
                        bottom: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      colors={['#420E92', '#E7003F']}>
                      {activity ? (
                        <ActivityIndicator size="small" color={'#fff'} />
                      ) : (
                        <Label
                          primary
                          font={16}
                          bold
                          style={{color: '#ffffff'}}>
                          Checkout
                        </Label>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
        )}

        <PaymentModals
          ModalRef={ModalState}
          details
          total={cartData?.sub_total}
          onload={() => {
            onRefresh();
          }}
          yourBalance={
            walletData?.wallet?.your_balance === null
              ? 0
              : walletData?.wallet?.your_balance
          }
        />
        <Modals
          ModalRef={ModalStateError}
          Error
          onClose={() => {
            setModelState({
              ...ModelState,
              state: !ModelState.state,
            });
          }}
        />
        <BuyLifeCongrats
          ModalRef={SucessModalState}
          heading={'Congratulations'}
          description={'Products bought'}
          requestOnPress={() => {
            SucessModalState.current(false);
          }}
          closeOnPress={() => {
            SucessModalState.current(false);
            onRefresh();
            setModelState({
              ...ModelState,
              state: !ModelState.state,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.18,
  },
  card2Wrap: {
    top: '100%',
    bottom: 2,
    left: 0,
    position: 'absolute',
    paddingHorizontal: 5,
    width: '100%',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3.5,
  },
  header: {
    flexDirection: 'row',
    marginTop: height * 0.03,
    marginLeft: width * 0.034,
  },
  Section: {
    marginTop: height * 0.01,
    height: height * 0.12,
    justifyContent: 'center',
  },
  SectionView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 12,
  },
  ImageView: {
    width: width * 0.22,
    height: height * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  Image: {
    width: 80,
    height: 65,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  TextView: {
    marginLeft: width * 0.052,
  },
  LessMargin: {
    marginTop: height * 0.003,
    color: 'red',
  },
  card2: {
    width: width - 25,
    paddingBottom: heightConverter(65),
    backgroundColor: '#ffffff',
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
    bottom: 5,
    left: 2,
    alignItems: 'center',
    elevation: 3,
    position: 'absolute',
    paddingTop: 13,
    marginVertical: 30,
  },
  metaText: {
    color: '#000000',
    fontFamily: 'Axiforma-Regular',
    paddingVertical: 1.5,
  },
  text: {
    color: '#e7003f',
    fontFamily: 'Axiforma-Regular',
  },
  ///modal styles

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  MarginLarge: {
    paddingLeft: width * 0.09,
    fontSize: RFValue(12),
    color: Colors.WHITE,
  },
  headerText: {
    color: '#D9FE51',
    fontFamily: 'Axiforma-SemiBold',
    fontSize: RFValue(22),
  },
});
export default index;
