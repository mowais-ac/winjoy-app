import React, {useState, useEffect, useRef} from 'react';
import {
  Platform,
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
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../Components/Header';
import {
  LifeCard,
  LifeCardRefferAndVideo,
  RewardzButton,
  WjBackground,
} from '../../Components';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from 'react-native-i18n';
import axios from 'axios';
import Config from 'react-native-config';
import {RFValue} from 'react-native-responsive-fontsize';
import {FormatNumber, wait, JSONtoForm} from '../../Constants/Functions';
import BuyLifeLineModal from '../../Components/BuyLifeLineModal';
import WatchAddModal from '../../Components/WatchAddModal';
import RefferLifeLineModal from '../../Components/RefferLifeLineModal';
import BuyLifeCongrats from '../../Components/BuyLifeCongrats';
import {getLiveShowPlans} from '../../redux/actions';
import types from '../../redux/types';
import {
  RewardedAd,
  RewardedAdEventType,
  MaxAdContentRating,
} from '@react-native-firebase/admob';
import {firebase} from '@react-native-firebase/admob';
import NoonBuylives from '../../Components/NoonBuylives';
const {width, height} = Dimensions.get('window');

const adUnitId =
  Platform.OS === 'android'
    ? 'ca-app-pub-6197023613008935/9639539887'
    : 'ca-app-pub-6197023613008935/2284244724';
const rewardAd = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});
const index = ({route, navigation}) => {
  const Isfocused = useIsFocused();
  const livePlans = useSelector(state => state.app.livePlans);
  const totalLives = useSelector(state => state.app.totalLives);
  const defaultAppAdmob = firebase.admob();
  const ModalState = useRef();
  const AddModalState = useRef();
  const RefferModalState = useRef();
  const SucessModalState = useRef();
  const [amount, setAmount] = useState();
  const [video, setVideo] = useState();
  const [lives, setLives] = useState();
  const [SmodalVisible, setSmodalVisible] = useState();
  const [orderinfo, setOrderinfo] = useState([]);
  const [idVideoAdd, setIdVideoAdd] = useState();
  const [id, setId] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [video1, setvideo1] = useState(false);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const videofunction = () => {
    dispatch(getLiveShowPlans());
    setvideo1(livePlans.videoEnable);
  };
  const SendOrderId = async () => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      const orderid = await AsyncStorage.getItem('Buylife_noon_orderid');
      console.log('orderid1', orderid);
      const body = JSONtoForm({
        order_id: orderid,
      });
      const result = await fetch(`${Config.API_URL}/order/pay_now_buy_live`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body,
      });
      const json = await result.json();
      console.log('myresp', json);
      await AsyncStorage.removeItem('Buylife_noon_orderid');
      if (json.status === 'success') {
        setOrderinfo(json);
        setSmodalVisible(true);
        console.log('success', json);
      }
      if (json.status === 'error') {
        setOrderinfo(json);
        setSmodalVisible(true);
        console.log('error', json);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {
    dispatch(getLiveShowPlans());
    setvideo1(livePlans.videoEnable);
    defaultAppAdmob
      .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.PG,
        tagForChildDirectedTreatment: true,
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {});

    let orderid = await AsyncStorage.getItem('Buylife_noon_orderid');
    orderid === null ? console.log('id_null') : SendOrderId();
  }, []);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const eventListener = rewardAd.onAdEvent(type => {
      if (type === RewardedAdEventType?.LOADED) {
        console.log('RewardedAd adLoaded');
      } else if (type === RewardedAdEventType?.ERROR) {
        console.warn('RewardedAd => Error');
      } else if (type === RewardedAdEventType?.OPENED) {
        console.log('RewardedAd => adOpened');
      }
    });
    // Start loading the interstitial straight away
    rewardAd.load();
    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getLiveShowPlans());
    setvideo1(livePlans.videoEnable);
    wait(100).then(() => setRefreshing(false));
  }, [video1]);
  const getData = async () => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      const result = await fetch(
        `${Config.API_URL}/buy_lives_plan/${idVideoAdd}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      const json = await result.json();
      if (json.status === 'success') {
        console.log('jsonssss', json);
        rewardAd.show();
        setInterval(() => {
          dispatch2({
            type: types.TOTAL_LIVES,
            totalLives: json?.lives,
          });
        }, 35 * 1000);
        dispatch(getLiveShowPlans());
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <SafeAreaView style={styles.safeStyle}>
      <ScrollView
        style={{backgroundColor: '#f6f1f3'}}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f8d7e8', '#c7dfe8']}
          style={{paddingBottom: 15, flex: 1}}>
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
            <View style={{alignItems: 'center', marginVertical: 20}}>
              <Text style={[styles.headerText]}>Lives</Text>
              <Text style={styles.subHeaderText}>
                Stay in the game even with the wrong answer!
              </Text>
            </View>
          </LinearGradient>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: height * 0.055,
            }}>
            <Text style={styles.text}>Lives Are Available to Use</Text>
            <ImageBackground
              resizeMode="contain"
              style={{
                width: 120,
                height: 100,
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../../assets/imgs/life.png')}>
              <Text
                style={{
                  color: '#E7003F',
                  fontFamily: 'Axiforma-SemiBold',
                  fontSize: RFValue(20),
                }}>
                {totalLives === null ? 0 : totalLives}
              </Text>
            </ImageBackground>
            <Text
              style={[
                styles.text,
                {color: '#420E92', marginTop: height * 0.035},
              ]}>
              Buy Lives
            </Text>
            <FlatList
              horizontal={true}
              contentContainerStyle={{marginTop: 20, marginLeft: 9}}
              ItemSeparatorComponent={() => <View style={{width: 10}} />}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={livePlans.plan}
              renderItem={({item}) =>
                item?.type === 'buy' ? (
                  <LifeCard
                    onPress={() => {
                      ModalState.current(true);
                      //navigation.navigate('Webmodal', {
                      // uri: 'https://www.google.com.pk',
                      //});
                      setAmount(item?.amount);
                      setLives(item?.lives);
                      setIdVideoAdd(item?.id);
                    }}
                    id={item?.id}
                    amount={item?.amount}
                    lives={item?.lives}
                  />
                ) : null
              }
              keyExtractor={item => item.id}
            />
            <Text
              style={[
                styles.text,
                {
                  color: '#420E92',
                  fontFamily: 'Axiforma-Bold',
                  marginTop: height * 0.035,
                },
              ]}>
              OR
            </Text>
            <Text
              style={[
                styles.text,
                {color: '#420E92', marginTop: height * 0.035},
              ]}>
              Earn Lives
            </Text>
            <View
              style={{
                marginTop: height * 0.03,
                width: '94%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <FlatList
                horizontal={true}
                // contentContainerStyle={{ marginLeft:1}}
                ItemSeparatorComponent={() => <View style={{width: 5}} />}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                data={livePlans.plan}
                renderItem={({item, index}) =>
                  item?.type === 'video' ? (
                    <LifeCardRefferAndVideo
                      imagePath={require('../../assets/imgs/videoIcon.png')}
                      heading={'Watch a video'}
                      description={`Earn ${item.lives} life line`}
                      onPress={() => {
                        videofunction();
                        setIdVideoAdd(item.id);
                        setVideo(item.video_url);
                        if (video1) {
                          if (rewardAd.loaded) {
                            getData().catch(error =>
                              console.log('admob_error', error),
                            );
                          } else {
                            alert('ad not ready yet, please wait');
                          }
                        } else {
                          alert(
                            'Sorry, you can watch video ad only once in a day. Please try after 24 hours.',
                          );
                        }
                      }}
                    />
                  ) : index === 1 ? (
                    <LifeCardRefferAndVideo
                      imagePath={require('../../assets/imgs/letterIcon.png')}
                      heading={'Refer Friends'}
                      description={'Earn upto 10 lives'}
                      onPress={() => {
                        RefferModalState.current(true);
                      }}
                    />
                  ) : null
                }
                keyExtractor={item => item.id}
              />
            </View>
          </View>
          <BuyLifeLineModal
            ModalRef={ModalState}
            details
            amount={amount}
            lives={lives}
            id={idVideoAdd}
            // onPressContinue={()=>alert("hii")}
          />
          <WatchAddModal
            ModalRef={AddModalState}
            details
            ad={() => {
              //   showRewardAd();
            }}
            video={video}
            id={idVideoAdd}
            refreshVideo={() => {
              setvideo1(livePlans.videoEnable);
            }}
          />
          <RefferLifeLineModal
            ModalRef={RefferModalState}
            details
            onPressContinue={() => {
              RefferModalState.current(false);
              SucessModalState.current(true);
            }}
          />
          <BuyLifeCongrats
            ModalRef={SucessModalState}
            heading={'Congratulations'}
            description={
              'lives are ready to use. Feel free to play more games & win amazing prizes.'
            }
            requestOnPress={() => SucessModalState.current(false)}
            closeOnPress={() => SucessModalState.current(false)}
          />
          <NoonBuylives
            SmodalVisible={SmodalVisible}
            setSmodalVisible={setSmodalVisible}
            Data={orderinfo}
          />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
export default index;
