import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Text,
  FlatList,
  ImageBackground,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import Label from '../../Components/Label';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import TriviaJoyBottomList from '../../Components/TriviaJoyBottomList';
import {
  heightConverter,
  heightPercentageToDP,
  widthConverter,
} from '../../Components/Helpers/Responsive';
import {useIsFocused} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import axios from 'axios';
import dayjs from 'dayjs';
import socketIO from 'socket.io-client';
import Header from '../../Components/Header';
import {
  TriviaJoyAPI,
  CheckGameEnterStatus,
  getLandingScreen,
} from '../../redux/actions';
import Picknumbers from '../../Components/Livescomponents/Picknumbers';
import CountDown from 'react-native-countdown-component';
import {RFValue} from 'react-native-responsive-fontsize';
import HowItWorkModal from '../../Components/HowItWorkModal';
import {wait} from '../../Constants/Functions';
const MYServer = 'https://node-winjoyserver-deploy.herokuapp.com/';
const index = ({props, navigation}) => {
  const LandingData = useSelector(state => state.app.LandingData);
  const userData = useSelector(state => state.app.userData);
  const triviaJoyData = useSelector(state => state.app.triviaJoyData);
  const gameEnterStatus = useSelector(state => state.app.gameEnterStatus);
  const totalLives = useSelector(state => state.app.totalLives);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const dispatch4 = useDispatch();
  const AddModalState = useRef();
  const socket = socketIO(MYServer);
  const [renderBtn, setRenderBtn] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [PnmodalVisible, setPnmodalVisible] = useState(false);
  const onCountDownFinish = () => {
    setRenderBtn(true);
    onRefresh();
  };
  const [time, setTime] = useState(() => {
    /*  dispatch(TriviaJoyAPI()); */
    var CurrentDate = new Date();
    var duration = dayjs(triviaJoyData?.upcoming_gameshow?.start_date).diff(
      dayjs(CurrentDate.toLocaleString()),
      'seconds',
    );
    return parseInt(duration);
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch4(getLandingScreen());
    dispatch(TriviaJoyAPI());
    var CurrentDate = new Date();
    var duration = dayjs(triviaJoyData?.upcoming_gameshow?.start_date).diff(
      dayjs(CurrentDate.toLocaleString()),
      'seconds',
    );
    console.log('duration', triviaJoyData?.upcoming_gameshow?.start_date);
    setTime(parseInt(duration));
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (isFocused) {
      dispatch4(getLandingScreen());
      dispatch(TriviaJoyAPI());
      var CurrentDate = new Date();
      var duration = dayjs(triviaJoyData?.upcoming_gameshow?.start_date).diff(
        dayjs(CurrentDate.toLocaleString()),
        'seconds',
      );
      setTime(parseInt(duration));
    }
  }, [isFocused]);

  const LetBegin = () => {
    dispatch2(CheckGameEnterStatus());
    if (gameEnterStatus.status === 'success') {
      if (gameEnterStatus.message === 'Welcome to Live Game Show') {
        navigation.navigate('GameStack', {
          screen: 'Quiz',
          params: {
            streamUrl: LandingData.streamUrl,
            uri: LandingData?.gameShow?.live_stream?.key,
            gameshow: LandingData?.gameShow,
            completed_questions: LandingData?.gameShow?.completed_questions,
          },
        });
      } else {
        alert('Something went wrong');
      }
    } else {
      console.log('Unable to fetch!');
    }
  };

  return (
    <ScrollView
      style={{backgroundColor: '#ffffff'}}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#f8d7e8', '#c7dfe8']}>
        <Header
          style={{
            top: Platform.OS === 'android' ? 5 : height * 0.028,
            position: 'absolute',
            zIndex: 1000,
            left: 0,
          }}
        />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#420E92', '#E7003F']}
          style={styles.mainView}>
          <Text
            style={[
              styles.heading,
              {
                marginHorizontal: 50,
              },
            ]}>
            Play daily at 8 PM and <Text style={{color: '#D9FE51'}}>WIN</Text>{' '}
            cash prizes
          </Text>

          <Label
            primary
            font={16}
            bold
            dark
            style={{color: '#ffff', lineHeight: 25, marginVertical: 5}}>
            Answer 10 simple questions and WIN amazing prizes
          </Label>

          {triviaJoyData?.on_going_gameshow !== null ? (
            <TouchableOpacity
              onPress={() =>
                LandingData?.gameShow?.type === 'in_venue'
                  ? setPnmodalVisible(true)
                  : LetBegin()
              }>
              <View
                style={[
                  styles.newGameView,
                  {
                    height: height * 0.12,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    alignItems: 'center',
                  },
                ]}>
                <Label
                  primary
                  font={14}
                  style={{
                    color: '#E61C54',
                    width: width * 0.6,
                    lineHeight: 30,
                  }}>
                  We are live now{'\n'}
                  <Label
                    primary
                    font={18}
                    bold
                    style={{color: '#420E92', width: width * 0.6}}>
                    Join Gameshow fast!
                  </Label>
                </Label>
              </View>
            </TouchableOpacity>
          ) : (
            <LinearGradient
              colors={['#C3EE27', '#FEAE51']}
              style={styles.newGameView}>
              <Label
                primary
                font={RFValue(14)}
                bold
                dark
                style={{color: '#420E92'}}>
                Next Game
              </Label>
              <CountDown
                style={{marginTop: 6}}
                size={16}
                until={time}
                onFinish={() => {
                  onCountDownFinish();
                }}
                digitStyle={{
                  borderColor: '#ffffff',
                  borderWidth: 1,
                  backgroundColor: '#ffffff',
                  width: 50,
                  height: 50,
                  borderRadius: 40,
                  marginLeft: 10,
                  marginRight: 10,
                }}
                digitTxtStyle={{
                  color: '#000000',
                  fontSize: 18,
                  fontFamily: 'Axiforma-Medium',
                }}
                timeLabelStyle={{
                  color: '#000000',
                  fontFamily: 'Axiforma-Regular',
                }}
                timeToShow={['D', 'H', 'M', 'S']}
                timeLabels={{d: 'days', h: 'hours', m: 'minutes', s: 'seconds'}}
              />
            </LinearGradient>
          )}
          <TouchableOpacity
            onPress={() => {
              AddModalState.current(true);
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: height * 0.03,
                marginVertical: 10,
              }}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../assets/imgs/circlePlaybtn.png')}
              />
              <Label
                primary
                font={RFValue(14)}
                bold
                dark
                style={{color: '#ffff', width: width * 0.4}}>
                How to play
              </Label>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.viewLifeDetails}>
          <View
            style={{
              width: width,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View style={{width: width * 0.6}}>
              <Label
                notAlign
                primary
                font={13}
                bold
                style={{color: '#E61C54', width: width * 0.4}}>
                Buy/Earn Lives
              </Label>
              <Text style={{color: '#000000'}}>
                Stay in the game even after answering a question incorrectly
              </Text>
            </View>
            <ImageBackground
              resizeMode="contain"
              style={{
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 3,
                width: 100,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../../assets/imgs/pinkHeart.png')}>
              <Text
                style={{
                  color: '#E7003F',
                  fontFamily: 'Axiforma-SemiBold',
                  fontSize: RFValue(20),
                }}>
                {totalLives ? totalLives : 0}
              </Text>
            </ImageBackground>
          </View>
          <View
            style={{
              width: width,
              height: 1,
              backgroundColor: '#ffffff',
              marginTop: height * 0.02,
            }}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MenuStack', {
                screen: 'BuyLife',
              })
            }
            style={{paddingVertical: 14}}>
            <Label primary font={13} bold style={{color: '#E61C54'}}>
              View details
            </Label>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 10}}>
          {triviaJoyData?.banners ? (
            <TriviaJoyBottomList data={triviaJoyData.banners} />
          ) : null}
        </View>

        <View style={{marginBottom: height * 0.05}} />
      </LinearGradient>
      <Picknumbers
        PnmodalVisible={PnmodalVisible}
        setPnmodalVisible={setPnmodalVisible}
        Quiz={LetBegin}
        code={LandingData?.gameShow?.code}
        id={LandingData?.gameShow?.id}
      />
      <HowItWorkModal
        ModalRef={AddModalState}
        details
        cross={true}
        video={
          'https://winjoy-assets.s3.amazonaws.com/how_it_work/m-triviajoy(1).mp4'
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: 'auto',
    width: width,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignItems: 'center',
    paddingVertical: 25,
  },
  newGameView: {
    marginTop: 10,
    width: width * 0.93,
    height: height * 0.15,
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnView: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    width: width - 200,
    height: heightConverter(60),
    justifyContent: 'center',
    borderRadius: 30,
  },
  heading: {
    color: '#ffff',
    fontFamily: 'Axiforma-Bold',
    fontSize: 20,
    //width: widthConverter(210),
    textAlign: 'center',
    lineHeight: 27,
    marginTop: 65,
  },
  viewLifeDetails: {
    backgroundColor: '#F6EEF1',

    paddingTop: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default index;
