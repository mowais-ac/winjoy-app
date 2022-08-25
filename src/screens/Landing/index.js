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
import EncryptedStorage from 'react-native-encrypted-storage';
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
import socketIO from 'socket.io-client';
import {useTranslation} from 'react-i18next';
import HowItWorkModal from '../../Components/HowItWorkModal';
import NewVersionmodal from '../../Components/NewVersionmodal';
import packageJson from '../../../package.json';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import appsFlyer from 'react-native-appsflyer';
import {Settings, AppEventsLogger} from 'react-native-fbsdk-next';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import Causes from '../../Components/Fanjoy_comp/Causes';
import {Winjoy} from '../../redux/Winjoy';
import {firebase} from '@react-native-firebase/admob';
import Picknumbers from '../../Components/Livescomponents/Picknumbers';
import Config from 'react-native-config';
import {
  InterstitialAd,
  TestIds,
  RewardedAd,
  RewardedAdEventType,
  MaxAdContentRating,
  AdEventType,
} from '@react-native-firebase/admob';
import {
  getLandingScreen,
  CheckGameEnterStatus,
  TriviaJoyAPI,
  AllCreatorsList,
  ProductDetails,
  IS_LOADING,
  getWalletData,
  getLiveShowPlans,
  GetCartData,
  LeaderBoardWinners,
  Home_Details,
  Fanjoyalldata,
  Slug_Details,
} from '../../redux/actions';
const MYServer = 'https://node-winjoyserver-deploy.herokuapp.com/';
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
  const Fanjoy_data = useSelector(state => state.app.fanjoyalldata);
  const Homedetails = useSelector(state => state?.app?.homeDetails?.data);
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
  const [loaded, setLoaded] = useState(false);
  const [videoAction, setVideoAction] = useState(true);
  const [imgSlider, setImageSlider] = useState([]);
  const [home, setHome] = useState(null);
  const [status, setStatus] = useState('');
  const [home2, setHome2] = useState(null);
  const [status2, setStatus2] = useState('');
  const [PnmodalVisible, setPnmodalVisible] = useState(false);
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
  const dispatch10 = useDispatch();
  const dispatch11 = useDispatch();
  const datas1 = useRef([]);
  const datas2 = useRef([]);
  const defaultAppAdmob = firebase.admob();
  const AddModalState = useRef();
  const [Emails, setEmails] = useState('');
  const Homenavigator = async () => {
    if (home === null) {
      setLoader(true);
      try {
        const Token = await EncryptedStorage.getItem('Token');
        console.log(Token);
        return await Winjoy.get('home', {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }).then(res => {
          if (res?.data?.status === 'success') {
            setLoader(false);
            setHome(res.data);
            //  console.log('sarwar1', res.data);
          }
          /*  else {
          setLoader(false);
          ModalErrorState.current(true, {
            heading: 'error',
            Error: res?.data?.message,
          });
        } */
        });
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    }
  };
  const Livenavigator = async () => {
    if (home2 === null) {
      const Token = await EncryptedStorage.getItem('Token');
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      };
      await fetch(`${Config.API_URL}/liveluckydraw`, requestOptions)
        //await fetch('https://testing.winjoy.ae/public/api/', requestOptions)
        .then(async response => response.json())
        .then(async res => {
          // console.log('aftab1', res);
          setHome2(res);
        });
    }
  };
  const [time, setTime] = useState(() => {
    /* dispatch(getLandingScreen()); */
    var CurrentDate = new Date();
    var duration = dayjs(home?.gameShow?.start_date).diff(
      dayjs(CurrentDate.toLocaleString()),
      'seconds',
    );
    return parseInt(duration);
  });
  //console.log('home2', home?.gameShow?.start_date);
  const countDownFinishHandler = () => {
    console.log('counter_finish');
    onRefresh();
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getLandingScreen());
    dispatch6(getWalletData());
    var CurrentDate = new Date();
    var duration = dayjs(home?.gameShow?.start_date).diff(
      dayjs(CurrentDate.toLocaleString()),
      'seconds',
    );
    setTime(parseInt(duration));
    /* in_venue */
    if (
      home?.gameShow?.status === 'on_boarding' ||
      home?.gameShow?.status === 'started'
    ) {
      if (home?.gameShow?.type === 'in_venue') {
        setPnmodalVisible(true);
      } else {
        NavigateToQuiz();
        Testnavigate();
      }
    }
    wait(1000).then(() => setRefreshing(false));
  }, []);
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
    dispatch(getLandingScreen());
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    Livenavigator();
    Homenavigator();
    //for liveluckydraw
    socket.on('sendOnboard', msg => {
      Livenavigator();
      if (msg.status === home2?.live_luckydraw?.status)
        navigation.navigate('LiveStack', {screen: 'LiveProducts'});
    });
    if ('on_board' === home2?.live_luckydraw?.status) {
      navigation.navigate('LiveStack', {screen: 'LiveProducts'});
    }
    //for Gameshow
    socket.on('sendOnboarding', msg => {
      Homenavigator();
      if (home?.gameShow?.type === 'in_venue') {
        setPnmodalVisible(true);
      } else {
        NavigateToQuiz();
        Testnavigate();
      }
    });
    /*  in_venue */
    if (
      home?.gameShow?.status === 'on_boarding' ||
      home?.gameShow?.status === 'started'
    ) {
      if (home?.gameShow?.type === 'in_venue') {
        setPnmodalVisible(true);
      } else {
        NavigateToQuiz();
        Testnavigate();
      }
    }

    dynamicLinks()
      .getInitialLink()
      .then(async link => {
        if (link.url === 'https://winjoy.ae') {
          // console.log('mylink', link.url);
          navigation.navigate('Noon');
        } else {
          alert(link.url);
        }
      });
  }, [home, home2]);
  useEffect(() => {
    if (isFocused) {
      Livenavigator();
      Homenavigator();
      dispatch(Fanjoyalldata());
      dispatch6(getWalletData());
      dispatch8(getLiveShowPlans());
      dispatch5(AllCreatorsList());
      dispatch1(GetCartData());
      dispatch7(LeaderBoardWinners());
      dispatch(getLandingScreen());
      let arr = [];
      LandingData?.host_sliders_data?.map(ele => {
        arr.push(ele.url);
      });
      InAppupdate();
      //for liveluckydraw
      socket.on('sendOnboard', msg => {
        Livenavigator();
        if (msg.status === home2?.live_luckydraw?.status)
          navigation.navigate('LiveStack', {screen: 'LiveProducts'});
      });
      if ('on_board' === home2?.live_luckydraw?.status) {
        navigation.navigate('LiveStack', {screen: 'LiveProducts'});
      }
      //for Gameshow
      socket.on('sendOnboarding', msg => {
        Homenavigator();
        if (home?.gameShow?.type === 'in_venue') {
          setPnmodalVisible(true);
        } else {
          NavigateToQuiz();
          Testnavigate();
        }
      });
      /*    in_venue */
      if (
        home?.gameShow?.status === 'on_boarding' ||
        home?.gameShow?.status === 'started'
      ) {
        if (home?.gameShow?.type === 'in_venue') {
          setPnmodalVisible(true);
        } else {
          NavigateToQuiz();
          Testnavigate();
        }
      }
      var CurrentDate = new Date();
      var duration = dayjs(home?.gameShow?.start_date).diff(
        dayjs(CurrentDate.toLocaleString()),
        'seconds',
      );
      setTime(parseInt(duration));
      setImageSlider(arr);
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
  }, [isFocused, home, home2]);
  //PushNotification
  const CreateChannal = () => {
    PushNotification.createChannel({
      channelId: 'Winjoy',
      channelName: 'Winjoy',
    });
  };
  //navigate to gameshow
  const NavigateToQuiz = fromSocket => {
    if (!home?.is_testing_user) {
      if (interstitial.loaded) {
        interstitial.show().catch(error => console.log('admob_error', error));
      }
      console.log('Gameshow_Status1', status);
      navigation.navigate('GameStack', {
        screen: 'Quiz',
        params: {
          streamUrl: home?.streamUrl,
          uri: home?.gameShow?.live_stream?.key,
          gameshow: home?.gameShow,
          completed_questions: home?.gameShow?.completed_questions,
        },
      });
    }
  };
  //Istesting enable, navigate to gameshow
  const Testnavigate = () => {
    if (home?.is_testing_user) {
      navigation.navigate('GameStack', {
        screen: 'Quiz',
        params: {
          streamUrl: home?.streamUrl,
          uri: home?.gameShow?.live_stream?.key,
          gameshowStatus: home?.gameShow?.status,
          completed_questions: home?.gameShow?.completed_questions,
        },
      });
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
    <SafeAreaView style={styles.SafeAreaView}>
      <Header
        style={[
          styles.header,
          {backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null},
          {top: Platform.OS === 'android' ? 0 : height * 0.05},
        ]}
      />
      {LandingData && LandingData.updated_version ? (
        <NewVersionmodal
          updatedVersion={LandingData?.updated_version}
          currentV={packageJson.version}
          ModalRef={ModelVersioncheck}
          updatedVersionios={LandingData?.updated_version_ios}
        />
      ) : null}
      {/*       <TouchableOpacity
        style={{marginTop: 70}}
        onPress={
          () => navigation.navigate('LiveStack', {screen: 'LiveProducts'})
          //navigation.navigate('Webrtc')
        }>
        <Text
          style={[
            styles.text,
            {
              color: '#fff',
              fontSize: RFValue(15),
              fontFamily: 'Axiforma-SemiBold',
            },
          ]}>
          {' '}
          Your Balance
        </Text>
      </TouchableOpacity> */}
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
        <View style={styles.mainbody}>
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
                  <Text style={styles.text}>
                    Your Balance:{' '}
                    <Text style={styles.text2}>
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
                  style={styles.bgheart}
                  source={require('../../assets/imgs/pinkHeart.png')}>
                  <Text style={styles.livetext}>
                    {totalLives ? totalLives : 0}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <TouchableOpacity
            style={styles.howitworkbtn}
            onPress={() => {
              AddModalState.current(true);
            }}>
            <Image
              style={{width: 22, height: 22, marginRight: 10}}
              source={require('../../assets/imgs/iconPlay.png')}
            />
            <Text style={styles.howitworkbtext}>How it works</Text>
          </TouchableOpacity>
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
            <View style={styles.sliderbody}>
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
          <View style={styles.shoptextbody}>
            <View style={styles.shopinner}>
              <Text style={styles.shoptext1}>Shop to Win</Text>
              <Text
                style={[
                  styles.shoptext2,
                  {lineHeight: Platform.OS === 'android' ? 20 : 28},
                ]}>
                Shop More Win More
              </Text>
            </View>
            <LongButton
              style={[styles.Margin, {backgroundColor: '#ffffff'}]}
              textstyle={styles.longbtntext}
              text="View all"
              font={16}
              shadowless
              onPress={() => {
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
              </View>
              <LongButton
                style={[
                  styles.Margin,
                  {
                    backgroundColor: '#ffffff',
                    width: width * 0.3,
                    marginBottom: 4,
                  },
                ]}
                textstyle={{
                  color: '#000000',
                  fontFamily: 'Axiforma-SemiBold',
                  fontSize: 14,
                }}
                text="View all"
                font={16}
                shadowless
                onPress={() => {
                  navigation.navigate('Fanjoy');
                }}
              />
            </View>

            <FlatList
              data={Fanjoy_data?.data?.allProducts}
              horizontal={true}
              renderItem={({item}) => (
                <Causes
                  onpress={async () => {
                    await dispatch1(Slug_Details(item?.product_slug));
                    navigation?.navigate('GoldenTulip');
                  }}
                  title={item.title}
                  lives={item.lives}
                  stock={item.stock}
                  u_stock={item.updated_stocks}
                  image={item.image}
                />
              )}
              keyExtractor={item => item}
              ListEmptyComponent={() => (
                <Text
                  style={{
                    color: '#000000',
                    textAlign: 'center',
                  }}>
                  The list is empty
                </Text>
              )}
              contentContainerStyle={{
                paddingVertical: 5,
              }}
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
      <Picknumbers
        PnmodalVisible={PnmodalVisible}
        setPnmodalVisible={setPnmodalVisible}
        Quiz={NavigateToQuiz}
        test={Testnavigate}
        code={home?.gameShow?.code}
        id={home?.gameShow?.id}
      />
    </SafeAreaView>
  );
};

export default index;
