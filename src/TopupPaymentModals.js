import React, {useState, useEffect, useRef} from 'react';
import {
  Platform,
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
  Text,
} from 'react-native';
import Label from './Components/Label';
import LabelButton from './Components/LabelButton';
import {Colors, Images} from './Constants/Index';
//import LongButton from '../Components/LongButton';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import {GetDate, JSONtoForm} from '../Constants/Functions';
import ProfilePicture from './Components/ProfilePicture';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {heightConverter} from '../src/Components/Helpers/Responsive';
import {ScrollView} from 'react-native-gesture-handler';
import BuyLifeCongrats from './Components/BuyLifeCongrats';
import Modals from './Components/Modals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import types from './redux/types';
import {useDispatch} from 'react-redux';
const {width, height} = Dimensions.get('window');

const PaymentModals = props => {
  const [Topupamount, settopupammount] = useState('10');
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });

  const [name, setName] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [number3, setNumber3] = useState('');
  const [number4, setNumber4] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [activity, setActivity] = useState(false);

  const ApproveRef = useRef();
  const DeclineRef = useRef();
  const SucessModalState = useRef();
  const ModalErrorState = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

      var data = new FormData();
      data.append('card_number', number2);
      data.append('exp_month', month);
      data.append('exp_year', year);
      data.append('cvc', cvc);
      data.append('topup_amount', parseInt(Topupamount));

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: data,
      };
      await fetch(`${Config.API_URL}/topup_balance`, requestOptions)
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
            setActivity(false);
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

  const modalCloseHandle = () => {
    setModelState({
      ...ModelState,
      state: !ModelState.state,
    });
    if (props.onClose) props.onClose();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ModelState.state}
      statusBarTranslucent={false}
      onRequestClose={() => {
        modalCloseHandle();
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
            Payment Details
          </Label>
          <View style={styles.ModalBody}>
            <View style={styles.mView}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingTop: 15,
                }}>
                <Text style={{color: Colors.DARK_LABEL}}>
                  Enter your topup amount
                </Text>
                <Text style={{color: Colors.DARK_LABEL}}>Min. AED 5</Text>
              </View>
              <View style={styles.main1}>
                <Label
                  notAlign
                  primary
                  font={16}
                  bold2
                  dark
                  style={{
                    width: 50,
                    color: '#000000',
                    top: Platform.OS === 'android' ? 17 : 25,
                  }}>
                  AED
                </Label>
                <TextInput
                  keyboardType={'numeric'}
                  onChangeText={text => settopupammount(text)}
                  value={Topupamount.toString()}
                  defaultValue={Topupamount.toString()}
                  style={styles.marginLarge}
                />
              </View>
            </View>
            <View style={styles.mView}>
              <Label notAlign dark style={styles.titleTxt}>
                Name on Card
              </Label>
              <View style={styles.Main2}>
                <TextInput
                  placeholder="Name on card"
                  placeholderTextColor={Colors.DARK_LABEL}
                  keyboardType={'default'}
                  style={styles.MarginLarge}
                />
              </View>
            </View>
            <View style={styles.mView}>
              <Label notAlign dark style={styles.titleTxt}>
                Card number
              </Label>
              <View style={[styles.Main2, {flexDirection: 'row'}]}>
                <TextInput
                  placeholder="•••• •••• •••• ••••"
                  placeholderTextColor={Colors.DARK_LABEL}
                  keyboardType={'numeric'}
                  maxLength={16}
                  ref={ref_input2}
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
                <Label notAlign dark style={styles.titleTxt}>
                  Expiry date
                </Label>
                <View style={styles.Main1}>
                  <TextInput
                    placeholder="MM/YY "
                    placeholderTextColor={Colors.DARK_LABEL}
                    keyboardType={'numeric'}
                    maxLength={5}
                    onChangeText={text => formatFunction(text)}
                    value={expiryDate}
                    style={styles.MarginLarge}
                  />
                </View>
              </View>
              <View style={[styles.mView, {width: width * 0.4}]}>
                <Label notAlign dark style={styles.titleTxt}>
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
                    Pay AED {Topupamount.toLocaleString()}
                  </Label>
                )}
              </LinearGradient>
            </TouchableOpacity>
            <LabelButton
              primary
              headingtype="h3"
              bold
              style={styles.CloseBtn}
              onPress={() => {
                setModelState({
                  ...ModelState,
                  state: !ModelState.state,
                });
                if (props.BothClose) {
                  navigation.goBack();
                }
                if (props.onClose) props.onClose();
              }}>
              Close
            </LabelButton>
          </View>
        </View>
        <BuyLifeCongrats
          ModalRef={SucessModalState}
          heading={'Congratulations'}
          //description={'Products Bought'}
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
    height: height * 0.8,
    marginTop: height * 0.25,
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
    marginTop: height * 0.03,
  },

  ModalBody: {
    marginTop: height * 0.02,
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

  CloseBtn: {
    marginTop: height * 0.02,
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
  main1: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 0.9,
    borderRadius: 55,
    alignSelf: 'center',
    marginVertical: 6,
    backgroundColor: '#ECF1F9',
    height: height * 0.075,
  },
  marginLarge: {
    width: width * 0.65,
    paddingLeft: width * 0.06,
    fontSize: 19,
    fontWeight: '700',
    color: 'black',
  },
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
  mView: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  MarginLarge: {
    paddingLeft: 15,
    fontSize: RFValue(14),
    color: Colors.DARK_LABEL,
    height: 45,
  },
  MarginLargeNumber: {
    paddingLeft: 15,
    fontSize: RFValue(14),
    color: Colors.DARK_LABEL,
    letterSpacing: 5,
    width: '100%',
    height: 45,
  },
  titleTxt: {
    marginTop: height * 0.01,
  },
});
