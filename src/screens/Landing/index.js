import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  Animated,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  Platform,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {FormatNumber, wait} from '../../Constants/Functions';
import LoaderImage from '../../Components/LoaderImage';
import Label from '../../Components/Label';
import {Colors} from '../../Constants/Index';
import {useFocusEffect} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import {SliderBox} from 'react-native-image-slider-box';
const {width, height} = Dimensions.get('window');
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import HomeBottomList from '../../Components/HomeBottomList';
import SafeArea from '../../Components/SafeArea';

import {
  heightConverter,
  heightPercentageToDP,
  widthConverter,
} from '../../Components/Helpers/Responsive';
import BackgroundRound from '../../Components/BackgroundRound';
import Header from '../../Components/Header';

import AvatarBtn from '../../Components/AvatarBtn';
import {RFValue} from 'react-native-responsive-fontsize';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';
import {
  HomeCard,
  LuckyDrawCard,
  TriviaAvatar,
  ProductViewCard,
  TriviaNightCard,
  ButtonWithRightIcon,
  TrendingCards,
} from '../../Components';
import dayjs from 'dayjs';
import LongButton from '../../Components/LongButton';
import {FanJoyCard, WjBackground, ClosingSoonCard} from '../../Components';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';
import {
  getLandingScreen,
  CheckGameEnterStatus,
  TriviaJoyAPI,
} from '../../redux/actions';
import socketIO from 'socket.io-client';
import {useTranslation} from 'react-i18next';
import HowItWorkModal from '../../Components/HowItWorkModal';
import types from '../../redux/types';
const MYServer = 'https://node-winjoyserver-deploy.herokuapp.com/';

