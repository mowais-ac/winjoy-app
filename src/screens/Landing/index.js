import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  Alert,
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
  AppState,
} from 'react-native';
import {NativeModules} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
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
  IS_LOADING,
} from '../../redux/actions';
import socketIO from 'socket.io-client';
import {useTranslation} from 'react-i18next';
import HowItWorkModal from '../../Components/HowItWorkModal';
import NewVersionmodal from '../../Components/NewVersionmodal';
import packageJson from '../../../package.json';
import {getLiveShowPlans, GetCartData} from '../../redux/actions';
import {LeaderBoardWinners} from '../../redux/actions';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import appsFlyer from 'react-native-appsflyer';
const MYServer = 'https://node-winjoyserver-deploy.herokuapp.com/';
import {Settings, AppEventsLogger} from 'react-native-fbsdk-next';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import {
  InterstitialAd,
  TestIds,
  RewardedAd,
  RewardedAdEventType,
  MaxAdContentRating,
  AdEventType,
} from '@react-native-firebase/admob';
import {firebase} from '@react-native-firebase/admob';
Settings.setAppID('1149665975867657');
const adUnitId =
  Platform.OS === 'android'
    ? 'ca-app-pub-6197023613008935/5905492203'
    : 'ca-app-pub-6197023613008935/5461072406';
