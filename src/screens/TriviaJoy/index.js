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
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import axios from 'axios';
import dayjs from 'dayjs';
import socketIO from 'socket.io-client';
import Header from '../../Components/Header';
import {TriviaJoyAPI, CheckGameEnterStatus} from '../../redux/actions';
import CountDown from 'react-native-countdown-component';
import {RFValue} from 'react-native-responsive-fontsize';
import HowItWorkModal from '../../Components/HowItWorkModal';
import {wait} from '../../Constants/Functions';
const MYServer = 'https://node-winjoyserver-deploy.herokuapp.com/';
const index = ({props, navigation}) => {
  const userData = useSelector(state => state.app.userData);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const AddModalState = useRef();
  const triviaJoyData = useSelector(state => state.app.triviaJoyData);
  const gameEnterStatus = useSelector(state => state.app.gameEnterStatus);
  const totalLives = useSelector(state => state.app.totalLives);
  const socket = socketIO(MYServer);
  const [refreshing, setRefreshing] = useState(false);
  const [time, setTime] = useState(() => {
    dispatch(TriviaJoyAPI());
    var CurrentDate = new Date().toLocaleString();
    var duration = dayjs(triviaJoyData?.upcoming_gameshow?.start_date).diff(
      dayjs(CurrentDate),
      'seconds',
    );
    return duration;
  });
  const [renderBtn, setRenderBtn] = useState(false);
  const onRefresh = useCallback(() => {
    // setBanners(null);
    setRefreshing(true);
    dispatch(TriviaJoyAPI());
    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    socket.on('sendStartlivegameshow', msg => {
      dispatch(TriviaJoyAPI());
    });
  }, []);

  const LetBegin = () => {
    dispatch2(CheckGameEnterStatus());

    if (gameEnterStatus.status === 'success') {
      if (gameEnterStatus.message === 'Welcome to Live Game Show') {
        navigation.navigate('GameStack', {
          screen: 'Quiz',
          params: {
            uri: triviaJoyData?.on_going_gameshow?.live_stream?.key,
          },
        });
      } else {
        alert('game not started yet!');
      }
    } else {
      alert('game not started yet!');
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
        <Header style={{top: 5, position: 'absolute', zIndex: 1000, left: 0}} />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#420E92', '#E7003F']}
          style={styles.mainView}>
          <Text
            style={[
              styles.heading,
              {width: width * 0.8, marginTop: height * 0.08},
            ]}>
            Daily Challenge &<Text style={{color: '#D9FE51'}}>WIN</Text>
          </Text>
          <Label
            primary
            font={16}
            bold
            dark
            style={{color: '#ffff', lineHeight: 27}}>
            Answer 10 simple questions and WIN amazing prizes
          </Label>

          {triviaJoyData?.on_going_gameshow !== null ? (
            <TouchableOpacity onPress={() => LetBegin()}>
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
                onFinish={() => setRenderBtn(true)}
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
                //separatorStyle={{paddingLeft: 5, paddingRight: 5, }}

                timeToShow={['D', 'H', 'M', 'S']}
                timeLabels={{d: 'days', h: 'hours', m: 'minutes', s: 'seconds'}}
                //showSeparator
              />
            </LinearGradient>
          )}
          <TouchableOpacity
            onPress={() => {
              AddModalState.current(true);
            }}>
            <View style={{flexDirection: 'row', marginTop: height * 0.03}}>
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
                How it works
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
                Stay in the game even after the wrong answer
              </Text>
            </View>
            <ImageBackground
              resizeMode="cover"
              style={{
                width: 100,
                height: 80,
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
              View Detail
            </Label>
          </TouchableOpacity>
        </View>
        {triviaJoyData?.banners ? (
          <TriviaJoyBottomList data={triviaJoyData.banners} />
        ) : null}

        <View style={{marginBottom: height * 0.05}} />
      </LinearGradient>
      <HowItWorkModal
        ModalRef={AddModalState}
        details
        cross={true}
        video={
          'https://winjoy-assets.s3.amazonaws.com/how_it_work/m-triviajoy(1).mp4'
        }
        // id={idVideoAdd}
        // onPressContinue={onPressContinue}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: height * 0.5,
    width: width,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignItems: 'center',
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
    fontSize: 30,
    width: widthConverter(210),
    textAlign: 'center',
    lineHeight: heightConverter(40),
    marginTop: heightConverter(30),
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
