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
const {width, height} = Dimensions.get('window');

const Livepayment = props => {
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
  const tabSwitchHandler = tab => {
    setActiveTab(tab);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.Lpayment_Visible}
      statusBarTranslucent={false}
      onRequestClose={() => {
        props.setLpayment_Visible(false);
      }}>
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback>
          <View style={styles.MainView} />
        </TouchableWithoutFeedback>
        <View style={styles.ModalView}>
          <View style={styles.SmallBorder} />
          <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
            {'Payment Details'}
          </Label>
          <View style={styles.ModalBody}>
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

            {activeTab === 'card' ? (
              <>
                <TouchableOpacity
                  onPress={props.Payment_api2}
                  disabled={activity}
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
                    {props?.loading ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Label primary font={16} bold style={{color: '#ffffff'}}>
                        Pay AED {props?.data?.price}
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
                  }}
                />
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
                    AED {props?.walletamount?.wallet?.your_balance}
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
                    {props?.paymentMethod2 === Deliver
                      ? props?.data?.price + 15
                      : props?.data?.price}
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
                    {props?.paymentMethod2 === Deliver
                      ? props?.data?.price + 15
                      : props?.data?.price}
                  </Text>
                </View>
                <View style={styles.mView}>
                  <TouchableOpacity
                    onPress={
                      props?.walletamount?.wallet?.your_balance >=
                      props?.data?.price
                        ? props.Payment_api
                        : () =>
                            alert(
                              'your balance is not enough to buy this product',
                            )
                    }
                    disabled={activity}
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
                      {props?.loading ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                      ) : (
                        <Label
                          primary
                          font={16}
                          bold
                          style={{color: '#ffffff'}}>
                          Pay AED{' '}
                          {props?.paymentMethod2 === Deliver
                            ? props?.data?.price + 15
                            : props?.data?.price}
                        </Label>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </>
            )}
            <TouchableOpacity
              style={{marginTop: 15}}
              onPress={() => {
                props.setLpayment_Visible(false);
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

        <Modals ModalRef={ModalErrorState} Alert />
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default Livepayment;

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
