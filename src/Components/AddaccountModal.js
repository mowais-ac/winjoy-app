import React, {useState, useEffect, useRef} from 'react';
import {
  RefreshControl,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  alert,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Text,
  Keyboard,
  Platform,
} from 'react-native';
import Label from './Label';
import LabelButton from './LabelButton';
import {Colors, Images} from '../Constants/Index';
//import LongButton from '../LongButton';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
//import {GetDate, JSONtoForm} from '../Constants/Functions';
import ProfilePicture from './ProfilePicture';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {heightConverter} from './Helpers/Responsive';
import {useTranslation} from 'react-i18next';
import BuyLifeCongrats from './BuyLifeCongrats';
import Modals from './Modals';
import WithDrawModal from '../Components/WithDrawModal';
import SuccessModal from '../Components/SuccessModal';
import axios from 'axios';
import {FormatNumber, wait} from '../Constants/Functions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {width, height} = Dimensions.get('window');
import Modal from 'react-native-modal';

const AddaccountModal = props => {
  const [Topupamount, settopupammount] = useState('10');
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const ModalState = useRef();
  const ModalState2 = useRef();
  //console.log('IDlist', accountsList);
  const [title, settitle] = useState();
  const [account_no, setaccount_no] = useState();
  const [iban, setiban] = useState();
  const [bankName, setBankName] = useState();
  const [paypal_id, setPaypalId] = useState();
  const [activity, setActivity] = useState(false);
  const [activeTab, setActiveTab] = useState('bank');
  const [activeList, setActiveList] = useState('Bank Al Habib');
  const [accountsList, setAccountsList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [deleteProcess, setDeleteProcess] = useState(false);
  const [accountAddFormVisibility, setAccountAddFormVisibility] =
    useState(false);

  const [listloading, setlistloading] = useState(false);
  const ApproveRef = useRef();
  const DeclineRef = useRef();
  const SucessModalState = useRef();
  const ModalErrorState = useRef();
  const navigation = useNavigation();
  const {t} = useTranslation();
  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = HandleChange;
  });

  const HandleChange = (state, details = null, ForceSuccess = false) => {
    setModelState({state, details, ForceSuccess});
  };

  /*  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    ModalState.current(true);
    wait(2000).then(() => setRefreshing(false));
  }, []); */

  const Postaddaccount = async () => {
    if (!activeTab) {
      ModalErrorState.current(true, {
        heading: 'Error',
        Error: 'Enter account type',
      });
    } else {
      setActivity(true);
      const Token = await EncryptedStorage.getItem('Token');

      let data = '';
      if (activeTab === 'bank') {
        data = {
          type: activeTab,
          title: title,
          account_no: account_no,
          iban: iban,
          bank_name: bankName,
        };
      } else {
        console.log('pi: ', paypal_id);
        data = {
          type: activeTab,
          paypal_id: paypal_id,
        };
      }

      console.log('reques:: ', data);
      const headers = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      };
      axios
        .post(`${Config.API_URL}/add/account`, data, headers)
        .then(res => {
          setActivity(true);
          console.log('res::', res);

          setActivity(false);
          if (res.data.status === 'success') {
            setSelectedAccount(res.data.id);
            // onRefresh();
            ModalState.current(true);
            loadAccountsList();
          } else {
            ModalErrorState.current(true, {
              heading: 'Error',
              Error: res?.error,
            });
            setActivity(false);
          }
        })
        .catch(err => {
          setActivity(false);
          console.log(err);
        });
    }
  };

  const loadAccountsList = async () => {
    setlistloading(true);
    const Token = await EncryptedStorage.getItem('Token');
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    };
    await fetch(`${Config.API_URL}/user/account/detail`, requestOptions)
      .then(async response => response.json())
      .then(async res => {
        const accountsData = res.data.account_detail;
        setAccountsList(accountsData);

        setlistloading(true);
      });
  };

  const deleteAccouhtHandle = async accountId => {
    setDeleteProcess(true);
    const Token = await EncryptedStorage.getItem('Token');
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    };
    await fetch(
      `${Config.API_URL}/user/account/detail/${accountId}`,
      requestOptions,
    )
      .then(async response => response.json())
      .then(async res => {
        loadAccountsList();
        setDeleteProcess(false);
      });
  };

  const modalCloseHandle = () => {
    setModelState({
      ...ModelState,
      state: !ModelState.state,
    });
    setAccountAddFormVisibility(false);
    if (props.onClose) props.onClose();
  };

  useEffect(() => {
    loadAccountsList();
  }, []);

  const tabSwitchHandler = tab => {
    setActiveTab(tab);
  };
  const accountSelectHandle = accountId => {
    setSelectedAccount(accountId);
  };
  const onAddAccountHandle = () => {
    setAccountAddFormVisibility(true);
  };
  return (
    <Modal
      animationType="slide"
      style={{margin: 0}}
      avoidKeyboard={true}
      isVisible={ModelState.state}
      statusBarTranslucent={false}
      onRequestClose={() => {
        modalCloseHandle();
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setModelState({
            ...ModelState,
            state: !ModelState.state,
          });
          setAccountAddFormVisibility(false);
          if (props.onClose) props.onClose();
        }}>
        <View style={styles.MainView} />
      </TouchableWithoutFeedback>

      <View style={styles.ModalView}>
        <View style={styles.SmallBorder} />
        <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
          Choose / add cccount details
        </Label>
        <View style={styles.ModalBody}>
          <ScrollView>
            {!accountAddFormVisibility ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      color: Colors.DARK_LABEL,
                      fontWeight: '600',
                      fontSize: 18,
                    }}>
                    Select an account
                  </Text>
                  <TouchableOpacity
                    style={{}}
                    onPress={() => onAddAccountHandle()}>
                    <Text
                      style={{
                        color: '#420E92',
                        fontSize: 14,
                        fontWeight: '600',
                      }}>
                      Add Account
                    </Text>
                  </TouchableOpacity>
                </View>

                {accountsList && accountsList.length ? (
                  <>
                    {accountsList.map(account => {
                      return (
                        <View style={[styles.accountRow]}>
                          <TouchableOpacity
                            onPress={() => {
                              accountSelectHandle(account.id);
                              ModalState.current(true);
                            }}
                            style={[
                              styles.accountBox,
                              selectedAccount === account.id
                                ? styles.selectedAccountBox
                                : null,
                            ]}>
                            <Text style={[styles.bankName]}>
                              {account.type === 'paypal'
                                ? 'Paypal'
                                : 'Bank: ' + account.bank_name}
                            </Text>
                            <Text style={[styles.accountNo]}>
                              {account.type === 'paypal'
                                ? account.paypal_id
                                : 'Account no.:' + account.account_no}
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={[styles.deleteBtn]}
                            onPress={() => deleteAccouhtHandle(account.id)}>
                            {!deleteProcess ? (
                              <Text style={[styles.deleteBtnTxt]}>Delete</Text>
                            ) : (
                              <ActivityIndicator size="small" color="red" />
                            )}
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </>
                ) : (
                  <View
                    style={{
                      flexDirection: 'column',
                      textAlign: 'center',
                      justifyContent: 'center',
                      paddingTop: 30,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: '600',
                        color: Colors.DARK_LABEL,
                        marginBottom: 10,
                      }}>
                      No account found
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: '100%',
                      }}>
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          borderColor: Colors.DARK_LABEL,
                          borderRadius: 100,
                          width: 120,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: 10,
                          paddingVertical: 7,
                        }}
                        onPress={() => onAddAccountHandle()}>
                        <Text
                          style={{
                            color: Colors.DARK_LABEL,
                            fontWeight: '600',
                          }}>
                          Add Account
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </>
            ) : (
              <>
                <View style={[styles.tabBtnRow]}>
                  <View style={[styles.tabBtnCol]}>
                    <TouchableOpacity
                      style={[
                        styles.tabBtn,
                        styles.tabBtn1,
                        activeTab === 'bank' ? styles.tabBtnActive : null,
                      ]}
                      onPress={() => tabSwitchHandler('bank')}>
                      <Text style={[styles.tabBtnTxt]}>Bank Account</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.tabBtnCol]}>
                    <TouchableOpacity
                      style={[
                        styles.tabBtn,
                        styles.tabBtn2,
                        activeTab === 'paypal' ? styles.tabBtnActive : null,
                      ]}
                      onPress={() => tabSwitchHandler('paypal')}>
                      <Text style={[styles.tabBtnTxt]}>Paypal</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {activeTab === 'bank' ? (
                  <>
                    <View style={styles.mView}>
                      <Label notAlign dark style={styles.titleTxt}>
                        Bank name
                      </Label>
                      <View style={styles.Main2}>
                        <TextInput
                          keyboardType={'default'}
                          placeholder=""
                          placeholderTextColor={Colors.DARK_LABEL}
                          onChangeText={text => setBankName(text)}
                          style={styles.MarginLarge}
                        />
                      </View>
                    </View>
                    <View style={styles.mView}>
                      <Label notAlign dark style={styles.titleTxt}>
                        Account title:
                      </Label>
                      <View style={styles.Main2}>
                        <TextInput
                          keyboardType={'default'}
                          placeholder="John Doe"
                          placeholderTextColor={Colors.DARK_LABEL}
                          onChangeText={text => settitle(text)}
                          style={styles.MarginLarge}
                        />
                      </View>
                    </View>

                    <View style={styles.mView}>
                      <Label notAlign dark style={styles.titleTxt}>
                        Account number / IBAN
                      </Label>
                      <View style={[styles.Main2, {flexDirection: 'row'}]}>
                        <TextInput
                          placeholder="0123456789"
                          placeholderTextColor={Colors.DARK_LABEL}
                          keyboardType={'numeric'}
                          maxLength={20}
                          //onSubmitEditing={() => ref_input3.current.focus()}
                          ref={ref_input2}
                          // onBlur={onBlur}
                          onChangeText={text => {
                            setaccount_no(text);
                          }}
                          style={styles.MarginLargeNumber}
                        />
                      </View>
                    </View>
                  </>
                ) : (
                  <View style={styles.mView}>
                    <Label notAlign dark style={styles.titleTxt}>
                      Paypal Id
                    </Label>
                    <View style={styles.Main2}>
                      <TextInput
                        keyboardType={'default'}
                        placeholder=""
                        placeholderTextColor={Colors.DARK_LABEL}
                        onChangeText={text => setPaypalId(text)}
                        style={styles.MarginLarge}
                      />
                    </View>
                  </View>
                )}

                <TouchableOpacity
                  disabled={activity}
                  onPress={() => {
                    Postaddaccount();
                  }}
                  style={{
                    width: width * 0.9,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 15,
                    marginLeft: width * 0.04,
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
                      <Label primary font={16} bold style={{color: '#ffffff'}}>
                        Save
                      </Label>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%',
                    marginTop: 4,
                    padding: 8,
                  }}
                  onPress={() => setAccountAddFormVisibility(false)}>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: Colors.DARK_LABEL,
                      fontSize: 15,
                    }}>
                    Back to list
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <WithDrawModal
              ModalRef={ModalState}
              details
              onPressWithDrawal={props.onPressWithDrawal}
              yourBalance={props.yourBalance}
              AmmountHandleChange={props.AmmountHandleChange}
              ammount={props.ammount}
              activity={props.activity}
              accountId={selectedAccount}
            />

            {/*  <LabelButton
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
              </LabelButton> */}
          </ScrollView>
        </View>
      </View>
      <BuyLifeCongrats
        ModalRef={SucessModalState}
        heading={'Congratulations'}
        description={'Your Account Details has been added'}
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
    </Modal>
  );
};

