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
  ImageBackground,
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
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
import I18n from 'react-native-i18n';
import axios from 'axios';
import {RFValue} from 'react-native-responsive-fontsize';
import BuyLifeLineModal from '../../Components/BuyLifeLineModal';
import WatchAddModal from '../../Components/WatchAddModal';
import RefferLifeLineModal from '../../Components/RefferLifeLineModal';
import BuyLifeCongrats from '../../Components/BuyLifeCongrats';
import {getLiveShowPlans} from '../../redux/actions';
const {width, height} = Dimensions.get('window');
const index = ({route, navigation}) => {
  const livePlans = useSelector(state => state.app.livePlans);
  const totalLives = useSelector(state => state.app.totalLives);

  const ModalState = useRef();
  const AddModalState = useRef();
  const RefferModalState = useRef();
  const SucessModalState = useRef();
  const [amount, setAmount] = useState();
  const [video, setVideo] = useState();
  const [lives, setLives] = useState();
  const [idVideoAdd, setIdVideoAdd] = useState();
  const [id, setId] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('totalLives', totalLives);
    dispatch(getLiveShowPlans());
  }, []);

  return (
    <SafeAreaView style={styles.safeStyle}>
      <ScrollView>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f8d7e8', '#c7dfe8']}
          style={{paddingBottom: 10}}>
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
              resizeMode="cover"
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
                      setAmount(item?.amount);
                      setLives(item?.lives);
                      setId(item?.id);
                    }}
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
              {/* <LifeCardRefferAndVideo
                                imagePath={require('../../assets/imgs/videoIcon.png')}
                                heading={"Watch a video"}
                                description={"Earn 1 life line"}
                                onPress={() => { AddModalState.current(true) }}
                            />
                            <LifeCardRefferAndVideo
                                imagePath={require('../../assets/imgs/letterIcon.png')}
                                heading={"Refer Friends"}
                                description={"Earn upto 10 lives"}
                                onPress={() => RefferModalState.current(true)}
                            /> */}
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
                        setIdVideoAdd(item.id);
                        setVideo(item.video_url);
                        AddModalState.current(true);
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
            id={id}

            // onPressContinue={()=>alert("hii")}
          />
          <WatchAddModal
            ModalRef={AddModalState}
            details
            video={video}
            id={idVideoAdd}
            // onPressContinue={onPressContinue}
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
              'lives are ready to use. Feel free to play more games & win amazin prizes.'
            }
            requestOnPress={() => SucessModalState.current(false)}
            closeOnPress={() => SucessModalState.current(false)}
          />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
export default index;
