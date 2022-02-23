import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../Components/Header';
import {
  GameShowWinnersCard,
  LifeCard,
  LifeCardRefferAndVideo,
  TopTab,
  WjBackground,
} from '../../Components';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
import I18n from 'react-native-i18n';
import axios from 'axios';
import {RFValue} from 'react-native-responsive-fontsize';
import BuyLifeLineModal from '../../Components/BuyLifeLineModal';
import WatchAddModal from '../../Components/WatchAddModal';
import RefferLifeLineModal from '../../Components/RefferLifeLineModal';
import BuyLifeCongrats from '../../Components/BuyLifeCongrats';
import {LeaderBoardWinners} from '../../redux/actions';
import ProfilePicture from '../../Components/ProfilePicture';
import {FormatNumber, wait} from '../../Constants/Functions';
let redStar = require('../../assets/imgs/redStar.png');
let crown = require('../../assets/imgs/crown.png');
const {width, height} = Dimensions.get('window');
const index = ({route, navigation}) => {
  const leaderBoardWinners = useSelector(state => state.app.leaderBoardWinners);
  const loading = useSelector(state => state.app.loading);
  const ModalState = useRef();
  const AddModalState = useRef();
  const RefferModalState = useRef();
  const SucessModalState = useRef();
  const [headerValue, setHeaderValue] = useState(0);
  const [amount, setAmount] = useState();
  const [video, setVideo] = useState();
  const [lives, setLives] = useState();
  const [idVideoAdd, setIdVideoAdd] = useState();
  const [id, setId] = useState();
  const [selected, setSelected] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LeaderBoardWinners());
  }, []);

  const onPressFirst = () => {
    setSelected(0);
  };
  const onPressSecond = () => {
    setSelected(1);
  };
  const onRefresh = React.useCallback(() => {
    dispatch(LeaderBoardWinners());
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <SafeAreaView style={styles.safeStyle}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#f8d7e8', '#c7dfe8']}
        style={{paddingBottom: 10, flex: 1}}>
        <Header
          style={{
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
            width: '100%',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
        <ScrollView
          onScroll={e => {
            setHeaderValue(e.nativeEvent.contentOffset.y);
          }}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }>
          <WjBackground
            style={{
              height: height * 0.4,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          />
          <View
            style={{
              marginTop: height * 0.07,
              height: height * 0.15,
              alignItems: 'center',
            }}>
            <Text style={[styles.headerText, {marginBottom: height * 0.01}]}>
              LeaderBoard
            </Text>

            <View style={{width: width, height: height * 0.28}}>
              {loading ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <FlatList
                  horizontal={true}
                  style={{marginLeft: 1, width: width}}
                  data={leaderBoardWinners?.leaders?.slice(0, 3)}
                  ItemSeparatorComponent={() => <View style={{width: 16}} />}
                  scrollEnabled={false}
                  contentContainerStyle={{
                    width: width,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <View
                      style={
                        index === 1
                          ? styles.avatarView
                          : styles.leftRightavatarView
                      }>
                      <ProfilePicture
                        // picture={item?.profile_image}
                        // id={userInfo?.id || userData?.id}
                        name={
                          item?.first_name?.charAt(0)?.toUpperCase() +
                          item?.last_name?.charAt(0)?.toUpperCase()
                        }
                        style={
                          index === 1
                            ? styles.avatarView
                            : styles.leftRightavatarView
                        }
                      />

                      <View
                        style={{
                          position: 'absolute',
                          width: width * 0.3,
                          height: width * 0.3,
                          top: -10,
                          left: 1,
                        }}>
                        <Image
                          source={index === 1 ? crown : redStar}
                          style={
                            index === 1
                              ? styles.topListIcon2
                              : styles.topListIcon
                          }
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.25,
                          alignItems: 'center',
                          marginTop: height * 0.01,
                        }}>
                        <Text
                          style={{
                            fontSize: RFValue(9),
                            color: '#ffffff',
                            fontFamily: 'Axiforma-SemiBold',
                          }}>
                          @{item?.user_name}
                        </Text>
                        <Text
                          style={{
                            fontSize: RFValue(12),
                            color: '#FFFF00',
                            fontFamily: 'Axiforma-Bold',
                          }}>
                          AED {FormatNumber(item?.trivia_total_prize)}
                        </Text>
                      </View>
                    </View>
                  )}
                  //   keyExtractor={(item) => item.id}
                />
              )}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: height * 0.19,
            }}>
            {loading ? (
              <ActivityIndicator size="large" color="#E7003F" />
            ) : (
              <FlatList
                data={leaderBoardWinners?.leaders?.slice(3)}
                // horizontal={true}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      height: 1,
                      width: width,
                    }}
                  />
                )}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                    // onPress={() => alert("test")}
                    >
                      <View
                        style={[
                          styles.mainView,
                          {marginLeft: width * 0.05, paddingVertical: 10},
                        ]}>
                        <View style={styles.avatarViewSecondList}>
                          <ProfilePicture
                            picture={item?.profile_image}
                            // id={userInfo?.id || userData?.id}
                            name={item?.first_name?.charAt(0)?.toUpperCase()}
                            style={styles.avatarViewSecondList}
                          />
                          <View
                            style={{
                              position: 'absolute',
                              width: width * 0.14,
                              height: width * 0.14,
                              top: height * 0.012,
                              left: -3,
                            }}>
                            <Image
                              source={require('../../assets/imgs/redStar.png')}
                              style={{width: 15, height: 15}}
                            />
                          </View>
                        </View>

                        <View
                          style={{
                            width: width * 0.36,
                            height: height * 0.08,
                            justifyContent: 'center',
                          }}>
                          <Text style={styles.text}>@{item.user_name}</Text>
                          <Text style={styles.text2}>
                            {item?.first_name?.charAt(0)?.toUpperCase() +
                              item?.first_name?.slice(1) +
                              ' ' +
                              item?.last_name?.charAt(0)?.toUpperCase() +
                              item?.last_name?.slice(1)}
                          </Text>
                        </View>

                        <Text
                          style={[
                            styles.text2,
                            {width: width * 0.25, color: '#E7003F'},
                          ]}>
                          AED {item?.trivia_total_prize.toLocaleString()}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}

            {/* {selected === 0 ? (
              <GameShow
                lastWinners={gameShowWinners?.winners}
                pastWinners={gameShowWinners?.pastWinners}
              />
            ) : (
              <LuckyDraw
                winnersLastGame={luckyDrawWinners.winners}
              />

            )} */}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default index;