export default AddaccountModal;

const styles = StyleSheet.create({
  accountRow: {
    marginHorizontal: 8,
    marginBottom: 6,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E6DFEE',
    borderRadius: 8,
    // display: 'flex',
    // flexDirection: 'row',
  },
  deleteBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 12,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnTxt: {
    color: 'red',
  },
  accountBox: {
    marginBottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  selectedAccountBox: {
    backgroundColor: '#E6DFEE',
    borderRadius: 6,
  },
  bankName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.DARK_LABEL,
  },
  accountNo: {
    color: Colors.DARK_LABEL,
  },
  accountTitle: {},
  tabBtnRow: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-around',
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
  tabBtnTxt: {
    color: '#420E92',
    textAlign: 'center',
    fontWeight: '600',
  },
  tabBtnActive: {
    backgroundColor: '#E6DFEE',
  },
  MainView: {
    height: height,
    width: width,
    position: 'absolute',
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height * 0.65,
    marginTop: height * 0.32,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.BENEFICIARY,
  },
  M1: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 0.9,
    borderRadius: 55,
    alignSelf: 'center',
    marginTop: height * 0.02,
    backgroundColor: '#ECF1F9',
    height: height * 0.08,
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
    height: height * 0.9,
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
    width: width * 0.45,
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
    marginTop: 3,
    borderWidth: 1,
    borderColor: Colors.DARK_LABEL,
  },
  mView: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  MLarge: {
    width: width * 0.65,
    paddingLeft: width * 0.06,
    fontSize: RFValue(14),
    color: Colors.DARK_LABEL,
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
    width: '100%',
  },
  titleTxt: {
    marginTop: height * 0.01,
  },
  container: {
    flex: 1,
    display: 'flex',
  },
});
