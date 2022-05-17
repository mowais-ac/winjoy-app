import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import {firebase} from '@react-native-firebase/analytics';
import Label from '../../Components/Label';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import {Card} from '../../Components';
import {GetCartData, RemoveCartData} from '../../redux/actions';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
} from '../../Components/Helpers/Responsive';
import appsFlyer from 'react-native-appsflyer';
import {wait} from '../../Constants/Functions';
import {connect, useDispatch, useSelector} from 'react-redux';
import Header from '../../Components/Header';
import EncryptedStorage from 'react-native-encrypted-storage';
import {RFValue} from 'react-native-responsive-fontsize';
import dayjs from 'dayjs';
import types from '../../redux/types';
import Config from 'react-native-config';
import {JSONtoForm} from '../../Constants/Functions';
import Counter from 'react-native-counters';
import BuyLifeCongrats from '../../Components/BuyLifeCongrats';
import Modals from '../../Components/Modals';
import {ProductDetails} from '../../redux/actions';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import {AppEventsLogger, Settings} from 'react-native-fbsdk-next';

const ProductDetail = ({props, navigation, route}) => {
  const cartData = useSelector(state => state.app.cartData);
  const isFocused = useIsFocused();
  const defaultAppAnalytics = firebase.analytics();
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const dispatch3 = useDispatch();
  const SucessModalState = useRef();
  const ModalErrorState = useRef();
  const counterMain = useSelector(state => state.app.counter);
  const [refreshing, setRefreshing] = React.useState(false);
  const [pd, setpd] = useState([]);
  const {productId} = route?.params;
  const [activity, setActivity] = useState(false);
  const [count, setCount] = useState(1);
  const [Loading, setLoading] = useState(true);
  const LandingData = useSelector(state => state.app.LandingData);
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
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    _Api(productId);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const onRefresh2 = React.useCallback(() => {
    dispatch3(GetCartData());
    wait(80).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    Settings.setAppID('1149665975867657');
    _Api(productId);

    firebase.app();
    firebase.analytics();
  }, []);
  const addCustomEvent = async () => {
    await defaultAppAnalytics.logAddToCart({
      currency: pd?.product?.price,
      value: count,
    });
  };
  const _Api = async productId => {
    setLoading(true);
    const Token = await EncryptedStorage.getItem('Token');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    };
    await fetch(`${Config.API_URL}/product/show/${productId}`, requestOptions)
      .then(async response => response.json())
      .then(res => {
        setpd(res);
        setLoading(false);
      });
  };
  //console.log('pdd', pd);
  const onChange = (number, type) => {
    setCount(number);
  };
  const SaveIdInfo = async () => {
    if (!pd?.product?.luckydraw.enable_buy) {
      alert('Thank you for your interest. This feature is coming soon');
    } else {
      setActivity(true);
      var postData = JSON.stringify({
        is_from_experience: false,
        product_id: pd?.product?.luckydraw?.product_id,
        count: count,
      });
      console.log('postData', postData);
      const Token = await EncryptedStorage.getItem('Token');

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: postData,
      };
      await fetch(`${Config.API_URL}/add_to_cart`, requestOptions)
        .then(async response => response.json())
        .then(async res => {
          if (res.status === 'success') {
            //console.log({ProductDetails: res});
            setActivity(false);
            //SucessModalState.current(true);
            dispatch({
              type: types.CART_COUNTER,
              counter: counterMain + count,
            });
          } else {
            setActivity(false);
            ModalErrorState.current(true, {
              heading: 'Error',
              Error: res.message,
              array: res.errors ? Object.values(res.errors) : [],
            });
          }
          setActivity(false);
        })
        .catch(e => {
          //  ButtonRef.current.SetActivity(false);
        });
    }
  };
  const NavigateToQuiz = fromSocket => {
    if (
      LandingData?.gameShow?.status === 'on_boarding' ||
      LandingData?.gameShow?.status === 'started' ||
      fromSocket
    ) {
      {
        console.log(
          'LandingData?.gameShow?.status',
          LandingData?.gameShow?.status,
        );
      }
      navigation.navigate('GameStack', {
        screen: 'Quiz',
        params: {
          uri: LandingData?.gameShow?.live_stream?.key,
          gameshowStatus: LandingData?.gameShow?.status,
        },
      });
    }
  };
  const eventName = 'af_add_to_cart';
  const eventValues = {
    af_price: pd?.product?.price,
    af_content_id: pd?.product?.luckydraw?.product_id,
    af_currency: 'AED',
    af_quantity: count,
    //  af_revenue: pd?.product?.price,
  };
  const fun_addtocart = () => {
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
  const fb_addtocart = () => {
    AppEventsLogger.logEvent('addtocart', {
      parameters: pd?.product?.luckydraw?.prize_title,
    });
  };
  return (
    <>
      {LandingData?.gameShow?.status === 'on_boarding' ||
      LandingData?.gameShow?.status === 'started' ? (
        NavigateToQuiz()
      ) : (
        <SafeAreaView
          style={{
            height: '76%',
            // paddingBottom: 120,
            backgroundColor: Platform.OS === 'android' ? null : '#420E92',
          }}>
          <ScrollView
            style={{backgroundColor: '#f6f1f3'}}
            refreshControl={
              <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }>
            <LinearGradient
              style={styles.mainView}
              colors={['#420E92', '#E7003F']}>
              <View style={{height: 18}} />
              <Header back={true} />
            </LinearGradient>
            {Loading ? (
              <ActivityIndicator size="large" color="#000000" />
            ) : (
              <View style={{paddingHorizontal: 15}}>
                <View style={styles.upperView}>
                  <Card
                    images={pd?.product?.images}
                    updated_stocks={parseInt(
                      pd?.product?.luckydraw?.updated_stock,
                    )}
                    stock={parseInt(pd?.product?.luckydraw?.stock)}
                  />
                </View>
                <View style={styles.card}>
                  <Text
                    style={{
                      color: '#000000',
                      fontFamily: 'Axiforma-Regular',
                      fontSize: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: '#E6DFEE',
                      width: '100%',
                      textAlign: 'center',
                      paddingVertical: 10,
                    }}>
                    {pd?.product?.title}
                  </Text>

                  <Label
                    primary
                    font={16}
                    dark
                    style={{color: '#E7003F', marginTop: 10, lineHeight: 20}}>
                    Get a chance to win
                  </Label>

                  {pd?.product?.luckydraw?.experience ? (
                    <Label
                      font={16}
                      dark
                      style={{color: '#000000', lineHeight: 20}}>
                      {pd?.product?.luckydraw?.experience?.title}
                    </Label>
                  ) : (
                    <Label font={16} dark style={{color: '#000000'}}>
                      {pd?.product?.luckydraw?.prize_title}
                    </Label>
                  )}
                  {pd?.product?.luckydraw?.enable_buy ? (
                    <Label
                      font={12}
                      light
                      style={{
                        color: '#000000',
                        paddingVertical: 10,
                        lineHeight: 17,
                      }}>
                      Max draw date{' '}
                      {dayjs(pd?.product?.luckydraw?.end_date).format(
                        'MMMM DD, YYYY',
                      )}
                      {'  '}
                      or when the campaign is sold out, which is earliest
                    </Label>
                  ) : (
                    <Label
                      font={12}
                      light
                      style={{
                        color: '#000000',
                        paddingVertical: 10,
                        lineHeight: 17,
                      }}>
                      Draw Date announce to be soon!
                    </Label>
                  )}
                  <View style={styles.closingTxt}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontFamily: 'Axiforma-Regular',
                        fontWeight: 'bold',
                        fontSize: 16,
                        textAlign: 'center',
                      }}>
                      Closing Soon
                    </Text>
                  </View>
                </View>
                <View style={styles.pdView}>
                  <Label
                    notAlign
                    primary
                    font={16}
                    bold
                    style={{marginTop: 4, color: '#E7003F', lineHeight: 28}}>
                    Product Details
                  </Label>
                  <Label
                    notAlign
                    font={11}
                    dark
                    style={{color: '#000000', lineHeight: 20}}>
                    {pd?.product?.description}
                  </Label>
                </View>
              </View>
            )}
          </ScrollView>
          <View style={styles.card2Wrap}>
            <View style={styles.card2}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                }}>
                {!Loading ? (
                  <View>
                    <Text style={styles.metaText}>
                      To enter in the lucky draw
                    </Text>
                    <Text style={[styles.metaText, {fontWeight: 'bold'}]}>
                      Buy a {pd?.product?.title}
                    </Text>
                  </View>
                ) : null}
                {Loading ? (
                  <ActivityIndicator size="small" color="#000000" />
                ) : (
                  <Text
                    style={[
                      styles.text,
                      {fontWeight: 'bold', fontSize: RFValue(14)},
                    ]}>
                    AED{' '}
                    {+pd?.product?.price?.toLocaleString() ||
                      +data?.product?.price?.toLocaleString()}
                  </Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Counter
                    buttonStyle={{borderWidth: 0}}
                    start={1}
                    buttonTextStyle={{
                      color: '#000000',
                      fontFamily: 'Axiforma-Bold',
                    }}
                    max={parseInt(pd?.product?.stock)}
                    countTextStyle={{
                      color: '#000000',
                      fontFamily: 'Axiforma-Bold',
                    }}
                    onChange={(number, type) => onChange(number, type)}
                  />
                </View>
                <TouchableOpacity
                  disabled={activity}
                  onPress={() => {
                    dispatch3(GetCartData());
                    fb_addtocart();
                    fun_addtocart();
                    addCustomEvent();
                    !Loading && SaveIdInfo();
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      paddingVertical: 15,
                      width: width * 0.55,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    colors={['#420E92', '#E7003F']}>
                    {activity ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <>
                        {Loading ? (
                          <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                          <Text
                            style={{
                              color: '#ffffff',
                              fontFamily: 'Axiforma-Bold',
                            }}>
                            Add to Cart
                          </Text>
                        )}
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <BuyLifeCongrats
            ModalRef={SucessModalState}
            heading={'Alert'}
            description={'Successfully added to cart'}
            requestOnPress={() => {
              SucessModalState.current(false);
            }}
            closeOnPress={() => {
              SucessModalState.current(false);
            }}
          />
          <Modals ModalRef={ModalErrorState} Error />
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: heightConverter(200),
  },
  bottomView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  LinerGradientProgrees: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    borderRadius: 9,
    height: 14,
    left: 2,
  },
  GreybarWidth: {
    width: widthPercentageToDP('95'),
    height: 18,
    zIndex: -1,
    position: 'absolute',
    backgroundColor: '#EADFE3',
    borderRadius: 9,
  },
  containerprogressBar: {
    width: widthPercentageToDP('95'),
    marginBottom: 1,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 3,
    marginLeft: 2,
    zIndex: 1,
  },
  upperView: {
    // marginTop: Platform.OS === 'android' ? -height * 0.13 : -135,
    marginTop: -height * 0.142,
    //position: 'absolute',
    width: '100%',
  },
  card: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#ffffff',
    paddingBottom: 22,
    marginBottom: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  card2Wrap: {
    top: Platform.OS === 'android' ? 540 : 600,
    left: 0,
    position: 'absolute',
    paddingHorizontal: 15,
    width: '100%',
  },
  card2: {
    width: '100%',
    backgroundColor: '#ffffff',
    marginTop: 10,
    borderRadius: 10,
    paddingBottom: 10,
    elevation: 3,
  },

  closingTxt: {
    color: '#ffffff',
    backgroundColor: '#e7003f',
    fontFamily: 'Axiforma-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 10,
    width: 140,
    textAlign: 'center',
    borderRadius: 20,
    left: '50%',
    marginLeft: -70,
    bottom: -20,
    position: 'absolute',
  },
  pdView: {
    minHeight: 100,
  },
  metaText: {
    lineHeight: 20,
    color: '#000000',
    fontFamily: 'Axiforma-Regular',
  },
  text: {
    color: '#e7003f',
    fontFamily: 'Axiforma-Regular',
  },
});

export default ProductDetail;
