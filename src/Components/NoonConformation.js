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
import BuyLifeCongrats from './BuyLifeCongrats';
import Modals from './Modals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import types from '../redux/types';
import {useDispatch} from 'react-redux';
import {AppEventsLogger, Settings} from 'react-native-fbsdk-next';
const {width, height} = Dimensions.get('window');

const NoonConformation = props => {
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
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
  const PostCreditCardInfo = async () => {
    setActivity(true);
    const Token = await EncryptedStorage.getItem('Token');
    const data = {
      is_wallet: is_wallet,
      orderId: props.Orderid,
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
    console.log('paymentbodyC', requestOptions);
    await fetch(`${Config.API_URL}/order/paynow`, requestOptions)
      .then(async response => response.json())
      .then(async res => {
        setActivity(false);
        try {
          console.log('productsresC', res);
          if (res.status === 'success') {
            dispatch({
              type: types.CART_COUNTER,
              counter: '',
            });
            // SucessModalState.current(true);
          }
        } catch (error) {
          {
            console.log(error);
          }
        }
      });
  };

  /*  useEffect(() => {
     
  }, []); */
  const HandleChange = (state, details = null, ForceSuccess = false) => {
    setModelState({state, details, ForceSuccess});
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
            PLease conform us
          </Label>
          <View style={styles.ModalBody}>
            <TouchableOpacity onPress={() => PostCreditCardInfo()}>
              <Text>conformation plz</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modals ModalRef={ModalErrorState} Alert />
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default NoonConformation;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: 'absolute',
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height * 0.82,
    marginTop: height * 0.2,
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
    height: height * 0.72,
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
