import React, {useState, useEffect, useRef} from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Text,
} from 'react-native';

import Label from './Label';
import LabelButton from './LabelButton';
import {Colors, Images} from '../Constants/Index';
import LongButton from './LongButton';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import {GetDate} from '../Constants/Functions';
import ProfilePicture from './ProfilePicture';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {heightConverter} from './Helpers/Responsive';
import {strings} from '../i18n';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useTranslation} from 'react-i18next';
import AddaccountModal from '../Components/AddaccountModal';
import Modal from 'react-native-modal';
import Modals from './Modals';
import {Picker} from '@react-native-picker/picker';
import Wallet from '../screens/Wallet';
const {width, height} = Dimensions.get('window');

const WithDrawModal = props => {
  const {t, i18n} = useTranslation();
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const ModalErrorState = useRef();
  const a = props.yourBalance - props.ammount;
  const withdrawprocessHandle = () => {
    //alert(a);
    if (a <= 50) {
      alert('Your wallet balance can not be below AED 50');
    } else {
      //alert('sccuess');
      props.onPressWithDrawal(props.accountId);
    }
  };

  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = HandleChange;
  });

  const HandleChange = (state, details = null, ForceSuccess = false) => {
    setModelState({state, details, ForceSuccess});
  };
  //const [props.activeno, setActiveno] = useState('25');
  const tabSwitchHandler = tab => {
    props.setActiveno(tab);
  };
  console.log('props.activeno', props.activeno);
  return (
    <>
      <Modal
        animationType="slide"
        style={{margin: 0}}
        transparent={true}
        avoidKeyboard={true}
        isVisible={ModelState.state}
        statusBarTranslucent={false}
        onRequestClose={() => {
          setModelState({
            ...ModelState,
            state: !ModelState.state,
          });
          if (props.onClose) props.onClose();
        }}>
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
          <KeyboardAwareScrollView keyboardDismissMode="interactive">
            <View
              style={{
                alignItems: 'center',
                height: 40,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#420E92',
                  fontSize: 16.5,
                  fontFamily: 'Axiforma-Bold',
                }}>
                Select your withdrawal amount
              </Text>
            </View>
            <View style={styles.ModalBody}>
              <View style={[styles.tabBtnRow]}>
                <TouchableOpacity
                  disabled={a <= 76 ? true : false}
                  style={[
                    styles.tabBtn,
                    props.activeno === '25' ? styles.tabBtnActive : null,
                  ]}
                  onPress={() => tabSwitchHandler('25')}>
                  <Text style={[styles.tabBtnTxt]}>AED 25</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={a <= 101 ? true : false}
                  style={[
                    styles.tabBtn,
                    props.activeno === '50' ? styles.tabBtnActive : null,
                  ]}
                  onPress={() => tabSwitchHandler('50')}>
                  <Text style={[styles.tabBtnTxt]}>AED 50</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={a <= 152 ? true : false}
                  style={[
                    styles.tabBtn,
                    props.activeno === '100' ? styles.tabBtnActive : null,
                  ]}
                  onPress={() => tabSwitchHandler('100')}>
                  <Text style={[styles.tabBtnTxt]}>AED 100</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.tabBtnRow, {marginTop: -10}]}>
                <TouchableOpacity
                  disabled={a <= 202 ? true : false}
                  style={[
                    styles.tabBtn,
                    props.activeno === '150' ? styles.tabBtnActive : null,
                  ]}
                  onPress={() => tabSwitchHandler('150')}>
                  <Text style={[styles.tabBtnTxt]}>AED 150</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={a <= 252 ? true : false}
                  style={[
                    styles.tabBtn,
                    props.activeno === '200' ? styles.tabBtnActive : null,
                  ]}
                  onPress={() => tabSwitchHandler('200')}>
                  <Text style={[styles.tabBtnTxt]}>AED 200</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  disabled={props?.activity}
                  onPress={() => {
                    withdrawprocessHandle();
                  }}
                  style={{
                    height: 55,
                    width: width * 0.9,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginLeft: width * 0.04,
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      height: 55,
                      width: '100%',
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    colors={['#420E92', '#E7003F']}>
                    {props.activity ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Label primary font={16} bold style={{color: '#ffffff'}}>
                        Request Withdrawal
                      </Label>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  margin: 15,
                  backgroundColor: '#ebe6f0',
                  height: 130,
                  padding: 10,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 16.5,
                    fontWeight: '700',
                    fontFamily: 'Axiforma-Regular',
                  }}>
                  Note:
                </Text>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 15,
                    fontFamily: 'Axiforma-Regular',
                    marginTop: 5,
                    lineHeight: 20,
                  }}>
                  The withdrawal requests will be approved on the 15th and 30th
                  of every month.
                </Text>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 15,
                    fontFamily: 'Axiforma-Regular',
                    marginTop: 5,
                    lineHeight: 20,
                  }}>
                  Contestants can only withdraw a maximum amount of 200 AED.
                </Text>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    </>
  );
};

export default WithDrawModal;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: 'absolute',
    backgroundColor: Colors.BG_MUTED,
  },
  MLarge: {
    width: width * 0.65,
    paddingLeft: width * 0.06,
    color: Colors.DARK_LABEL,
    fontSize: 19,
    fontWeight: '700',
  },
  ModalView: {
    height: height * 0.9,
    marginTop: height * 0.65,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.WHITE,
  },
  SmallBorder: {
    width: width * 0.35,
    height: 4,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  ModalHead: {
    marginTop: height * 0.01,
  },
  tabBtnRow: {
    flexDirection: 'row',
    padding: 8,
  },
  tabBtnCol: {
    width: '70%',
    paddingHorizontal: 4,
  },
  tabBtn: {
    marginTop: 5,
    borderWidth: 2,
    borderColor: '#E6DFEE',
    width: '30%',
    height: 46,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabBtnTxt: {
    color: '#E6DFEE',
    textAlign: 'center',
    fontWeight: '600',
  },
  tabBtnActive: {
    backgroundColor: '#420E92',
  },
  ModalBody: {
    backgroundColor: Colors.WHITE,
    height: height * 0.8,
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

  Main1: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 0.9,
    borderRadius: 55,
    alignSelf: 'center',
    marginTop: height * 0.02,
    backgroundColor: '#ECF1F9',
    height: height * 0.08,
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
  MarginLargeNumber: {
    paddingLeft: width * 0.02,
    fontSize: RFValue(12),
    color: Colors.PRIMARY_LABEL,
    letterSpacing: width * 0.03,
    width: width * 0.2,
  },
  titleTxt: {
    marginTop: height * 0.01,
  },
});
