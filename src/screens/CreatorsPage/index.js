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
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '../../Components/Header';
import {
  SecondExperienceCard,
  TrendingCards,
  WinExperienceCard,
} from '../../Components';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar} from 'react-native-elements';
import ExperienceCelebrityModal from '../../Components/ExperienceCelebrityModal';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {
  ExperienceDetals,
  ExperienceProductData,
  GetCreatorPageData,
  ProductDetails,
} from '../../redux/actions';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import types from '../../redux/types';
import socketIO from 'socket.io-client';
import ModalCelebrityProducts from '../../Components/ModalCelebrityProducts';
const MYServer = 'https://node-winjoyserver-deploy.herokuapp.com/';
const {width, height} = Dimensions.get('window');

const index = ({route, navigation}) => {
  const LandingData = useSelector(state => state.app.LandingData);
  const socket = socketIO(MYServer);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const dispatch3 = useDispatch();
  const dispatch4 = useDispatch();
  const dispatch5 = useDispatch();
  const ModalState = useRef();
  const celebrity_id = useRef();
  const experience_id = useRef();
  const celebrityModalState = useRef();
  const creatorId = useSelector(state => state.app.creatorId);
  //const data = useSelector(state=>state.app.creatorId);
  const expData = useSelector(state => state.app.winExperienceProductData);
  const experienceDetail = useSelector(state => state.app.experienceDetail);
  const productsDetails = useSelector(state => state.app.productsDetals);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [data1, setdata1] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [data2, setdata2] = useState([]);
  const {id} = route.params;
  const [data, setdata] = useState([]);
  useEffect(() => {
    _Api(id);
    socket.on('sendOnboarding', msg => {
      console.log('Should navigate from product details');
      NavigateToQuiz(true);
    });
  }, []);
  const _Api = id => {
    const check = async () => {
      //alert(id);
      const Token = await EncryptedStorage.getItem('Token');
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      };
      await fetch(`${Config.API_URL}/celebrity/detail/${id}`, requestOptions)
        .then(async response => response.json())
        .then(res => {
          setdata(res);
          setLoading(false);
          /* {
            console.log({data: res});
          } */
        });
    };
    check();
  };
  const _Api2 = id => {
    const check1 = async () => {
      //alert(id);
      setLoading1(true);
      const Token = await EncryptedStorage.getItem('Token');
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      };
      await fetch(
        `${Config.API_URL}/experience/product_list?experience_celebrity_id=${id}`,
        requestOptions,
      )
        .then(async response => response.json())
        .then(res => {
          {
            console.log({data11: res});
          }
          setdata1(res);
          setLoading1(false);
          /* {
            console.log({data: res});
          } */
        });
    };
    check1();
  };
  const _Api3 = (experience_id, celebrity_id) => {
    const check2 = async () => {
      //alert(id);
      setLoading2(true);
      const Token = await EncryptedStorage.getItem('Token');
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      };
      await fetch(
        `${Config.API_URL}/experience/detail?experience_id=${experience_id}&celebrity_id=${celebrity_id}`,
        requestOptions,
      )
        .then(async response => response.json())
        .then(res => {
          setdata2(res);
          setLoading2(false);
          /* {
            console.log({data: res});
          } */
        });
    };
    check2();
  };
  const NavigateToQuiz = fromSocket => {
    if (
      LandingData?.gameShow?.status === 'on_boarding' ||
      LandingData?.gameShow?.status === 'started' ||
      fromSocket
    ) {
      {
        console.log(
          'LandingData?.gameShow?.status pd',
          LandingData?.gameShow?.status,
        );
      }
      navigation.navigate('GameStack', {
        screen: 'Quiz',
        params: {
          uri: LandingData?.gameShow?.live_stream?.key,
          gameshowStatus: LandingData?.gameShow?.status,
        },
      });
    }
  };
  // console.log('LD: ', data);
  const onPressContinue = () => {
    ModalState.current(false);
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
      <ScrollView>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f8d7e8', '#c7dfe8']}>
          {loading ? (
            <View
              style={{
                justifyContent: 'center',
                height: 750,
              }}>
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : (
            <>
              <Image
                source={{
                  uri:
                    data.celebrity?.profile_image ||
                    data?.celebrity?.cover_image,
                }}
                style={styles.mainView}
                resizeMode={'cover'}
              />

              <Header
                style={{
                  position: 'absolute',
                  zIndex: 1000,
                  //backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
                  width: '100%',
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  top: Platform.OS === 'android' ? 0 : height * 0,
                }}
              />
              <View
                style={{
                  top: height * 0.12,
                  position: 'absolute',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginLeft: width * 0.03,
                }}>
                <Avatar
                  rounded
                  size={80}
                  // title="MD"
                  source={{
                    uri: data?.celebrity?.profile_image,
                  }}
                />
                <View style={{marginTop: height * 0.06}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text
                      style={[
                        styles.headerText,
                        {marginLeft: 10, fontSize: RFValue(16), top: 10},
                      ]}>
                      {data.celebrity?.first_name +
                        ' ' +
                        data.celebrity?.last_name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('CreatorsGallery')}>
                      <View
                        style={{
                          height: height * 0.04,
                          width: width * 0.25,
                          borderWidth: 1,
                          borderColor: '#fff',
                          borderRadius: width * 0.2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={[
                            styles.headerText,
                            {
                              fontFamily: 'Axiforma-Regular',
                              fontSize: RFValue(14),
                            },
                          ]}>
                          Gallery
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text
                    numberOfLines={3}
                    style={{
                      fontFamily: 'Axiforma-Regular',
                      fontSize: RFValue(11),
                      paddingVertical: 8,
                      lineHeight: 17,
                      color: '#3E324F',
                      width: width * 0.7,
                      textAlign: 'justify',
                      top: height * 0.019,
                      height: height * 0.15,
                      marginLeft: 10,
                    }}>
                    {data?.celebrity?.bio}
                  </Text>
                </View>
              </View>
              <View style={{width: width, marginTop: height * 0.32}}>
                <View
                  style={{
                    width: '100%',
                    marginLeft: 5,
                    marginTop: 15,
                    paddingBottom: 15,
                    paddingTop: 15,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  }}>
                  <View
                    style={{
                      width: '95%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',

                      marginLeft: width * 0.05,
                    }}>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Axiforma-Bold',
                          color: '#eb3d6e',
                          width: width * 0.9,
                          textAlign: 'center',
                        }}>
                        Trending Products
                      </Text>
                    </View>
                  </View>

                  <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={data?.products}
                    horizontal={true}
                    ListEmptyComponent={() => (
                      <Text
                        style={{
                          color: '#000000',
                        }}>
                        The list is empty
                      </Text>
                    )}
                    renderItem={({item}) => (
                      <TrendingCards
                        onPress={() => {
                          // dispatch5(ProductDetails(item.id));
                          //console.log('proDet', productsDetails);
                          navigation.navigate('ProductDetail', {
                            experienceId: item.celebrity_id,
                            productId: item.id,
                          });
                        }}
                        title={item.title}
                        imageUrl={item.image}
                        price={item.price}
                        style={{
                          width: 165,
                        }}
                        imageStyle={{
                          width: 150,
                          height: height * 0.25,
                          borderRadius: 15,
                        }}
                      />
                    )}
                    contentContainerStyle={{
                      marginTop: 15,
                      marginLeft: width * 0.03,
                    }}
                    keyExtractor={item => item.id}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    paddingVertical: 22,
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: '100%',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontFamily: 'Axiforma-Bold',
                          color: '#eb3d6e',
                          textAlign: 'center',
                        }}>
                        Win an Experience
                      </Text>
                      <Text
                        style={{
                          color: '#000000',
                          fontFamily: 'Axiforma-Regular',
                          textAlign: 'center',
                          fontSize: RFValue(12),
                          marginTop: 4,
                          paddingHorizontal: 15,
                          lineHeight: height * 0.025,
                        }}>
                        You just need to shop a product to win an amazing
                        experience with your favourite stars.
                      </Text>
                    </View>
                  </View>
                  <View>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      data={data?.win_experiences}
                      ListEmptyComponent={() => (
                        <Text
                          style={{
                            color: '#000000',
                          }}>
                          The list is empty
                        </Text>
                      )}
                      horizontal={true}
                      style={{paddingLeft: 12}}
                      ItemSeparatorComponent={() => {
                        return <View style={{width: width * 0.03}} />;
                      }}
                      renderItem={({item}) => (
                        <WinExperienceCard
                          short_desc={item?.title}
                          thumbnail={item?.thumbnail}
                          fun={() => {
                            dispatch3({
                              experienceID: item?.id,
                              type: types.EXPERIENCE_ID,
                            });
                            //console.log('id_exp', item.id);
                            _Api2(item?.id);
                            //dispatch4(ExperienceProductData(item?.id));
                            celebrityModalState.current(true);
                          }}
                          onPress={() => {
                            dispatch3({
                              experienceID: item?.id,
                              type: types.EXPERIENCE_ID,
                            });
                            _Api2(item?.id);
                            // console.log('id_exp', item.id);
                            //dispatch4(ExperienceProductData(item?.id));
                            celebrityModalState.current(true);
                          }}
                          style={{
                            width: width * 0.4,
                            backgroundColor: '#fff',
                            borderRadius: 15,
                          }}
                          imageStyle={{
                            width: width * 0.4,
                            height: height * 0.18,
                            borderRadius: 15,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                          }}
                        />
                      )}
                      contentContainerStyle={{
                        marginTop: 15,
                        paddingRight: width * 0.05,
                      }}
                      keyExtractor={item => item.id}
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    marginLeft: 5,
                    paddingBottom: 15,
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontFamily: 'Axiforma-Bold',
                      color: '#eb3d6e',
                      textAlign: 'center',
                    }}>
                    Buy experience with celebrities
                  </Text>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={data?.experience_celebrities}
                    horizontal={true}
                    ListEmptyComponent={() => (
                      <Text
                        style={{
                          color: '#000000',
                        }}>
                        The list is empty
                      </Text>
                    )}
                    renderItem={({item}) => (
                      <SecondExperienceCard
                        onPress={() => {
                          (celebrity_id.current = data.celebrity.id),
                            (experience_id.current = item.id),
                            _Api3(item.id, data.celebrity.id);
                          //dispatch2(
                          // ExperienceDetals(item.id, data.celebrity.id),
                          //);
                          ModalState.current(true);
                        }}
                        cover_photo={item.featured_image}
                        short_desc={item.title}
                        price={item.price}
                        heading={item.title}
                        style={{
                          width: 185,
                        }}
                      />
                    )}
                    contentContainerStyle={{
                      marginTop: 15,
                      marginLeft: width * 0.03,
                    }}
                    keyExtractor={item => item.id}
                  />
                </View>
              </View>
            </>
          )}
          <ModalCelebrityProducts
            loading1={loading1}
            ModalRef={celebrityModalState}
            details
            expData={data1}
            onPressContinue={() => {
              celebrityModalState.current(false);
            }}
          />
          <ExperienceCelebrityModal
            loading2={loading2}
            ModalRef={ModalState}
            details
            onPressContinue={onPressContinue}
            experienceDetail={data2}
            celebrityData={data.celebrity}
            celebrity_id={celebrity_id.current}
            experience_id={experience_id.current}
          />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
export default index;