const versionandroid = DeviceInfo.getVersion();
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});
const index = props => {
  const isFocused = useIsFocused();
  const {t, i18n} = useTranslation();
  const socket = socketIO(MYServer);
  const LandingData = useSelector(state => state.app.LandingData);
  const isloading = useSelector(state => state.app.isloading);
  const gameEnterStatus = useSelector(state => state.app.gameEnterStatus);
  const walletData = useSelector(state => state.app.walletData);
  const livePlans = useSelector(state => state.app.livePlans);
  const userData = useSelector(state => state.app.userData);
  const totalLives = useSelector(state => state.app.totalLives);
  const navigation = useNavigation();
  const ModelVersioncheck = useRef();
  const [headerValue, setHeaderValue] = useState(0);
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeSlide, setActiveSlide] = useState();
  const [buffer, setBuffer] = useState(false);
  const [videoAction, setVideoAction] = useState(true);
  const [imgSlider, setImageSlider] = useState([]);
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();
  const dispatch2 = useDispatch();
  const dispatch3 = useDispatch();
  const dispatch4 = useDispatch();
  const dispatch5 = useDispatch();
  const dispatch6 = useDispatch();
  const dispatch7 = useDispatch();
  const dispatch8 = useDispatch();
  const dispatch9 = useDispatch();
  const defaultAppAdmob = firebase.admob();
  const AddModalState = useRef();
  const [Emails, setEmails] = useState('');
  const [time, setTime] = useState(() => {
    /* dispatch(getLandingScreen()); */
    var CurrentDate = new Date();
    var duration = dayjs(LandingData?.gameShow?.start_date).diff(
      dayjs(CurrentDate.toLocaleString()),
      'seconds',
    );
    return parseInt(duration);
  });
  const countDownFinishHandler = () => {
    console.log('counter_finish');
    onRefresh();
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getLandingScreen());
    dispatch6(getWalletData());
    var CurrentDate = new Date();
    var duration = dayjs(LandingData?.gameShow?.start_date).diff(
      dayjs(CurrentDate.toLocaleString()),
      'seconds',
    );
    setTime(parseInt(duration));
    !isloading && LandingData?.gameShow?.status === 'on_boarding'
      ? socket.on('sendOnboarding', msg => {
          console.log('Should navigate');
          NavigateToQuiz(true);
        })
      : null;
    Testnavigate();
    NavigateToQuiz();
    wait(800).then(() => setRefreshing(false));
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
  /*  console.log('landing_Data', LandingData);
  console.log('time_duration', time); */
  //InApp upgrade app
  const inAppUpdates = new SpInAppUpdates(
    false, // isDebug
  );
  const InAppupdate = () => {
    inAppUpdates.checkNeedsUpdate({curVersion: versionandroid}).then(result => {
      if (result.shouldUpdate) {
        const updateOptions: StartUpdateOptions = Platform.select({
          ios: {
            title: 'Update available',
            message:
              'There is a new version of the app available on the App Store, do you want to update it?',
            buttonUpgradeText: 'Update',
            buttonCancelText: 'Cancel',
          },
          android: {
            updateType: IAUUpdateKind.FLEXIBLE,
          },
        });
        inAppUpdates.startUpdate(updateOptions);
      }
    });
  };
  //Navigate to Noon
  const handleDynamicLink = link => {
    // Handle dynamic link inside your own application
    if (link.url === 'https://winjoy.ae') {
      navigation.navigate('Noon');
    }
  };
  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(async link => {
        if (link.url === 'https://winjoy.ae') {
          console.log('mylink', link.url);
          navigation.navigate('Noon');
        } else {
          alert(link.url);
        }
      });
  }, []);
  useEffect(() => {
    if (isFocused) {
      dispatch(getLandingScreen());
      dispatch6(getWalletData());
      dispatch8(getLiveShowPlans());
      dispatch5(AllCreatorsList());
      dispatch1(GetCartData());
      dispatch7(LeaderBoardWinners());
      setEmails(LandingData?.internalEmails);
      let arr = [];
      LandingData?.host_sliders_data?.map(ele => {
        arr.push(ele.url);
      });
      InAppupdate();
      socket.on('sendStartlivegameshow', msg => {
        dispatch(getLandingScreen());
        console.log('socketevent', msg);
      });
      socket.on('sendOnboarding', msg => {
        console.log('Should navigate');
        NavigateToQuiz(true);
      });
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
      var CurrentDate = new Date();
      var duration = dayjs(LandingData?.gameShow?.start_date).diff(
        dayjs(CurrentDate.toLocaleString()),
        'seconds',
      );
      setTime(parseInt(duration));
      setImageSlider(arr);
      LandingData?.gameShow?.status === 'on_boarding' ||
      LandingData?.gameShow?.status === 'started'
        ? NavigateToQuiz()
        : null;
      CreateChannal();
      defaultAppAdmob
        .setRequestConfiguration({
          maxAdContentRating: MaxAdContentRating.PG,
          tagForChildDirectedTreatment: true,
          tagForUnderAgeOfConsent: true,
        })
        .then(e => {
          console.log(e);
        });
    }
  }, [isFocused]);
  //appsflyer integration
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
  //navigate to gameshow
  const NavigateToQuiz = fromSocket => {
    if (!LandingData?.is_testing_user) {
      if (
        LandingData?.gameShow?.status === 'on_boarding' ||
        LandingData?.gameShow?.status === 'started' ||
        fromSocket
      ) {
        if (interstitial.loaded) {
          interstitial.show().catch(error => console.log('admob_error', error));
        }
        console.log('Gameshow_Status', LandingData?.gameShow?.status);
        navigation.navigate('GameStack', {
          screen: 'Quiz',
          params: {
            streamUrl: LandingData.streamUrl,
            uri: LandingData?.gameShow?.live_stream?.key,
            gameshow: LandingData?.gameShow,
            completed_questions: LandingData?.gameShow?.completed_questions,
          },
        });
      }
    }
  };
  //Istesting enable, navigate to gameshow
  const Testnavigate = () => {
    if (
      LandingData?.is_testing_user &&
      LandingData?.gameShow?.status === 'on_boarding'
    ) {
      navigation.navigate('GameStack', {
        screen: 'Quiz',
        params: {
          streamUrl: LandingData.streamUrl,
          uri: LandingData?.gameShow?.live_stream?.key,
          gameshowStatus: LandingData?.gameShow?.status,
          completed_questions: LandingData?.gameShow?.completed_questions,
        },
      });
    } else {
      return null;
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
  const [loaded, setLoaded] = useState(false);
  //admob interstitialAd for gameshow
  useEffect(() => {
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        console.log('InterstitialAd adLoaded');
      } else if (type === AdEventType.ERROR) {
        console.warn('InterstitialAd => Error');
      } else if (type === AdEventType.OPENED) {
        console.log('InterstitialAd => adOpened');
      }
    });
    // Start loading the interstitial straight away
    interstitial.load();
    //Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, []);
  //pushnotification press to navigate specific screen
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      console.log('remoteMessage.data:', remoteMessage.data);

      navigation.navigate('TriviaJoy');
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          console.log('remoteMessage.data1:', remoteMessage.data);
          navigation.navigate('DealzJoy'); // e.g. "Settings"
        }
      });
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#420E92'}}>
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

      {LandingData && LandingData.updated_version ? (
        <NewVersionmodal
          updatedVersion={LandingData?.updated_version}
          currentV={packageJson.version}
          ModalRef={ModelVersioncheck}
          updatedVersionios={LandingData?.updated_version_ios}
        />
      ) : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          setHeaderValue(e.nativeEvent.contentOffset.y);
        }}
        style={{backgroundColor: '#f6f1f3'}}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }>
        <View
          style={{
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LinearGradient
            colors={['#5B0C86', '#E7003F']}
            style={styles.mainView}>
            <View style={styles.wrap}>
              {isloading ? (
                <ActivityIndicator size="large" color="#ffffff" />
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
              <TouchableOpacity onPress={() => navigation.navigate('WALLET')}>
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
                        ? FormatNumber(
                            parseFloat(
                              walletData?.wallet?.your_balance,
                            ).toFixed(2),
                          )
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
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 4,
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
                backgroundColor: '#ffffff',
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
                    ? navigation.navigate('TriviaJoy')
                    : index === 1
                    ? navigation.navigate('DealsJoy')
                    : navigation.navigate('AllCreatorsPage');
                }}
              />
            )}
            keyExtractor={item => item.id}
          />
          {isloading ? (
            <ActivityIndicator size="small" color="#000000" />
          ) : (
            <View
              style={{
                flex: 1,
                marginTop: 5,
                flexDirection: 'row',
                marginBottom: 0,
              }}>
              <SliderBox
                images={imgSlider}
                sliderBoxHeight={150}
                resizeMode={'contain'}
                ImageComponentStyle={{
                  borderRadius: Platform.OS === 'android' ? 8 : 15,
                  width: '94%',
                  padding: 0,
                }}
                imageLoadingColor="#000000"
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                dotStyle={{top: 2.3}}
                autoplay={true}
                circleLoop={true}
                onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
                }
                currentImageEmitter={index =>
                  console.warn(`current postors is: ${index}`)
                }
              />
            </View>
          )}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          {isloading ? (
            <ActivityIndicator size="small" color="#000000" />
          ) : LandingData?.home_middle_banners_data ? (
            <HomeCard
              images={LandingData?.home_middle_banners_data}
              time={!isloading ? time : 0}
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
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 5,
              }}>
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
                {isloading ? (
                  <ActivityIndicator size="large" color="#000000" />
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
                  style={{
                    width: width / 3.45,
                    height: height * 0.2,
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 4,
                  }}
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
              style={{
                marginTop: 15,
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.5,
                shadowRadius: 5,
                elevation: 4,
              }}
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
  );
};

export default index;
