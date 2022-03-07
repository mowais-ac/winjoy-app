import React, {useState, useRef, useEffect} from 'react';
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
} from 'react-native';
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
const MYServer = 'https://node-winjoyserver-deploy.herokuapp.com/';

const index = props => {
  const {t, i18n} = useTranslation();
  const ModelVersioncheck = useRef();
  const [headerValue, setHeaderValue] = useState(0);
  const {navigation} = props;
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
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const dispatch3 = useDispatch();
  const dispatch4 = useDispatch();
  const dispatch5 = useDispatch();
  const dispatch6 = useDispatch();
  const socket = socketIO(MYServer);
  const AddModalState = useRef();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getLandingScreen());
    var CurrentDate = new Date().toLocaleString();
    var duration = dayjs(LandingData?.gameShow?.start_date).diff(
      dayjs(CurrentDate),
      'seconds',
    );
    setTime(duration);
    NavigateToQuiz();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    dispatch5(AllCreatorsList());
    socket.on('sendStartlivegameshow', msg => {
      dispatch(getLandingScreen());
    });

    dispatch(getLandingScreen());
    var CurrentDate = new Date().toLocaleString();
    var duration = dayjs(LandingData?.upcoming_gameshow?.start_date).diff(
      dayjs(CurrentDate),
      'seconds',
    );
    setTime(duration);

    let arr = [];
    LandingData?.host_sliders_data?.map(ele => {
      arr.push(ele.url);
    });
    setImageSlider(arr);
    NavigateToQuiz();
  }, []);
  const NavigateToQuiz = () => {
    if (LandingData?.gameShow?.status === 'on_boarding') {
      navigation.navigate('GameStack', {
        screen: 'Quiz',
        params: {
          uri: LandingData?.gameShow?.live_stream?.key,
        },
      });
    }
  };

  const LetBegin = () => {
    dispatch2(CheckGameEnterStatus());

    if (gameEnterStatus.status === 'success') {
      NavigateToQuiz();
    } else {
      alert('game not started yet!');
    }
  };
  /*   const onPressCreator = id => {
    // alert(id)
    dispatch3({
      type: types.CREATOR_ID,
      creatorId: id,
      //  user: res.data.data,
    });
    navigation.navigate('CreatorsPage');
  }; */
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
  return (
    <SafeAreaView>
      <View>
        <Header
          style={{
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
            width: '100%',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            top: Platform.OS === 'android' ? 0 : height * 0.038,
          }}
        />
        {LandingData && LandingData.updated_version ? (
          <NewVersionmodal
            updatedVersion={LandingData?.updated_version}
            currentV={packageJson.version}
            ModalRef={ModelVersioncheck}
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
                  <Carousel
                    layout={'default'}
                    resizeMode={'cover'}
                    loop={videoAction}
                    autoplay={videoAction}
                    autoplayInterval={3000}
                    data={LandingData?.banners}
                    sliderWidth={width}
                    itemWidth={width}
                    renderItem={_renderItem}
                    style={styles.ShoppingBanner}
                    onSnapToItem={index => setActiveSlide(index)}
                  />
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
                      Your balance:{' '}
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
                        {userData?.balance
                          ? FormatNumber(+userData?.balance)
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
                    resizeMode="center"
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
                <ActivityIndicator size="large" color="#000000" />
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
              style={{justifyContent: 'center', alignItems: 'center'}}></View>
            {LandingData?.home_middle_banners_data ? (
              <HomeCard
                onPress={() => LetBegin()}
                images={LandingData?.home_middle_banners_data}
                time={time}
                gameShow={LandingData?.gameShow}
                upcoming_gameshow={LandingData?.upcoming_gameshow}
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
                onPress={() =>
                  navigation.navigate('PRODUCTS', {
                    screen: 'PrizeList',
                  })
                }
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
                    dispatch6(ProductDetails(item?.product?.id));
                    navigation.navigate('PRODUCTS', {
                      screen: 'ProductDetail',
                      params: {productId: item?.product?.id},
                    });
                  }}
                  props={props}
                  index={item.index}
                  item={item}
                />
              )}
              keyExtractor={item => item.id}
            />
            <View style={{paddingVertical: 12}}>
              <View style={styles.avatarBannerView}>
                {LandingData?.leaderboard_home_data ? (
                  <Image
                    style={[
                      styles.avatarBannerView,
                      {position: 'absolute', overlayColor: '#f6f1f3'},
                    ]}
                    source={{uri: LandingData?.leaderboard_home_data[0]?.url}}
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
                    navigation.navigate('MenuStack', {screen: 'LeaderBoard'})
                  }
                />
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
                    FANJOY
                  </Text>
                  <Text
                    style={{
                      color: '#0B2142',
                      fontSize: 16,
                      fontFamily: 'Axiforma-Regular',
                    }}>
                    Products By Creators
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
                  text="View all Creators"
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
              'https://winjoy-assets.s3.amazonaws.com/how_it_work/Mostafa_wj-intro.mp4'
            }
            cross={true}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default index;
