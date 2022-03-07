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
import ModalCelebrityProducts from '../../Components/ModalCelebrityProducts';
const {width, height} = Dimensions.get('window');

const index = ({route, navigation}) => {
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

  const {id} = route.params;
  const [data, setdata] = useState([]);
  useEffect(() => {
    dispatch(GetCreatorPageData(creatorId));
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
          {
            console.log({data: res});
          }
        });
    };
    check();
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

              <Header style={{top: 0, position: 'absolute', marginTop: 10}} />
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

              <FlatList
                data={data?.products}
                horizontal={true}
                ListEmptyComponent={() => (
                  <Text style={{color: '#000000'}}>The list is empty</Text>
                )}
                renderItem={({item}) => (
                  <TrendingCards
                    // onPress={() => navigation.navigate("AllCreatorsPage")}
                    onPress={() => {
                      dispatch5(ProductDetails(item?.id));

                      navigation.navigate('PRODUCTS', {
                        screen: 'ProductDetail',
                        params: {
                          productId: item?.id,
                          experienceId: item.celebrity_id,
                        },
                      });
                    }}
                    title={item?.title}
                    // description={item.description}
                    imageUrl={item?.image}
                    price={item?.price}
                    style={{width: 150, height: height * 0.33, marginRight: 20}}
                    imageStyle={{
                      width: 150,
                      height: height * 0.25,
                      borderRadius: 15,
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
                        <Text style={{color: '#000000'}}>
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
                            console.log('id_exp', item.id);
                            dispatch4(ExperienceProductData(item?.id));
                            celebrityModalState.current(true);
                          }}
                          onPress={() => {
                            dispatch3({
                              experienceID: item?.id,
                              type: types.EXPERIENCE_ID,
                            });
                            console.log('id_exp', item.id);
                            dispatch4(ExperienceProductData(item?.id));
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
                </View>
              </View>
              <View>
                <FlatList
                  data={data?.win_experiences}
                  horizontal={true}
                  style={{paddingLeft: 12}}
                  ItemSeparatorComponent={() => {
                    return <View style={{width: width * 0.03}} />;
                  }}
                  renderItem={({item}) => (
                    <WinExperienceCard
                      onPress={() => {
                        dispatch3({
                          type: types.EXPERIENCE_ID,
                          experienceID: item.id,
                          //  user: res.data.data,
                        });

                        dispatch4(ExperienceProductData(item?.id));
                        celebrityModalState.current(true);
                      }}
                      short_desc={item?.title}
                      thumbnail={item?.thumbnail}
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
                  //keyExtractor={(e) => e.id.toString()}
                  contentContainerStyle={{
                    marginTop: 10,
                    paddingRight: width * 0.05,
                  }}
                  // refreshControl={
                  //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                  // }
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                marginLeft: 5,
                marginTop: 15,
                paddingBottom: 15,
                paddingTop: 15,
              }}>
              <Text
                style={{
                  fontFamily: 'Axiforma-Bold',
                  color: '#eb3d6e',
                  width: '100%',
                  textAlign: 'center',
                }}>
                Buy experience with celebrities
              </Text>
              <FlatList
                data={data?.experience_celebrities}
                horizontal={true}
                ListEmptyComponent={() => (
                  <Text style={{color: '#000000'}}>The list is empty</Text>
                )}
                renderItem={({item}) => (
                  <SecondExperienceCard
                    onPress={() => {
                      // alert(item.id)
                      (celebrity_id.current = data?.celebrity?.id),
                        (experience_id.current = item?.id),
                        dispatch2(
                          ExperienceDetals(item?.id, data?.celebrity?.id),
                        );
                      ModalState.current(true);
                    }}
                    keyExtractor={item => item.id}
                  />
                </View>
              </View>
            </>
          )}
          <ModalCelebrityProducts
            ModalRef={celebrityModalState}
            details
            expData={expData}
            onPressContinue={() => {
              celebrityModalState.current(false);
            }}
          />
          <ExperienceCelebrityModal
            ModalRef={ModalState}
            details
            onPressContinue={onPressContinue}
            experienceDetail={experienceDetail}
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
