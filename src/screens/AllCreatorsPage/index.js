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
} from 'react-native';
import Header from '../../Components/Header';
import {
  ExperienceCard,
  WinExperienceCard,
  FanJoyCard,
  WinningTrendingCard,
  TrendingCards,
  WjBackground,
  ButtonWithRightIcon,
} from '../../Components';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
import I18n from 'react-native-i18n';
import axios from 'axios';
import Config from 'react-native-config';
import {strings} from '../../i18n';
import {RFValue} from 'react-native-responsive-fontsize';
import {getAllCreator, ExperienceProductData} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../redux/types';
import ModalCelebrityProducts from '../../Components/ModalCelebrityProducts';
import ExperienceCelebrityModal from '../../Components/ExperienceCelebrityModal';
import HowItWorkModal from '../../Components/HowItWorkModal';
import Label from '../../Components/Label';
import LongButton from '../../Components/LongButton';
const {width, height} = Dimensions.get('window');
const index = ({route, navigation}) => {
  const celebrityModalState = useRef();
  const ModalState = useRef();
  const AddModalState = useRef(false);

  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const dispatch3 = useDispatch();
  const dispatch4 = useDispatch();
  const data = useSelector(state => state.app.fanjoyData);
  const expData = useSelector(state => state.app.winExperienceProductData);
  // const [experienceId, setExperienceId] = useState();
  useEffect(() => {
    dispatch(getAllCreator());
    console.log('data', data);
  }, []);
  const onPressCreator = id => {
    // alert(id)
    dispatch2({
      type: types.CREATOR_ID,
      creatorId: id,
      //  user: res.data.data,
    });
    navigation.navigate('CreatorsPage');
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
      <ScrollView>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f8d7e8', '#c7dfe8']}>
          <WjBackground
            style={{
              height: height * 0.24,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          />
          <Header style={{top: 0, position: 'absolute', marginTop: 10}} />

          <View style={{marginTop: height * 0.08, alignItems: 'center'}}>
            <Text style={[styles.headerText]}>
              {strings('fan_joy.fan_joy')}
            </Text>
            <Text style={styles.subHeaderText}>
              {strings('fan_joy.created_by_stars')}
            </Text>
            <View
              style={{
                height: 1,
                width: width * 1,
                backgroundColor: 'rgba(178, 190, 181,0.5)',
                marginTop: height * 0.02,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                AddModalState.current(true);
              }}>
              <View style={{flexDirection: 'row', marginTop: height * 0.015}}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../../assets/imgs/circlePlaybtn.png')}
                />
                <Label
                  primary
                  font={RFValue(13)}
                  bold
                  dark
                  style={{color: '#ffff', width: width * 0.4}}>
                  How it works
                </Label>
              </View>
            </TouchableOpacity>
          </View>
          {/* <View style={{ width: width, alignItems: 'center', marginTop: height * 0.06, paddingVertical: 10 }}>
            <ButtonWithRightIcon
              btnStyle={{ backgroundColor: '#420E92', borderRadius: 30 }}
              text={"How it works"}
              textStyle={{ color: '#fff', fontFamily: 'Axiforma-SemiBold' }}
              onPress={() => AddModalState.current(true)}
            />
          </View> */}
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: height * 0.03,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text style={styles.textHeading}>Creators</Text>
              <LongButton
                style={[
                  styles.Margin,
                  {backgroundColor: '#ffffff', marginRight: 15},
                ]}
                textstyle={{
                  color: '#000000',
                  fontFamily: 'Axiforma-SemiBold',
                  fontSize: 14,
                }}
                text="View all Creators"
                font={16}
                shadowless
                onPress={() => navigation.navigate('AllCreatorsList')}
              />
            </View>
            <FlatList
              data={data?.celebrities}
              style={{paddingLeft: 10}}
              horizontal={true}
              renderItem={({item}) => (
                <FanJoyCard
                  onPress={() => {
                    onPressCreator(item?.id);
                  }}
                  name={item?.first_name + ' ' + item?.first_name}
                  imageUrl={item?.profile_image}
                  fans={item.fans}
                  style={{
                    width: width * 0.4,
                    height: height * 0.25,
                    marginRight: 10,
                  }}
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
          </View>
          <View
            style={{
              width: '100%',
              paddingVertical: 22,
              justifyContent: 'center',
              marginTop: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={[
                    styles.textHeading,
                    {textAlign: 'center', marginLeft: 3},
                  ]}>
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
                  }}>
                  You just need to shop a product to win an amazing experience
                  with your favourite stars.
                </Text>
              </View>
            </View>
            <View>
              <FlatList
                data={data?.win_experience}
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
                      console.log('id', item.id);
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
              alignItems: 'center',
              marginTop: 15,
              paddingBottom: 10,
            }}>
            <Text style={styles.textHeading}>Buy experience with creators</Text>
            <FlatList
              data={data?.experiences}
              horizontal={true}
              //  style={{paddingLeft: 8}}
              renderItem={({item}) => (
                <ExperienceCard
                  onPress={() => {
                    navigation.navigate('CreatorExperience', {
                      experience_id: item?.id,
                    });
                  }}
                  imageUrl={item?.thumbnail}
                  title={item?.title}
                  short_desc={item?.short_desc}
                  style={{
                    width: width * 0.43,
                    height: height * 0.32,
                    marginRight: 10,
                  }}
                  textStyle={{lineHeight: 17, paddingBottom: 5}}
                />
              )}
              //keyExtractor={(e) => e.id.toString()}
              contentContainerStyle={{
                paddingRight: 10,
                marginTop: 10,
              }}
              // refreshControl={
              //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              // }
              keyExtractor={item => item.id}
            />
          </View>

          {/* <View
            style={{
              width: '100%',
              height: height * 0.33,
              justifyContent: 'center',
              marginTop: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={[
                    styles.textHeading,
                    {textAlign: 'center', marginLeft: 15},
                  ]}>
                  Trending Products
                </Text>
              </View>
            </View>

            <View>
              <FlatList
                data={data?.products}
                horizontal={true}
                style={{paddingLeft: 12}}
                renderItem={({item}) => (
                  // <TrendingCards
                  //   onPress={() =>  navigation.navigate("ExperienceProductDetail", { productId: item?.id, experienceId: item.celebrity_id })}
                  //   imageUrl={item.image}
                  //   title={item?.title}
                  //   price={item?.price}
                  //   style={{ width: width * 0.38, height: height * 0.33, }}
                  //   imageStyle={{ width: width * 0.35, height: height * 0.22, borderRadius: 15 }}
                  // />
                  <>
                    {item?.is_win ? (
                      <WinningTrendingCard
                        onPress={() => {
                          navigation.navigate(
                            'SimpleProductDetailInExperience',
                            {data: item},
                          );
                          //  navigation.navigate("PRODUCTS", {
                          //   screen: "ProductDetail",
                          //   params:{ data:item }
                          // })
                        }}
                        imageUrl={item?.experience_product?.featured_image}
                        title={item?.experience_product?.title}
                        price={item?.price}
                        updated_stocks={item?.updated_stocks}
                        stock={item?.stock}
                        trending={true}
                      />
                    ) : (
                      <WinningTrendingCard
                        onPress={() => {
                          navigation.navigate(
                            'SimpleProductDetailInExperience',
                            {data: item},
                          );
                          //  navigation.navigate("PRODUCTS", {
                          //   screen: "ProductDetail",
                          //   params:{ data:item }
                          // })
                        }}
                        imageUrl={item?.image}
                        title={item?.title}
                        price={item?.price}
                        updated_stocks={item?.updated_stocks}
                        stock={item?.stock}
                      />
                    )}
                  </>
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
            </View>
          </View> */}
          <ModalCelebrityProducts
            ModalRef={celebrityModalState}
            details
            expData={expData}
            onPressContinue={() => {
              celebrityModalState.current(false);
            }}
          />
          {/* <ExperienceCelebrityModal
            ModalRef={ModalState}
            details
            onPressContinue={onPressContinue}
            experienceDetail={experienceDetail} 
            celebrityData={data.celebrity}
          /> */}
        </LinearGradient>
        <HowItWorkModal
          ModalRef={AddModalState}
          details
          cross={true}
          video={
            'https://winjoy-assets.s3.amazonaws.com/how_it_work/Mostafa_fanjoy-wj.mp4'
          }
          // id={idVideoAdd}
          // onPressContinue={onPressContinue}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default index;
