import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Label from '../../Components/Label';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import {Card} from '../../Components';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
} from '../../Components/Helpers/Responsive';
import {connect, useDispatch, useSelector} from 'react-redux';
import Header from '../../Components/Header';
import EncryptedStorage from 'react-native-encrypted-storage';
import {RFValue} from 'react-native-responsive-fontsize';
import dayjs from 'dayjs';
import types from '../../redux/types';
import Config from 'react-native-config';
import {JSONtoForm} from '../../Constants/Functions';
import Counter from 'react-native-counters';
import BuyLifeCongrats from '../../Components/BuyLifeCongrats';
import Modals from '../../Components/Modals';
import {ProductDetails} from '../../redux/actions';
import {useIsFocused} from '@react-navigation/native';
const ProductDetail = ({props, navigation, route}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const SucessModalState = useRef();
  const ModalErrorState = useRef();
  const counterMain = useSelector(state => state.app.counter);
  const productsDetails = useSelector(state => state.app.productsDetals);
  const productId = route?.params?.productId;
  const [activity, setActivity] = useState(false);
  const [count, setCount] = useState(1);

  const loading = useSelector(state => state.app.loading);

  useEffect(() => {
    dispatch2(ProductDetails());
  }, [dispatch2]);
  useEffect(() => {
    console.log('productId', productId);
    dispatch2(ProductDetails(productId));
  }, []);
  const onChange = (number, type) => {
    setCount(number);
    console.log(number, type); // 1, + or -
  };
  const SaveIdInfo = async () => {
    return alert(
      'Thank you for your interest. Shopping experience is coming soon.',
    );
    console.log(counterMain, count);
    setActivity(true);
    var postData = JSON.stringify({
      is_from_experience: false,
      product_id: productsDetails?.product?.luckydraw?.product_id,
      count: count,
    });
    const Token = await EncryptedStorage.getItem('Token');

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
      body: postData,
    };
    console.log('requestOptions', requestOptions);
    await fetch(`${Config.API_URL}/add_to_cart`, requestOptions)
      .then(async response => response.json())
      .then(async res => {
        console.log('res', res);
        if (res.status === 'success') {
          setActivity(false);
          SucessModalState.current(true);
          dispatch({
            type: types.CART_COUNTER,
            counter: counterMain + count,
          });
        } else {
          setActivity(false);
          ModalStateError.current(true, {
            heading: 'Error',
            Error: res.message,
            array: res.errors ? Object.values(res.errors) : [],
          });
        }
        setActivity(false);
      })
      .catch(e => {
        console.log('error', e);
        //  ButtonRef.current.SetActivity(false);
      });
  };

  return (
    <SafeAreaView style={{height: '100%', paddingBottom: 120}}>
      <ScrollView style={{}}>
        <LinearGradient style={styles.mainView} colors={['#420E92', '#E7003F']}>
          <View style={{height: 20}} />
          <Header back={true} />
        </LinearGradient>
        {loading ? (
          <ActivityIndicator size="large" color="#000000" />
        ) : (
          <>
            <View style={{paddingHorizontal: 15}}>
              <View style={[styles.upperView]}>
                <Card
                  images={productsDetails?.product?.images}
                  updated_stocks={productsDetails?.product?.updated_stocks}
                  stock={productsDetails?.product?.stock}
                />
              </View>
              <View style={styles.card}>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'Axiforma-Regular',
                    fontSize: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E6DFEE',
                    width: '100%',
                    textAlign: 'center',
                    paddingVertical: 10,
                  }}>
                  {productsDetails?.product?.title}
                </Text>

                <Label
                  primary
                  font={16}
                  dark
                  style={{color: '#E7003F', marginTop: 10}}>
                  Get a chance to win
                </Label>

                {productsDetails?.product?.luckydraw?.experience ? (
                  <Label font={16} dark style={{color: '#000000'}}>
                    {productsDetails?.product?.luckydraw?.experience?.title}
                  </Label>
                ) : (
                  <Label font={16} dark style={{color: '#000000'}}>
                    {productsDetails?.product?.luckydraw?.prize_title}
                  </Label>
                )}
                <Label
                  font={12}
                  light
                  style={{
                    color: '#000000',
                    paddingVertical: 10,
                    lineHeight: 17,
                  }}>
                  Max draw date{' '}
                  {dayjs(productsDetails?.product?.luckydraw?.end_date).format(
                    'MMMM DD, YYYY',
                  )}{' '}
                  or when the campaign is sold out, which is earliest
                </Label>
                <Text style={styles.closingTxt}>Closing Soon</Text>
              </View>
              <View style={styles.pdView}>
                <Label
                  notAlign
                  primary
                  font={16}
                  bold
                  style={{color: '#E7003F'}}>
                  Products Details
                </Label>
                <Label
                  notAlign
                  font={11}
                  dark
                  style={{color: '#000000', lineHeight: 20}}>
                  {productsDetails?.product?.description}
                </Label>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <View style={styles.card2Wrap}>
        <View style={styles.card2}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}>
            <View>
              <Text style={styles.metaText}>To enter in the lucky draw</Text>
              <Text style={[styles.metaText, {fontWeight: 'bold'}]}>
                Buy a {productsDetails?.product?.title}
              </Text>
            </View>
            <Text
              style={[
                styles.text,
                {fontWeight: 'bold', fontSize: RFValue(14)},
              ]}>
              AED {+productsDetails?.product?.price?.toLocaleString()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Counter
                buttonStyle={{borderWidth: 0}}
                start={1}
                buttonTextStyle={{
                  color: '#000000',
                  fontFamily: 'Axiforma-Bold',
                }}
                max={parseInt(productsDetails?.product?.stock)}
                countTextStyle={{color: '#000000', fontFamily: 'Axiforma-Bold'}}
                onChange={(number, type) => onChange(number, type)}
              />
            </View>
            <TouchableOpacity
              disabled={activity}
              onPress={() => {
                SaveIdInfo();
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  paddingVertical: 15,
                  width: width * 0.55,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                colors={['#420E92', '#E7003F']}>
                {activity ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={{color: '#ffffff', fontFamily: 'Axiforma-Bold'}}>
                    Add to Cart
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <BuyLifeCongrats
        ModalRef={SucessModalState}
        heading={'Alert'}
        description={'Successfully added to cart'}
        requestOnPress={() => {
          SucessModalState.current(false);
        }}
        closeOnPress={() => {
          SucessModalState.current(false);
        }}
      />
      <Modals ModalRef={ModalErrorState} Error />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: heightConverter(200),
  },
  bottomView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  LinerGradientProgrees: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    borderRadius: 9,
    height: 14,
    left: 2,
  },
  GreybarWidth: {
    width: widthPercentageToDP('95'),
    height: 18,
    zIndex: -1,
    position: 'absolute',
    backgroundColor: '#EADFE3',
    borderRadius: 9,
  },
  containerprogressBar: {
    width: widthPercentageToDP('95'),
    marginBottom: 1,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 3,
    marginLeft: 2,
    zIndex: 1,
  },
  upperView: {
    marginTop: -height * 0.13,
    //  position: 'absolute',
    width: '100%',
  },
  card: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#ffffff',
    paddingBottom: 22,
    marginBottom: 30,
    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  card2Wrap: {
    bottom: 10,
    left: 0,
    position: 'absolute',
    paddingHorizontal: 15,
    width: '100%',
  },
  card2: {
    width: '100%',
    backgroundColor: '#ffffff',
    marginTop: 10,
    borderRadius: 10,
    paddingBottom: 10,
    elevation: 3,
  },

  closingTxt: {
    color: '#ffffff',
    backgroundColor: '#e7003f',
    fontFamily: 'Axiforma-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 10,
    width: 140,
    textAlign: 'center',
    borderRadius: 20,
    left: '50%',
    marginLeft: -70,
    bottom: -20,
    position: 'absolute',
  },
  pdView: {
    minHeight: 100,
  },
  metaText: {
    color: '#000000',
    fontFamily: 'Axiforma-Regular',
  },
  text: {
    color: '#e7003f',
    fontFamily: 'Axiforma-Regular',
  },
});

export default ProductDetail;
