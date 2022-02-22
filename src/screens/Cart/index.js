import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Background from '../../Components/Background';
import SafeArea from '../../Components/SafeArea';
import Label from '../../Components/Label';
import Header from '../../Components/Header';

import {Colors} from '../../Constants/Index';
import Section from '../../Components/Section';
import UserInfo from '../../Components/UserInfo';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import NotFoundCart from '../../Components/NotFoundCart';
import {FormatNumber, wait} from '../../Constants/Functions';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightConverter,
  widthConverter,
  widthPercentageToDP,
} from '../../Components/Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import LongButton from '../../Components/LongButton';
import PaymentModals from '../../Components/PaymentModals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modals from '../../Components/Modals';
import BuyLifeCongrats from '../../Components/BuyLifeCongrats';
import {GetCartData, RemoveCartData} from '../../redux/actions';
const {width, height} = Dimensions.get('window');

import {connect, useDispatch, useSelector} from 'react-redux';
import types from '../../redux/types';
import {WjBackground} from '../../Components';
const index = ({navigation}) => {
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const dispatch3 = useDispatch();
  const ModalState = useRef();
  const SucessModalState = useRef();
  const ModalStateError = useRef();
  const [Data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activity, setActivity] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [listloader, setListloader] = useState(false);
  const [id, setId] = useState(null);
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const cartData = useSelector(state => state.app.cartData);
  const removeCartData = useSelector(state => state.app.removeCartData);
  const loading = useSelector(state => state.event.loading);
  const counterMain = useSelector(state => state.app.counter);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(GetCartData());
    wait(500).then(() => setRefreshing(false));
  }, []);
  const PostData = async () => {
    ModalState.current(true);
  };
  useEffect(() => {
    dispatch(GetCartData());
  }, []);

  const RemoveItem = (id, qty) => {
    console.log('qqty', qty);
    setId(id);
    dispatch2(RemoveCartData(id));
    dispatch(GetCartData());
    setUpdateData(!updateData);
    dispatch3({
      type: types.CART_COUNTER,
      counter: counterMain - qty,
    });
  };
  const renderItem = ({item}) => {
    return (
      // <TouchableOpacity
      //   onPress={() => navigation.navigate("WishlistDetails", { item })}
      // >
      <View>
        <Section
          style={styles.Section}
          disabled={true}
          //onPress={() => navigation.navigate("ProductDetails", { item })}
        >
          <View style={styles.SectionView}>
            <View style={styles.ImageView}>
              <Image
                source={{
                  uri: item?.product?.image,
                }}
                style={styles.Image}
              />
            </View>
            <View style={[styles.TextView, {width: width * 0.53}]}>
              <Label
                notAlign
                dark
                bold2
                headingtype="h6"
                style={{width: width * 0.48}}>
                {item?.product?.title} x {item?.qty}
              </Label>
              {/* <Label notAlign darkmuted bold font={12} style={{ width: width * 0.5,height:height*0.05 }}>
                {item.description}
              </Label> */}
              <Label
                notAlign
                primary
                bold
                headingtype="h6"
                style={styles.LessMargin}>
                Total: AED {FormatNumber(+item?.product?.price * item?.qty)}
              </Label>
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 20,
              }}
              onPress={() => RemoveItem(item.id, item?.qty)}>
              {loading && item.id === id ? (
                <ActivityIndicator
                  size="small"
                  color="#000000"
                  style={{left: 5}}
                />
              ) : (
                <Entypo
                  name="cross"
                  size={25}
                  color={Colors.DARK_MUTED}
                  style={{left: 5, opacity: 0.5}}
                />
              )}
            </TouchableOpacity>
          </View>
        </Section>
      </View>
      // </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{height: height}}>
      <WjBackground
        style={{
          height: height * 0.19,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      />
      <Header value={3} />
      <View style={{alignItems: 'center'}}>
        <Text style={[styles.headerText, {marginTop: 20}]}>Cart</Text>
      </View>
      {cartData?.data === null ? (
        <Label primary bold headingtype="h4" style={{marginTop: 15}}>
          No data
        </Label>
      ) : (
        <View style={{marginTop: height * 0.06}}>
          <View style={{height: '85%'}}>
            <FlatList
              data={cartData?.data}
              renderItem={renderItem}
              scrollEnabled={true}
              keyExtractor={e => e.id.toString()}
              extraData={updateData}
              ListEmptyComponent={
                listloader ? (
                  <ActivityIndicator
                    size="large"
                    color="#000000"
                    style={{marginTop: height * 0.2}}
                  />
                ) : (
                  <NotFoundCart
                    text="Cart"
                    onPress={() => navigation.navigate('PRODUCTS')}
                  />
                )
              }
              refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              }
              contentContainerStyle={{
                paddingBottom: height * 0.06,
              }}
            />
          </View>
          {cartData?.data?.length > 0 ? (
            <View style={styles.card2}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: widthPercentageToDP('83'),
                }}>
                <Text style={styles.metaText}>SubTotal</Text>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>
                  {'AED '}
                  {FormatNumber(+cartData?.sub_total)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: widthPercentageToDP('83'),
                }}>
                <Text style={styles.metaText}>Vat 5%</Text>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>
                  {'AED '}
                  {FormatNumber(+cartData?.vat)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: widthPercentageToDP('83'),
                }}>
                <Text style={styles.metaText}>Grand Total</Text>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>
                  {'AED '}
                  {FormatNumber(+cartData?.total)}
                </Text>
              </View>
              {/* <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthPercentageToDP("83")
            }}>
              <Text style={[styles.metaText, { fontWeight: 'bold' }]}>Buy a test</Text>
              <Text style={styles.text}>Gold Coin</Text>

            </View> */}

              <TouchableOpacity
                onPress={() => {
                  // ModalState.current(true);
                  PostData();
                }}
                disabled={activity}
                style={{
                  height: heightConverter(55),
                  width: width - 25,
                  position: 'absolute',
                  bottom: 0,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    height: heightConverter(55),
                    width: width - 25,
                    position: 'absolute',
                    bottom: 0,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  colors={['#420E92', '#E7003F']}>
                  {activity ? (
                    <ActivityIndicator size="small" color={'#fff'} />
                  ) : (
                    <Label primary font={16} bold style={{color: '#ffffff'}}>
                      Checkout
                    </Label>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      )}
      <PaymentModals ModalRef={ModalState} details total={cartData?.total} />
      <Modals
        ModalRef={ModalStateError}
        Error
        onClose={() => {
          setModelState({
            ...ModelState,
            state: !ModelState.state,
          });
        }}
      />
      <BuyLifeCongrats
        ModalRef={SucessModalState}
        heading={'Congratulations'}
        description={'Products bought'}
        requestOnPress={() => {
          SucessModalState.current(false);
        }}
        closeOnPress={() => {
          SucessModalState.current(false);
          setModelState({
            ...ModelState,
            state: !ModelState.state,
          });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.18,
  },
  header: {
    flexDirection: 'row',
    marginTop: height * 0.03,
    marginLeft: width * 0.034,
  },
  Section: {
    marginTop: height * 0.01,
    height: height * 0.12,
    justifyContent: 'center',
  },
  SectionView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 12,
  },
  ImageView: {
    width: width * 0.22,
    height: height * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  Image: {
    width: 80,
    height: 65,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  TextView: {
    marginLeft: width * 0.052,
  },
  LessMargin: {
    marginTop: height * 0.003,
    color: 'red',
  },
  card2: {
    width: width - 25,
    height: height * 0.17,
    backgroundColor: '#ffffff',
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    left: 2,
    alignItems: 'center',
    elevation: 3,
    position: 'absolute',
    paddingTop: 13,
  },
  metaText: {
    color: '#000000',
    fontFamily: 'Axiforma-Regular',
  },
  text: {
    color: '#e7003f',
    fontFamily: 'Axiforma-Regular',
  },
  ///modal styles

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  MarginLarge: {
    paddingLeft: width * 0.09,
    fontSize: RFValue(12),
    color: Colors.WHITE,
  },
  headerText: {
    color: '#ffffff',
    fontFamily: 'Axiforma-SemiBold',
    fontSize: RFValue(22),
  },
});
export default index;
