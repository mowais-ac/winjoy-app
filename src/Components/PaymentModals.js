import React, {useState, useEffect, useRef} from 'react';
import {
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
const {width, height} = Dimensions.get('window');

const PaymentModals = props => {
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
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
  const Pickup = 'Pickup';
  const Deliver = 'Deliver';
  const Donation = 'Donation';

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

  const PostCreditCardInfo = async () => {
    let expData = await AsyncStorage.getItem('expData');
    let ids = await AsyncStorage.getItem('ids');

    const expDataParse = JSON.parse(expData);
    const expData1 = [];
    const dat2 = JSON.parse(ids);

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

    if (!number2) {
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
    } else {
      setActivity(true);
      const Token = await EncryptedStorage.getItem('Token');
      let dat = [];
      let postData = {};
      expData1.map(element => {});

      postData = {
        products: expData1,
      };

      /* var data = new FormData();
      data.append('card_number', number2);
      data.append('exp_month', month);
      data.append('exp_year', year);
      data.append('cvc', cvc);
      data.append('type', 'products');
      data.append('products', JSON.stringify(expData1)); */

      let data = '';

      data = {
        shippingtype: selectedcheck,
        address: address,
        card_number: number2,
        exp_month: month,
        exp_year: year,
        cvc: cvc,
        type: products,
        products: JSON.stringify(expData1),
      };

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: data,
      };
      await fetch(`${Config.API_URL}/paynow`, requestOptions)
        .then(async response => response.json())
        .then(async res => {
          setActivity(true);

          if (res.status === 'success') {
            await AsyncStorage.removeItem('ids');
            await AsyncStorage.removeItem('expData');
            dispatch({
              type: types.CART_COUNTER,
              counter: '',
            });
            //setSuccess(false);
            SucessModalState.current(true);
          } else if (res.status === 'action_required') {
            navigation.navigate('WebView', {
              uri: res?.next_action?.use_stripe_sdk?.stripe_js,
            });
          } else {
            ModalErrorState.current(true, {
              heading: 'Error',
              Error: res?.error,
            });
            setActivity(false);
          }
        });
    }
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
                    margin: 10,
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
                        style={styles.checkbox}
                      />
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginLeft: 10,
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
                          Floor # 24,Room # 2402, API World Tower, Sheikh zayed
                          Road,Dubai
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
                        style={styles.checkbox}
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
                            }}>
                            Make a donation
                          </Text>
                          <Text
                            style={{
                              paddingTop: 5,
                              color: 'black',
                              fontWeight: '400',
                              fontFamily: 'Axiforma',
                              lineHeight: 20,
                            }}>
                            Our mission objective at idealz is to transform
                            lives, not just those of our customers but of
                            children who are less fortunate around the world.
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
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setSuccess(true);
                    }}
                    style={{
                      borderRadius: 100,
                      width: '75%',
                      height: 40,
                      backgroundColor: '#420E92',
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
                <View style={styles.mView}>
                  <Label notAlign darkmuted style={styles.titleTxt}>
                    Name on Card
                  </Label>
                  <View style={styles.Main2}>
                    <TextInput
                      placeholder="Name on Card"
                      placeholderTextColor={Colors.DARK_LABEL}
                      keyboardType={'default'}
                      style={styles.MarginLarge}
                    />
                  </View>
                </View>
                <View style={styles.mView}>
                  <Label notAlign darkmuted style={styles.titleTxt}>
                    Card Number
                  </Label>
                  <View style={[styles.Main2, {flexDirection: 'row'}]}>
                    <TextInput
                      placeholder="•••• •••• •••• ••••"
                      placeholderTextColor={Colors.DARK_LABEL}
                      keyboardType={'numeric'}
                      maxLength={16}
                      //onSubmitEditing={() => ref_input3.current.focus()}
                      ref={ref_input2}
                      // onBlur={onBlur}
                      onChangeText={text => {
                        setNumber2(text);
                      }}
                      style={styles.MarginLargeNumber}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width * 0.9,
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                  }}>
                  <View style={[styles.mView, {width: width * 0.4}]}>
                    <Label notAlign darkmuted style={styles.titleTxt}>
                      Expiry date
                    </Label>
                    <View style={styles.Main1}>
                      <TextInput
                        placeholder="MM/YY "
                        placeholderTextColor={Colors.DARK_LABEL}
                        keyboardType={'numeric'}
                        maxLength={5}
                        // onBlur={onBlur}
                        //value={formatFunction(cardExpiry)}
                        // onChangeText={(text) => HandleExpiryDate(text)}
                        // value={formatFunction(expiryDate)}
                        onChangeText={text => formatFunction(text)}
                        value={expiryDate}
                        style={styles.MarginLarge}
                      />
                    </View>
                  </View>
                  <View style={[styles.mView, {width: width * 0.4}]}>
                    <Label notAlign darkmuted style={styles.titleTxt}>
                      CVV
                    </Label>
                    <View style={styles.Main1}>
                      <TextInput
                        placeholder="CVV"
                        placeholderTextColor={Colors.DARK_LABEL}
                        keyboardType={'numeric'}
                        maxLength={3}
                        onChangeText={text => setCvc(text)}
                        style={styles.MarginLarge}
                      />
                    </View>
                  </View>
                </View>

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
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    colors={['#420E92', '#E7003F']}>
                    {activity ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Label primary font={16} bold style={{color: '#ffffff'}}>
                        Pay AED {props?.total + 15}
                      </Label>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
                <View
                  style={{
                    marginLeft: 130,
                    flexDirection: 'row',
                    marginVertical: 20,
                    //alignItems: 'center',
                    justifyContent: 'center',
                    width: 100,
                  }}>
                  <TouchableOpacity
                    style={{marginTop: 10}}
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
                      margin: 6,
                      height: 30,
                      borderWidth: 1,
                      borderColor: '#EFEAF4',
                    }}
                  />
                  <TouchableOpacity
                    style={{marginTop: 10}}
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
        <Modals ModalRef={ModalErrorState} Error />
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
    height: height * 0.7,
    marginTop: height * 0.3,
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
    height: height * 0.65,
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
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  MarginLargeNumber: {
    //paddingLeft: width * 0.01,
    marginLeft: 10,
    fontSize: RFValue(12),
    color: Colors.DARK_LABEL,
    letterSpacing: 10,
    width: '100%',
  },
  titleTxt: {
    marginTop: height * 0.01,
  },
});