const index = props => {
  const {t, i18n} = useTranslation();
  // const scrollY = new Animated.Value(0)
  // const diffClamp = Animated.diffClamp(scrollY, 0, 45)
  // const translateY = diffClamp.interpolate({
  //   inputRange: [0, 45],
  //   outputRange: [0, -45]
  // })

  const [headerValue, setHeaderValue] = useState(0);
  const {Coins, navigation} = props;
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [winnerData, setWinnerData] = useState([]);
  const [imgActive, setImgActive] = useState(0);
  const [homeData, setHomeData] = useState([]);
  const [time, setTime] = useState('');
  const [activeSlide, setActiveSlide] = useState();
  const userData = useSelector(state => state.app.userData);
  const LandingData = useSelector(state => state.app.LandingData);
  const gameEnterStatus = useSelector(state => state.app.gameEnterStatus);
  const totalLives = useSelector(state => state.app.totalLives);
  const [buffer, setBuffer] = useState(false);
  const [videoAction, setVideoAction] = useState(true);
  const [imgSlider, setImageSlider] = useState([]);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const dispatch3 = useDispatch();
  const dispatch4 = useDispatch();
  const socket = socketIO(MYServer);
  const AddModalState = useRef();
  const onRefresh = React.useCallback(() => {
    // setBanners(null);
    setRefreshing(true);
    dispatch(getLandingScreen());
    var CurrentDate = new Date().toLocaleString();
    var duration = dayjs(LandingData?.gameShow?.start_date).diff(
      dayjs(CurrentDate),
      'seconds',
    );
    setTime(duration);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
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
    console.log('LandingData', LandingData);
    let arr = [];
    LandingData?.host_sliders_data.map(ele => {
      console.log('ele', ele.url);
      arr.push(ele.url);
    });
    setImageSlider(arr);
  }, []);

  const LetBegin = () => {
    dispatch2(CheckGameEnterStatus());
    // console.log("gameEnterStatus",gameEnterStatus);
    // navigation.navigate("GameStack", {
    //   screen: "Quiz",
    //   params: {
    //     uri: LandingData?.gameShow?.live_stream?.key
    //   }
    // })
    if (gameEnterStatus.status === 'success') {
      if (gameEnterStatus.message === 'Welcome to Live Game Show') {
        navigation.navigate('GameStack', {
          screen: 'Quiz',
          params: {
            uri: LandingData?.gameShow?.live_stream?.key,
          },
        });
      } else {
        alert('game not started yet!');
      }
    } else {
      alert('game not started yet!');
    }
  };
  const onPressCreator = id => {
    // alert(id)
    dispatch3({
      type: types.CREATOR_ID,
      creatorId: id,
      //  user: res.data.data,
    });
    navigation.navigate('CreatorsPage');
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
              source={{uri: item.url}} // Can be a URL or a local file.
              // ref={(ref) => { this.player = ref }}  // Store reference
              resizeMode={'cover'}
              paused={index !== activeSlide}
              //  onError={this.onVideoError}
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
        {/* <Animated.View
        style={{
          transform: [
            { translateY: translateY }
          ],
          elevation: 4,
          zIndex: 100,
        }}
      > */}
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
        {/* </Animated.View> */}
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
                    // ref={ref => this.carousel = ref}
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
                {/* <View style={{ borderWidth: 2, borderColor: "#fff", borderRadius: 45, }}>
                  <AvatarBtn
                    picture={userData?.profile_image}
                    // id={userInfo?.id}
                      name={(userData?.first_name?.slice(0, 1))?.toUpperCase()}
                    size={50}
                    font={28}
                  />
                </View> */}

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

                {/* <TouchableOpacity onPress={() => navigation.navigate("WALLET")}>
                <Entypo name="chevron-thin-right" size={22} color="#fff" style={{ marginTop: 6.5, marginRight: 6 }} />
              </TouchableOpacity> */}
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
                  paddingHorizontal: 30,
                  backgroundColor: '#fff',
                  marginBottom: 10,
                }}
                onPress={() => {
                  AddModalState.current(true);
                }}>
                {/* <Image
                    style={{ width: 22, height: 22 }}
                    source={require('../../assets/imgs/circlePlaybtn.png')}
                  /> */}
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
                // <TouchableOpacity
                //   onPress={() =>
                //    // navigation.navigate("SimpeStackScreen", { screen: "ProductDetail", params: item })
                //    alert("hii")
                //   }
                // >
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
                // </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
            />
            {/* <ScrollView
              horizontal
              style={{flex: 1, marginTop: 8, flexDirection: 'row'}}>
              {LandingData?.host_sliders_data ? (
                <>
                  {LandingData?.host_sliders_data.map(hostSlider => {
                    return (
                      <View
                        style={{
                          width: width - 10,
                          paddingLeft: 14,
                          flexDirection: 'column',
                        }}>
                        <Image
                          source={{uri: hostSlider.url}}
                          resizeMode="stretch"
                          style={{
                            overflow: 'hidden',
                            width: '100%',
                            height: 150,
                            borderRadius: 10,
                          }}
                        />
                      </View>
                    );
                  })}
                </>
              ) : null}
            </ScrollView> */}
            <View
              style={{
                flex: 1,
                marginTop: 8,
                flexDirection: 'row',
              }}>
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
            </View>
            <View
              style={{justifyContent: 'center', alignItems: 'center'}}></View>
            {LandingData?.home_middle_banners_data ? (
              <HomeCard
                //onPress={() => navigation.navigate("GameStack")}
                onPress={() => LetBegin()}
                images={LandingData?.home_middle_banners_data}
                //style={{ marginTop: 10, }}
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
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PRODUCTS', {
                      screen: 'ProductDetail',
                      params: {data: item},
                    })
                  }>
                  <ClosingSoonCard
                    props={props}
                    index={item.index}
                    item={item}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
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
                  style={[styles.Margin, {backgroundColor: '#ffffff'}]}
                  textstyle={{
                    color: '#000000',
                    fontFamily: 'Axiforma-SemiBold',
                    fontSize: 14,
                  }}
                  text="View all Stars"
                  font={16}
                  shadowless
                  onPress={() => navigation.navigate('AllCreatorsList')}
                />
              </View>

              <FlatList
                data={LandingData?.funJoy}
                horizontal={true}
                //   style={{ paddingLeft: 12 }}
                renderItem={({item}) => (
                  <FanJoyCard
                    onPress={() => {
                      onPressCreator(item?.id);
                    }}
                    name={item?.user_name}
                    imageUrl={item?.image}
                    fans={item.fans}
                  />
                )}
                //keyExtractor={(e) => e.id.toString()}
                contentContainerStyle={{
                  marginTop: 10,
                }}
                // refreshControl={
                //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                // }
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
              'https://winjoy-assets.s3.amazonaws.com/banners/banner-3.mp4'
            }
            cross={true}
            // id={idVideoAdd}
            // onPressContinue={onPressContinue}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default index;
