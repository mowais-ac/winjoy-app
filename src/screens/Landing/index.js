import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar,
  BackHandler,
} from 'react-native';
import {getWalletData} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {FormatNumber, wait} from '../../Constants/Functions';
import {SliderBox} from 'react-native-image-slider-box';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/Header';
import {RFValue} from 'react-native-responsive-fontsize';
import styles from './styles';
import {HomeCard, LuckyDrawCard, TriviaNightCard} from '../../Components';
import dayjs from 'dayjs';
import LongButton from '../../Components/LongButton';
import {FanJoyCard, ClosingSoonCard} from '../../Components';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';
import PushNotification from 'react-native-push-notification';
import {useNavigation} from '@react-navigation/native';
import {
  getLandingScreen,
  CheckGameEnterStatus,
  TriviaJoyAPI,
  AllCreatorsList,
  ProductDetails,
} from '../../redux/actions';
import socketIO from 'socket.io-client';
import {useTranslation} from 'react-i18next';
import HowItWorkModal from '../../Components/HowItWorkModal';
import NewVersionmodal from '../../Components/NewVersionmodal';
import packageJson from '../../../package.json';
import {getLiveShowPlans} from '../../redux/actions';
import {LeaderBoardWinners} from '../../redux/actions';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import appsFlyer from 'react-native-appsflyer';
const MYServer = 'https://node-winjoyserver-deploy.herokuapp.com/';
import {Settings, AppEventsLogger} from 'react-native-fbsdk-next';
import DeviceInfo from 'react-native-device-info';
const index = props => {
  Settings.setAppID('1149665975867657');
  const {t, i18n} = useTranslation();
  const ModelVersioncheck = useRef();
  const [headerValue, setHeaderValue] = useState(0);
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [time, setTime] = useState('');
  const [activeSlide, setActiveSlide] = useState();
  const userData = useSelector(state => state.app.userData);
  const LandingData = useSelector(state => state.app.LandingData);
  const gameEnterStatus = useSelector(state => state.app.gameEnterStatus);
  const totalLives = useSelector(state => state.app.totalLives);
  const loading = useSelector(state => state.app.loading);
  const [buffer, setBuffer] = useState(false);
  const [videoAction, setVideoAction] = useState(true);
  const [imgSlider, setImageSlider] = useState([]);
  const navigation = useNavigation();
  const walletData = useSelector(state => state.app.walletData);
  const livePlans = useSelector(state => state.app.livePlans);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const dispatch3 = useDispatch();
  const dispatch4 = useDispatch();
  const dispatch5 = useDispatch();
  const dispatch6 = useDispatch();
  const dispatch7 = useDispatch();
  const dispatch8 = useDispatch();
  //console.log('deep', LandingData?.products);
  const socket = socketIO(MYServer);
  const AddModalState = useRef();
  //tapjoy

  /*  const [
    {tapjoyEvents},
    {
      initialiseTapjoy,
      listenToEvent,
      addTapjoyPlacement,
      showTapjoyPlacement,
      requestTapjoyPlacementContent,
      isTapjoyConnected,
      tapjoyListenForEarnedCurrency,
      getTapjoyCurrencyBalance,
      setTapjoyUserId,
      spendTapjoyCurrency,
    },
  ] = useTapjoy(tapjoyOptions);
  useEffect(() => {
    const listeners = {};
    tapjoyEvents.forEach(tapjoyEvent => {
      listeners[tapjoyEvent] = listenToEvent(tapjoyEvent, evt => {
        console.warn(evt);
      });
    });
    return () => {
      for (const key in listeners) {
        if (listeners[key] && listeners[key].remove) {
          listeners[key].remove();
        }
      }
    };
  }, [listenToEvent, tapjoyEvents]);
 */
  const countDownFinishHandler = () => {
    console.log('hello');
    onRefresh();
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch6(getWalletData());
    dispatch(getLandingScreen());
    var CurrentDate = new Date().toLocaleString();
    var duration = dayjs(LandingData?.gameShow?.start_date).diff(
      dayjs(CurrentDate),
      'seconds',
    );

    console.log('show', duration);
    setTime(duration);
    Testnavigate();
    NavigateToQuiz();
    wait(500).then(() => setRefreshing(false));
  }, []);

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
  useEffect(() => {
    dispatch6(getWalletData());
    dispatch8(getLiveShowPlans());
    dispatch5(AllCreatorsList());
    dispatch7(LeaderBoardWinners());
    socket.on('sendStartlivegameshow', msg => {
      dispatch(getLandingScreen());
    });
    socket.on('sendOnboarding', msg => {
      console.log('Should navigate');
      NavigateToQuiz(true);
    });
    {
      console.log('First time render');
    }

    dispatch(getLandingScreen());
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
    /*  dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (`${link.url}` === 'https://winjoy.ae?referral=310') {
          {
            console.log('link1', link);
          }
        } else {
          alert(`https://winjoy.ae/invite/token?${livePlans?.refer_code}`);
        }
      }); */
    var CurrentDate = new Date().toLocaleString();
    var duration = dayjs(LandingData?.upcoming_gameshow?.start_date).diff(
      dayjs(CurrentDate),
      'seconds',
    );

    console.log('duration', duration);
    setTime(duration);

    let arr = [];
    LandingData?.host_sliders_data?.map(ele => {
      arr.push(ele.url);
    });
    setImageSlider(arr);
    NavigateToQuiz();
    CreateChannal();
  }, [getLandingScreen]);
  var onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
    res => {
      if (JSON.parse(res.data.is_first_launch) == true) {
        if (res.data.af_status === 'Non-organic') {
          var media_source = res.data.media_source;
          var campaign = res.data.campaign;
          console.log(
            'This is first launch and a Non-Organic install. Media source: ' +
              media_source +
              ' Campaign: ' +
              campaign,
          );
        } else if (res.data.af_status === 'Organic') {
          console.log('This is first launch and a Organic Install');
        }
      } else {
        console.log('This is not first launch');
      }
    },
  );

  var onAppOpenAttributionCanceller = appsFlyer.onAppOpenAttribution(res => {
    console.log(res);
  });
  useEffect(() => {
    return () => {
      // Optionaly remove listeners for deep link data if you no longer need them after componentWillUnmount
      if (onInstallConversionDataCanceller) {
        onInstallConversionDataCanceller();
        console.log('unregister onInstallConversionDataCanceller');
        onInstallConversionDataCanceller = null;
      }
      if (onAppOpenAttributionCanceller) {
        onAppOpenAttributionCanceller();
        console.log('unregister onAppOpenAttributionCanceller');
        onAppOpenAttributionCanceller = null;
      }
    };
  });
  //PushNotification
  const CreateChannal = () => {
    PushNotification.createChannel({
      channelId: 'Winjoy',
      channelName: 'Winjoy',
    });
  };
  /*  console.log('LandingData', LandingData); */
  const NavigateToQuiz = fromSocket => {
    console.log('NQ: ', LandingData?.gameShow);
    if (
      parseInt(LandingData.updatedVersion) === parseInt(packageJson.version)
    ) {
      if (
        LandingData?.gameShow?.status === 'on_boarding' ||
        LandingData?.gameShow?.status === 'started' ||
        fromSocket
      ) {
        /* const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          () => true,
        );
        return () => backHandler.exitApp(); */
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
            completed_questions: LandingData?.gameShow?.completed_questions,
          },
        });
      }
    }
  };

  const Testnavigate = () => {
    if (LandingData?.internalEmails && LandingData?.is_testing === true) {
      navigation.navigate('GameStack', {
        screen: 'Quiz',
        params: {
          uri: LandingData?.gameShow?.live_stream?.key,
          gameshowStatus: LandingData?.gameShow?.status,
        },
      });
    } else {
      return null;
    }
  };

  const LetBegin = () => {
    // dispatch2(CheckGameEnterStatus());
    if (gameEnterStatus.status === 'success') {
      NavigateToQuiz();
    } else {
      alert('game not started yet!');
    }
  };

  function _renderItem({item, index}) {
    if (item.type === 'image') {
      return (
        <View key={index}>
          <Image
            source={{uri: item.url}}
            resizeMode={'cover'}
            style={styles.ShoppingBanner}
          />
        </View>
      );
    } else {
      return (
        <View
          key={index}
          style={{
            backgroundColor: '#000000',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}>
          {item.url ? (
            <Video
              source={{uri: item.url}}
              resizeMode={'cover'}
              paused={index !== activeSlide}
              minLoadRetryCount={2}
              fullScreen={true}
              ignoreSilentSwitch={'obey'}
              onLoad={() => setBuffer(false)}
              onLoadStart={() => setVideoAction(false)}
              controls={false}
              onEnd={() => setVideoAction(true)}
              style={styles.ShoppingBanner}
            />
          ) : null}
        </View>
      );
    }
  }
  const eventName1 = 'af_list_view';
  const eventValues1 = {
    af_content_list: 1,
    af_content_type: 'Home_products',
  };
  const fun_listview = () => {
    appsFlyer.logEvent(
      eventName1,
      eventValues1,
      res => {
        console.log(res);
      },
      err => {
        console.error(err);
      },
    );
  };

  const eventName = 'af_content_view';
  const eventValues = {
    af_price: 99,
    af_content_id: 12,
    af_content_type: 'General',
    af_currency: 'AED',
    af_content: 'Homeproducts',
  };

  const fun_contentview = () => {
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
  //console.log('LandingData?.products', LandingData?.products);
  return (
    <>
      {LandingData?.gameShow?.status === 'on_boarding' ||
      LandingData?.gameShow?.status === 'started' ? (
        NavigateToQuiz()
      ) : (
        <SafeAreaView style={{backgroundColor: '#420E92'}}>
          {/* <StatusBar barStyle="#420E92" /> */}

          <Header
            style={{
              position: 'absolute',
              zIndex: 1000,
              backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
              width: '100%',
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              top: Platform.OS === 'android' ? 0 : height * 0.05,
            }}
          />
          {console.log('iosv', LandingData?.updated_version_ios)}
          {LandingData && LandingData.updated_version ? (
            <NewVersionmodal
              updatedVersion={LandingData?.updated_version}
              currentV={packageJson.version}
              ModalRef={ModelVersioncheck}
              updatedVersionios={LandingData?.updated_version_ios}
            />
          ) : null}
          <ScrollView
            onScroll={e => {
              setHeaderValue(e.nativeEvent.contentOffset.y);
            }}
            style={{backgroundColor: '#f6f1f3'}}
            refreshControl={
              <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }>
            <View style={{width: '100%', alignItems: 'center'}}>
              <LinearGradient
                colors={['#5B0C86', '#E7003F']}
                style={styles.mainView}>
                <View style={styles.wrap}>
                  {loader ? (
                    <ActivityIndicator size="large" color="#fff" />
                  ) : (
                    <>
                      {LandingData?.banners ? (
                        <Video
                          source={{uri: LandingData?.banners[0]?.url}} // Can be a URL or a local file.
                          resizeMode={'cover'}
                          repeat={true}
                          minLoadRetryCount={2}
                          fullScreen={true}
                          ignoreSilentSwitch={'obey'}
                          onLoad={() => setBuffer(false)}
                          onLoadStart={() => setVideoAction(false)}
                          controls={false}
                          onEnd={() => setVideoAction(true)}
                          style={styles.ShoppingBanner}
                        />
                      ) : null}
                    </>
                  )}
                </View>
                <View style={styles.yellowBtn}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('WALLET')}>
                    <View style={styles.secondHeaderMiddleView}>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: '#fff',
                            fontSize: RFValue(15),
                            fontFamily: 'Axiforma-SemiBold',
                          },
                        ]}>
                        Your Balance:{' '}
                        <Text
                          style={[
                            styles.text,
                            {
                              color: '#ffff00',
                              fontSize: RFValue(15),
                              fontFamily: 'Axiforma-SemiBold',
                            },
                          ]}>
                          AED{' '}
                          {walletData?.wallet?.your_balance
                            ? parseFloat(
                                walletData?.wallet?.your_balance,
                              ).toFixed(2)
                            : 0}
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('MenuStack', {screen: 'BuyLife'})
                    }>
                    <ImageBackground
                      resizeMode="cover"
                      style={{
                        width: 50,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      source={require('../../assets/imgs/pinkHeart.png')}>
                      <Text
                        style={{
                          color: '#E7003F',
                          fontFamily: 'Axiforma-SemiBold',
                          fontSize: RFValue(12),
                        }}>
                        {totalLives ? totalLives : 0}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </LinearGradient>

              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 100,
                    height: 40,
                    marginTop: -20,
                    paddingHorizontal: 15,
                    backgroundColor: '#fff',
                    marginBottom: 10,
                    justifyContent: 'space-between',
                  }}
                  onPress={() => {
                    AddModalState.current(true);
                  }}>
                  <Image
                    style={{width: 22, height: 22, marginRight: 10}}
                    source={require('../../assets/imgs/iconPlay.png')}
                  />
                  <Text
                    style={{
                      color: '#420E92',
                      fontSize: RFValue(14),
                      fontFamily: 'Axiforma-SemiBold',
                    }}>
                    How it works
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                horizontal={true}
                style={{marginLeft: 1, width: '100%'}}
                contentContainerStyle={{
                  marginLeft: 10,
                  alignSelf: 'flex-start',
                  paddingVertical: 5,
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={LandingData?.lowerBanner}
                renderItem={({item, index}) => (
                  <TriviaNightCard
                    uri={item.url}
                    index={item.index}
                    item={item}
                    onPress={() => {
                      index === 0
                        ? (navigation.navigate('TriviaJoy'),
                          dispatch4(TriviaJoyAPI()))
                        : index === 1
                        ? navigation.navigate('DealsJoy')
                        : //  navigation.navigate("FanJoy")
                          navigation.navigate('AllCreatorsPage');
                    }}
                  />
                )}
                keyExtractor={item => item.id}
              />

              <View
                style={{
                  flex: 1,
                  marginTop: 8,
                  flexDirection: 'row',
                }}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fffff" />
                ) : (
                  <SliderBox
                    images={imgSlider}
                    sliderBoxHeight={150}
                    resizeMode={'cover'}
                    ImageComponentStyle={{
                      borderRadius: 15,
                      width: '95%',
                      marginTop: 5,
                    }}
                    imageLoadingColor="black"
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE"
                    dotStyle={{top: 5}}
                    autoplay={true}
                    circleLoop={true}
                    onCurrentImagePressed={index =>
                      console.warn(`image ${index} pressed`)
                    }
                    currentImageEmitter={index =>
                      console.warn(`current pos is: ${index}`)
                    }
                  />
                )}
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
              {LandingData?.home_middle_banners_data ? (
                <HomeCard
                  onPress={() => LetBegin()}
                  images={LandingData?.home_middle_banners_data}
                  time={time}
                  gameShow={LandingData?.gameShow}
                  upcoming_gameshow={LandingData?.upcoming_gameshow}
                  countDownFinish={() => {
                    countDownFinishHandler();
                  }}
                />
              ) : null}
              <View
                style={{
                  width: '95%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <View style={{marginBottom: 8}}>
                  <Text
                    style={{
                      color: '#E7003F',
                      fontSize: 20,
                      fontFamily: 'Axiforma-Bold',
                    }}>
                    Shop to Win
                  </Text>
                  <Text
                    style={{
                      color: '#0B2142',
                      fontSize: 16,
                      fontFamily: 'Axiforma-Regular',
                      lineHeight: Platform.OS === 'android' ? 20 : 28,
                    }}>
                    Shop More Win More
                  </Text>
                </View>
                <LongButton
                  style={[styles.Margin, {backgroundColor: '#ffffff'}]}
                  textstyle={{
                    color: '#000000',
                    fontFamily: 'Axiforma-SemiBold',
                    fontSize: 14,
                  }}
                  text="View all"
                  font={16}
                  shadowless
                  onPress={() => {
                    // {
                    //   Platform.OS === 'android' ? fun_contentview() : null;
                    // }
                    fun_contentview();
                    fun_listview();
                    navigation.navigate('PRODUCTS', {
                      screen: 'PrizeList',
                    });
                  }}
                />
              </View>

              <FlatList
                horizontal={true}
                style={{}}
                contentContainerStyle={{
                  alignSelf: 'flex-start',
                  paddingRight: width * 0.04,
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={LandingData?.products}
                renderItem={({item}) => (
                  <ClosingSoonCard
                    onPress={() => {
                      navigation.navigate('ProductDetail', {
                        productId: item?.product?.id,
                      });
                    }}
                    props={props}
                    index={item.index}
                    item={item}
                  />
                )}
                keyExtractor={item => item.id}
                ListEmptyComponent={() => (
                  <>
                    {loading ? (
                      <ActivityIndicator size="large" color="yellow" />
                    ) : (
                      <Text
                        style={{
                          color: '#000000',
                          textAlign: 'center',
                        }}>
                        The list is empty
                      </Text>
                    )}
                  </>
                )}
              />
              <View style={{paddingVertical: 12}}>
                <View style={styles.avatarBannerView}>
                  {LandingData?.leaderboard_home_data ? (
                    <Image
                      style={[
                        styles.avatarBannerView,
                        {position: 'absolute', overlayColor: '#f6f1f3'},
                      ]}
                      source={{
                        uri: LandingData?.leaderboard_home_data[0]?.url,
                      }}
                    />
                  ) : null}

                  <LongButton
                    style={[
                      styles.Margin,
                      {
                        backgroundColor: '#ffffff',
                        position: 'absolute',
                        bottom: 10,
                        right: 25,
                      },
                    ]}
                    textstyle={{
                      color: '#000000',
                      fontFamily: 'Axiforma-SemiBold',
                      fontSize: 10,
                    }}
                    text="View Leaderboard"
                    font={10}
                    shadowless
                    onPress={() =>
                      navigation.navigate('MenuStack', {
                        screen: 'LeaderBoard',
                      })
                    }
                  />
                  <View style={{width: '95%'}}>
                    <Text
                      style={{
                        color: '#000000',
                        fontFamily: 'Axiforma-SemiBold',
                        fontSize: RFValue(20),
                      }}>
                      50+
                    </Text>
                    <Text
                      style={{
                        color: '#000000',
                        fontFamily: 'Axiforma-SemiBold',
                        fontSize: RFValue(20),
                      }}>
                      Winners
                    </Text>
                  </View>
                </View>
              </View>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#f8d7e8', '#c7dfe8']}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  paddingLeft: 15,
                  paddingTop: 20,
                  paddingBottom: 20,
                }}>
                <View
                  style={{
                    width: '95%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        color: '#E7003F',
                        fontSize: 20,
                        fontFamily: 'Axiforma-Bold',
                      }}>
                      Fanjoy
                    </Text>
                    <Text
                      style={{
                        color: '#0B2142',
                        fontSize: 16,
                        fontFamily: 'Axiforma',
                        lineHeight: Platform.OS === 'android' ? 22 : 30,
                      }}>
                      Products by creators
                    </Text>
                  </View>
                  <LongButton
                    style={[
                      styles.Margin,
                      {backgroundColor: '#ffffff', width: width * 0.35},
                    ]}
                    textstyle={{
                      color: '#000000',
                      fontFamily: 'Axiforma-SemiBold',
                      fontSize: 14,
                    }}
                    text="View all stars"
                    font={16}
                    shadowless
                    onPress={() => {
                      navigation.navigate('AllCreatorsList');
                    }}
                  />
                </View>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={LandingData?.funJoy}
                  horizontal={true}
                  renderItem={({item}) => (
                    <FanJoyCard
                      style={{width: width / 3.45, height: height * 0.2}}
                      name={item?.first_name + ' ' + item.last_name}
                      imageUrl={item?.image}
                      fans={item.fans}
                      id={item.id}
                    />
                  )}
                  ItemSeparatorComponent={() => {
                    return <View style={{width: width * 0.03}} />;
                  }}
                  contentContainerStyle={{
                    marginTop: 10,
                  }}
                  keyExtractor={item => item.id}
                />
              </LinearGradient>
              {LandingData?.luckydraw_results_data ? (
                <LuckyDrawCard
                  image={LandingData?.luckydraw_results_data[0]?.url}
                  style={{marginTop: 15}}
                  onPress={() => {
                    navigation.navigate('MenuStack', {
                      screen: 'RefferAndEarn',
                    });
                  }}
                />
              ) : null}

              <View style={{height: 10}} />
            </View>
            <HowItWorkModal
              ModalRef={AddModalState}
              details
              video={
                'https://winjoy-assets.s3.amazonaws.com/how_it_work/Mostafa_wj-intro+(1).mp4'
              }
              cross={true}
            />
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default index;
