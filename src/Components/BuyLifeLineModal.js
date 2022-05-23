import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  TextInput,
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
import {useSelector, useDispatch} from 'react-redux';
import types from '../redux/types';
const {width, height} = Dimensions.get('window');
const BuyLifeLineModal = props => {
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = HandleChange;
  });
  const getData = async () => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      const result = await fetch(
        `${Config.API_URL}/buy_lives_plan/${props.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      const json = await result.json();
      dispatch({
        type: types.TOTAL_LIVES,
        totalLives: json?.lives,
      });
      alert(json.message);
    } catch (error) {}
  };
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

        <Text
          style={[
            styles.text,
            {textAlign: 'center', marginTop: height * 0.03, width: width},
          ]}>
          Buy Lives
        </Text>

        <View style={styles.ModalBody}>
          <Text style={styles.descriptionText}>
            Pay AED 30 to buy 10 life lines, once you are done with the payment,
            you will be able to avail life lines in our gameshow.
          </Text>
          <View style={[styles.SmallBorder, {width: width * 0.1, height: 2}]} />
          <Text
            style={[
              styles.text,
              {
                textAlign: 'center',
                marginTop: height * 0.03,
                width: width * 0.93,
                fontSize: RFValue(16),
              },
            ]}>
            AED {props.amount}
          </Text>
          <Text style={styles.descriptionText}>Buy {props.lives} lives</Text>
          <TouchableOpacity
            onPress={() => {
              getData();
            }}
            style={{
              height: heightConverter(20),
              width: width * 0.9,

              justifyContent: 'center',
              alignItems: 'center',
              marginTop: height * 0.06,
              marginLeft: width * 0.014,
            }}>
            <View
              style={{
                height: heightConverter(60),
                width: width * 0.9,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#420e92',
                borderRadius: 40,
              }}>
              <Label primary font={16} bold style={{color: '#ffffff'}}>
                Pay Now
              </Label>
            </View>
          </TouchableOpacity>
          <LabelButton
            primary
            headingtype="h3"
            bold
            style={[styles.CloseBtn, {color: '#6F5F87', fontSize: RFValue(14)}]}
            onPress={() => {
              setModelState({
                ...ModelState,
                state: !ModelState.state,
              });
            }}>
            Not Now
          </LabelButton>
        </View>
      </View>
    </Modal>
  );
};

export default BuyLifeLineModal;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: 'absolute',
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height * 0.5,
    marginTop: height * 0.5,
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

  ModalBody: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: height * 0.02,
    backgroundColor: Colors.WHITE,
    height: height * 0.3,
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
    paddingLeft: width * 0.06,
    fontSize: RFValue(12),
    color: Colors.PRIMARY_LABEL,
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
  text: {
    color: '#420E92',
    fontFamily: 'Axiforma-Bold',
    fontSize: RFValue(14),
  },
  descriptionText: {
    color: '#000000',
    fontFamily: 'Axiforma-Regular',
    fontSize: RFValue(13),
    textAlign: 'center',
    lineHeight: height * 0.03,
  },
});
