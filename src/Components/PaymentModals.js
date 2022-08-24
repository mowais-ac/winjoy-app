import React, {useState, useEffect, useRef} from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import appsFlyer from 'react-native-appsflyer';
import CheckBox from '@react-native-community/checkbox';
import Label from './Label';
import LabelButton from './LabelButton';
import {Colors, Images} from '../Constants/Index';
import LongButton from './LongButton';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import {GetDate, JSONtoForm} from '../Constants/Functions';
import ProfilePicture from './ProfilePicture';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {heightConverter} from './Helpers/Responsive';
import {ScrollView} from 'react-native-gesture-handler';
import BuyLifeCongrats from '../Components/BuyLifeCongrats';
import Modals from '../Components/Modals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import types from '../redux/types';
import {useDispatch} from 'react-redux';
import {AppEventsLogger, Settings} from 'react-native-fbsdk-next';
import NoonConformation from './NoonConformation';

const {width, height} = Dimensions.get('window');

const PaymentModals = props => {
  const ref_input2 = useRef();
  const user = useSelector(state => state.app.userData);
  const Noonconformation = useRef();
  const ref_input3 = useRef();
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const [userInfo, setUserInfo] = useState([]);
  const [activeTab, setActiveTab] = useState('card');
  const [selectedcheck, setselectedcheck] = useState('');
  const [name, setName] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [number3, setNumber3] = useState('');
  const [number4, setNumber4] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [address, setaddress] = useState(
    'Floor # 24,Room # 2402, API World Tower, Sheikh zayedRoad,Dubai',
  );
  const Pickup = 'pickup';
  const Deliver = 'deliver';
  const Donation = 'donation';
  const [is_wallet, setIs_wallet] = useState(false);
  const [noonId, setnoonId] = useState(null);
  const [wallet, setwallet] = useState('');
  const [activity, setActivity] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const ApproveRef = useRef();
  const DeclineRef = useRef();
  const SucessModalState = useRef();
  const ModalErrorState = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [accountAddFormVisibility, setAccountAddFormVisibility] =
    useState(false);
  const Combined_closed = () => {
    SucessModalState.current(false);
    props.onload();
  };
  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = HandleChange;
  });
  useEffect(() => {
    setUserInfo(user);
  }, []);

  useEffect(() => {
    setwallet(selectedcheck === Deliver ? props.total + 15 : props.total);
    if (is_wallet) {
      PostCreditCardInfo();
    } else {
      console.log('post not successfull');
    }
  }, [is_wallet, selectedcheck]);

  // console.log('userInfo1', userInfo.user_name);
  const HandleChange = (state, details = null, ForceSuccess = false) => {
    setModelState({state, details, ForceSuccess});
  };
  const HandleExpiryDate = text => {
    setExpiryDate(text);
  };

  const formatFunction = text => {
    let textTemp = text;
    if (textTemp[0] !== '1' && textTemp[0] !== '0') {
      textTemp = '';
    }

    if (textTemp.length === 2) {
      if (
        parseInt(textTemp.substring(0, 2)) > 12 ||
        parseInt(textTemp.substring(0, 2)) == 0
      ) {
        textTemp = textTemp[0];
      } else if (textTemp.length === 2) {
        textTemp += '/';
      } else {
        textTemp = textTemp[0];
      }
    }
    setExpiryDate(textTemp);
  };
  const tabSwitchHandler = tab => {
    setActiveTab(tab);
  };
  console.log('is_wallet', is_wallet);

  const PostCreditCardInfo = async () => {
    let expData = await AsyncStorage.getItem('expData');
    let ids = await AsyncStorage.getItem('ids');
    console.log('expData', expData);
    const expDataParse = JSON.parse(expData);
    const expData1 = [];
    const dat2 = JSON.parse(ids);
    console.log('dat2: ', dat2);
    if (ids !== null) {
      dat2.forEach((element, index) => {
        expData1.push({
          product_id: element,
          is_from_experience: false,
        });
      });
    }
    if (expData !== null) {
      expDataParse.forEach((element, index) => {
        expData1.push(element);
      });
    }
    let number = number1 + number2 + number3 + number4;
    let month = expiryDate.split('/')[0];
    let year = expiryDate.split('/')[1];
    if (is_wallet === true) {
      setActivity(true);
      const Token = await EncryptedStorage.getItem('Token');
      let dat = [];
      let postData = {};
      expData1.map(element => {});
      postData = {
        products: expData1,
      };
      const data = {
        shippingtype: selectedcheck,
        address: address,
        isTest: false,
        country: '',
        type: 'products',
        is_wallet: is_wallet,
        user_name: userInfo.user_name,
      };
      console.log('paymentdata', JSONtoForm(data));
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: JSONtoForm(data),
      };
      console.log('paymentdata', requestOptions.body);
      await fetch(`${Config.API_URL}/order/paynow`, requestOptions)
        .then(async response => response.json())
        .then(async res => {
          setActivity(false);
          try {
            console.log('respayment', res);
            if (res.status === 200) {
              fun_purchase();
              fun_purchaselog();
              fb_purchase();
              fb_checkout();
              SucessModalState.current(true);
              console.log('res', res);
              await AsyncStorage.removeItem('ids');
              await AsyncStorage.removeItem('expData');
              dispatch({
                type: types.CART_COUNTER,
                counter: '',
              });
              //setSuccess(false);
              // SucessModalState.current(true);
            } else if (res.status === 'invalid') {
              ModalErrorState.current(true, {
                heading: 'Error',
              });
            } else if (res.status === 'action_required') {
              navigation.navigate('WebView', {
                uri: res?.next_action?.use_stripe_sdk?.stripe_js,
              });
            }
            /*  else {
          ModalErrorState.current(true, {
            heading: 'Error',
            Error: res?.error,
          });
          setActivity(false);
        } */
          } catch (error) {
            {
              console.log(error);
            }
          }
        });
    } else {
      /*   if (!number2) {
        ModalErrorState.current(true, {
          heading: 'Error',
          Error: 'Card Number Required',
        });
      } else if (!expiryDate) {
        ModalErrorState.current(true, {
          heading: 'Error',
          Error: 'Expiry Required',
        });
      } else if (!cvc) {
        ModalErrorState.current(true, {
          heading: 'Error',
          Error: 'CVC Required',
        });
      } */

      setActivity(true);
      const Token = await EncryptedStorage.getItem('Token');
      let dat = [];
      let postData = {};
      expData1.map(element => {});
      postData = {
        products: expData1,
      };

      const data = {
        shippingtype: selectedcheck,
        address: address,
        isTest: false,
        country: '',
        type: 'products',
        is_wallet: is_wallet,
      };

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: JSONtoForm(data),
      };
      console.log('paymentbody', requestOptions);
      await fetch(`${Config.API_URL}/order/create`, requestOptions)
        .then(async response => response.json())
        .then(async res => {
          setActivity(false);
          try {
            console.log('productsres', res);
            if (res.status === 'order_created') {
              await AsyncStorage.setItem(
                'noon_orderid',
                res?.order?.noon_p_order_reference,
              );
              navigation.navigate('WebView', {
                uri: res?.order?.noon_p_checkout_post_url,
              });
              // setnoonId(res.noon_p_order_reference);
              console.log('productsres2', res);
              fun_purchase();
              fun_purchaselog();
              fb_purchase();
              fb_checkout();
              await AsyncStorage.removeItem('ids');
              await AsyncStorage.removeItem('expData');
              dispatch({
                type: types.CART_COUNTER,
                counter: '',
              });

              //  Noonconformation.current(true);
              // SucessModalState.current(true);
            } /* else if (res.status === 'action_required') {
              navigation.navigate('WebView', {
                uri: res?.next_action?.use_stripe_sdk?.stripe_js,
              });
            } */
          } catch (error) {
            {
              console.log(error);
            }
          }
        });
    }
  };
  console.log('noonid', noonId);
  const eventName = 'af_purchase';
  const eventValues = {
    af_price: 99,
    af_content_id: 13,
    af_content_type: 'General',
    af_currency: 'AED',
    af_quantity: 1,
    af_revenue: 3,
  };
  const fun_purchase = () => {
    appsFlyer.logEvent(
      eventName,
      eventValues,
      res => {
        console.log(res);
      },
      err => {
        console.error(err);
      },
    );
  };
  const fb_purchase = () => {
    AppEventsLogger.logPurchase(45, 'AED', {parameters: '123'});
  };
  const fb_checkout = () => {
    AppEventsLogger.logEvent('checkout', {
      parameters: 'success',
    });
  };
  let info = {
    publicKey: 'key',
    currency: 'biz',
    signature: 'sig',
    purchaseData: 'data',
    price: '123',
    productIdentifier: 'identifier',
    currency: 'AED',
    transactionId: '1000000614252747',
    additionalParameters: {foo: 'bar'},
  };
  const fun_purchaselog = () => {
    appsFlyer.validateAndLogInAppPurchase(
      info,
      res => console.log(res),
      err => console.log(err),
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ModelState.state}
      statusBarTranslucent={false}
      onRequestClose={() => {
        setModelState({
          ...ModelState,
          state: !ModelState.state,
        });
        if (props.onClose) props.onClose();
      }}>
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback
          onPress={() => {
            setModelState({
              ...ModelState,
              state: !ModelState.state,
            });
            if (props.onClose) props.onClose();
          }}>
          <View style={styles.MainView} />
        </TouchableWithoutFeedback>
        <View style={styles.ModalView}>
          <View style={styles.SmallBorder} />
          <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
            {!success ? 'Shipping Address' : 'Payment Details'}
          </Label>
          <View style={styles.ModalBody}>
            {!success ? (
              <>
                <View
                  style={{
                    borderWidth: 1.5,
                    borderColor: '#EFEAF4',
                    margin: 5,
                    borderRadius: 6,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setselectedcheck(Pickup);
                    }}>
                    <View
                      style={[
                        styles.select,
                        selectedcheck === Pickup ? styles.selectedBox : null,
                      ]}>
                      <CheckBox
                        tintColors={{true: '#420E92', false: '#F3EFF7'}}
                        value={selectedcheck === Pickup ? true : false}
                        onValueChange={() => {
                          setselectedcheck(Pickup);
                        }}
                        style={{margin: 0}}
                      />
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginLeft: 8,
                          width: '92%',
                        }}>
                        <Text style={{color: '#420E92', fontWeight: '700'}}>
                          Pickup
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontFamily: 'Axiforma',
                            lineHeight: 20,
                          }}>
                          2, 2402, API World Tower, Sheikh Zayed Road, Dubai.
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: '100%',
                      borderWidth: 0.7,
                      borderColor: '#EFEAF4',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setselectedcheck(Deliver);
                    }}>
                    <View
                      style={[
                        {flexDirection: 'row', padding: 10},
                        selectedcheck === Deliver ? styles.selectedBox : null,
                      ]}>
                      <CheckBox
                        tintColors={{true: '#420E92', false: '#F3EFF7'}}
                        value={selectedcheck === Deliver ? true : false}
                        onValueChange={() => {
                          setselectedcheck(Deliver);
                        }}
                        style={{margin: 0}}
                      />
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '90%',
                          //marginLeft: 10,
                        }}>
                        <Text
                          style={{
                            color: '#420E92',
                            fontWeight: '700',
                            paddingLeft: 10,
                          }}>
                          Deliver
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontFamily: 'Axiforma',
                            lineHeight: 20,
                            paddingLeft: 10,
                          }}>
                          Delivery charges: AED 15
                        </Text>
                        <View style={{marginVertical: 5}}>
                          <TextInput
                            placeholder="Enter your address"
                            keyboardType={'default'}
                            onChangeText={text => {
                              setaddress(text);
                            }}
                            style={{
                              backgroundColor: '#F3F0F8',
                              height: 40,
                              marginLeft: -30,
                              borderRadius: 100,
                              padding: 10,
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: '100%',
                      borderWidth: 0.7,
                      borderColor: '#F7F3FA',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setselectedcheck(Donation);
                    }}>
                    <View
                      style={[
                        {flexDirection: 'row', padding: 10},
                        selectedcheck === Donation ? styles.selectedBox : null,
                      ]}>
                      {/*   {console.log(selectedcheck)} */}
                      <CheckBox
                        tintColors={{true: '#420E92', false: '#F7F3FA'}}
                        value={selectedcheck === Donation ? true : false}
                        onValueChange={() => {
                          setselectedcheck(Donation);
                        }}
                        style={styles.checkbox}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '85%',
                        }}>
                        <View
                          style={{
                            flexDirection: 'column',
                            marginLeft: 10,
                          }}>
                          <Text
                            style={{
                              color: '#57B9E0',
                              fontWeight: '400',
                              fontSize: 12,
                            }}>
                            ShareTheMeal.org
                          </Text>
                          <Text
                            style={{
                              color: '#420E92',
                              fontWeight: '700',
                              fontFamily: 'Axiforma',
                              lineHeight: 20,
                            }}>
                            Make a donation
                          </Text>
                          <Text
                            style={{
                              paddingTop: 5,
                              color: 'black',
                              fontWeight: '400',
                              fontFamily: 'Axiforma',
                              textAlign: 'justify',
                              lineHeight: 20,
                            }}>
                            We at Winjoy believe in changing the lives of people
                            all over the world, not just our customers. The rate
                            of hunger is rising as the world faces a record
                            number of emergencies. More people than ever before
                            require life-saving food assistance. Your minimal
                            amount of share could help this growing need.
                          </Text>
                        </View>
                        <Image
                          style={{width: 30, height: 30}}
                          source={require('../assets/imgs/cup.png')}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', marginTop: 10}}>
                  <TouchableOpacity
                    disabled={!selectedcheck}
                    onPress={() => {
                      setSuccess(true);
                    }}
                    style={{
                      borderRadius: 100,
                      width: '85%',
                      height: 50,
                      backgroundColor: !selectedcheck ? '#E6DFEE' : '#420E92',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#ffff',
                        textAlign: 'center',
                        fontFamily: 'Axiforma',
                        fontWeight: '700',
                        fontSize: 15,
                      }}>
                      Go to Payment
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModelState({
                        ...ModelState,
                        state: !ModelState.state,
                      });
                      if (props.BothClose) {
                        navigation.goBack();
                      }
                      if (props.onClose) props.onClose();
                    }}
                    style={{
                      margin: 10,
                      borderRadius: 100,
                      width: '30%',
                      height: 40,
                    }}>
                    <Text
                      style={{
                        color: '#420E92',
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: 17,
                        fontFamily: 'Axiforma',
                      }}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                {props.yourBalance >= wallet ? (
                  <View style={[styles.tabBtnRow]}>
                    <View style={[styles.tabBtnCol]}>
                      <TouchableOpacity
                        style={[
                          styles.tabBtn,
                          activeTab === 'card' ? styles.tabBtnActive : null,
                        ]}
                        onPress={() => tabSwitchHandler('card')}>
                        <Text style={[styles.tabBtnTxt]}>Credit card</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.tabBtnCol]}>
                      <TouchableOpacity
                        style={[
                          styles.tabBtn,
                          activeTab === 'wallet' ? styles.tabBtnActive : null,
                        ]}
                        onPress={() => tabSwitchHandler('wallet')}>
                        <Text style={[styles.tabBtnTxt]}>Your wallet</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}

                {activeTab === 'card' ? (
                  <>
                    <TouchableOpacity
                      disabled={activity}
                      onPress={() => {
                        PostCreditCardInfo();
                      }}
                      style={{
                        height: heightConverter(20),
                        width: width * 0.9,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: height * 0.06,
                        marginLeft: width * 0.04,
                      }}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={{
                          height: heightConverter(55),
                          width: width * 0.9,
                          borderRadius: 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        colors={['#420E92', '#E7003F']}>
                        {activity ? (
                          <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                          <Label
                            primary
                            font={16}
                            bold
                            style={{color: '#ffffff'}}>
                            Pay AED{' '}
                            {selectedcheck === Deliver
                              ? props.total + 15
                              : props.total}
                          </Label>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 35,
                        justifyContent: 'center',
                        width: '100%',
                      }}>
                      <TouchableOpacity
                        style={{marginTop: 15}}
                        onPress={() => {
                          setSuccess();
                        }}>
                        <Text
                          style={{
                            color: '#E7003F',
                            textAlign: 'center',
                            fontWeight: '700',
                            fontFamily: 'Axiforma',
                            fontSize: 17.5,
                          }}>
                          Go Back
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          margin: 10,
                          height: 30,
                          borderWidth: 1,
                          borderColor: '#EFEAF4',
                        }}
                      />
                      <TouchableOpacity
                        style={{marginTop: 15}}
                        onPress={() => {
                          setSuccess(false);
                          setModelState({
                            ...ModelState,
                            state: !ModelState.state,
                          });
                          if (props.BothClose) {
                            navigation.goBack();
                          }
                          if (props.onClose) props.onClose();
                        }}>
                        <Text
                          style={{
                            color: '#E7003F',
                            textAlign: 'center',
                            fontWeight: '700',
                            fontFamily: 'Axiforma',
                            fontSize: 17.5,
                          }}>
                          Close
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        marginVertical: 10,
                        flexDirection: 'column',
                        width: '100%',
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 13,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#000000',
                            fontWeight: 'bold',
                            fontFamily: 'Axiforma-Regular',
                            fontSize: 16,
                            lineHeight: 27,
                          }}>
                          Your balance summary
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 25,
                      }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontFamily: 'Axiforma-Regular',
                          fontSize: 14.5,
                          lineHeight: 29,
                        }}>
                        Available balance
                      </Text>
                      <Text
                        style={{
                          color: '#000000',
                          fontFamily: 'Axiforma-Regular',
                          fontSize: 14.5,
                          lineHeight: 29,
                          fontWeight: 'bold',
                        }}>
                        AED {parseFloat(props?.yourBalance).toFixed(2)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 25,
                      }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontFamily: 'Axiforma-Regular',
                          fontSize: 14.5,
                          lineHeight: 29,
                        }}>
                        Payable amount
                      </Text>
                      <Text
                        style={{
                          color: '#000000',
                          fontFamily: 'Axiforma-Regular',
                          fontSize: 14.5,
                          lineHeight: 29,
                          fontWeight: 'bold',
                        }}>
                        AED{' '}
                        {selectedcheck === Deliver
                          ? props.total + 15
                          : props.total}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 25,
                      }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontFamily: 'Axiforma-Regular',
                          fontSize: 14.5,
                          lineHeight: 29,
                        }}>
                        Total:
                      </Text>
                      <Text
                        style={{
                          color: '#000000',
                          fontFamily: 'Axiforma-Regular',
                          fontSize: 14.5,
                          lineHeight: 29,
                          fontWeight: 'bold',
                        }}>
                        AED{' '}
                        {selectedcheck === Deliver
                          ? props.total + 15
                          : props.total}
                      </Text>
                    </View>
                    <View style={styles.mView}>
                      <TouchableOpacity
                        disabled={activity}
                        onPress={() => {
                          setIs_wallet(true);
                        }}
                        style={{
                          width: width * 0.9,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 15,
                        }}>
                        <LinearGradient
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          style={{
                            width: '100%',
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 13,
                          }}
                          colors={['#420E92', '#E7003F']}>
                          {activity ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                          ) : (
                            <Label
                              primary
                              font={16}
                              bold
                              style={{color: '#ffffff'}}>
                              Pay AED{' '}
                              {selectedcheck === Deliver
                                ? props.total + 15
                                : props.total}
                            </Label>
                          )}
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>
            )}
          </View>
        </View>
        <BuyLifeCongrats
          ModalRef={SucessModalState}
          heading={'Congratulations'}
          description={'Products Bought'}
          requestOnPress={() => {
            setSuccess(false);
            SucessModalState.current(false);
          }}
          closeOnPress={() => {
            Combined_closed();
            setModelState({
              ...ModelState,
              state: !ModelState.state,
            });
          }}
        />
        <NoonConformation ModalRef={Noonconformation} Orderid={noonId} />
        <Modals ModalRef={ModalErrorState} Alert />
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PaymentModals;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: 'absolute',
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height * 0.85,
    marginTop: height * 0.18,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.BENEFICIARY,
  },
  SmallBorder: {
    width: width * 0.35,
    height: 4,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  ModalHead: {
    marginTop: height * 0.02,
  },

  ModalBody: {
    marginTop: height * 0.01,
    backgroundColor: Colors.WHITE,
    height: height * 0.76,
  },
  CheckImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: height * 0.1,
    marginTop: height * 0.09,
  },
  TextHeading: {
    marginTop: height * 0.02,
  },
  RequestMsg: {
    marginTop: height * 0.01,
    width: width * 0.75,
    lineHeight: height * 0.03,
  },
  select: {
    flexDirection: 'row',
    padding: 10,
  },
  CloseBtn: {
    marginTop: 4,
    color: '#E7003F',
  },

  selectedBox: {
    backgroundColor: '#F7F3FA',
    borderRadius: 3,
  },
  ConView: {
    height: height * 0.1,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.MUTED,
    borderBottomWidth: 1,
  },
  ProfilePicture: {
    marginLeft: width * 0.03,
  },
  ProfileInfo: {
    marginLeft: width * 0.02,
    justifyContent: 'center',
  },
  ReqMsg: {
    marginTop: height * 0.04,
    width: width * 0.8,
    lineHeight: height * 0.035,
  },
  ConfirmMsg: {
    marginTop: height * 0.04,
    width: width * 0.8,
    lineHeight: height * 0.03,
  },
  ApproveBtn: {
    marginTop: height * 0.01,
  },
  DeclineBtn: {
    marginTop: height * 0.02,
  },
  tabBtnRow: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-around',
  },
  tabBtnTxt: {
    color: '#420E92',
    textAlign: 'center',
    fontWeight: '600',
  },
  tabBtnCol: {
    width: '50%',
    paddingHorizontal: 4,
  },
  tabBtn: {
    marginTop: 5,
    borderWidth: 2,
    borderColor: '#E6DFEE',
    width: '100%',
    height: 46,
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#E6DFEE',
  },
  ErrorView: {
    height: height * 0.44,
    marginTop: height * 0.56,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.BENEFICIARY,
  },
  ErrorBody: {
    marginTop: height * 0.02,
    backgroundColor: Colors.WHITE,
    height: height * 0.4,
  },

  ErrorTxt: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  ///new added
  Main1: {
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    width: width * 0.4,
    borderRadius: 55,
    alignSelf: 'center',
    marginTop: height * 0.011,
    borderWidth: 1,
    borderColor: Colors.DARK_LABEL,
  },
  Main2: {
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    width: width * 0.9,
    borderRadius: 55,
    alignSelf: 'center',
    marginTop: height * 0.011,
    borderWidth: 1,
    borderColor: Colors.DARK_LABEL,
  },
  checkbox: {
    alignSelf: 'flex-start',
  },
  mView: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  MarginLarge: {
    paddingLeft: width * 0.04,
    fontSize: RFValue(12),
    color: Colors.DARK_LABEL,
    height: 45,
  },
  MarginLargeNumber: {
    //paddingLeft: width * 0.01,
    marginLeft: 10,
    fontSize: RFValue(12),
    color: Colors.DARK_LABEL,
    letterSpacing: 10,
    width: '100%',
    height: 45,
  },
  titleTxt: {
    marginTop: height * 0.01,
  },
});
