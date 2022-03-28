import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import Label from './Label';
import LabelButton from './LabelButton';
import {Colors, Images} from '../Constants/Index';
import LongButton from './LongButton';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import {FormatNumber, GetDate, JSONtoForm} from '../Constants/Functions';
import ProfilePicture from './ProfilePicture';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {heightConverter} from './Helpers/Responsive';
import {RefferalTextInput} from '../Components/index';
import {getLiveShowPlans, GameShowWinners} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import {numericRegex, alphabetRegex} from '../Constants/regex';
import Modals from '../Components/Modals';
import BuyLifeCongrats from './BuyLifeCongrats';
import Clipboard from '@react-native-clipboard/clipboard';
import types from '../redux/types';
import {GameShowWinnersCard} from './GameShowWinnersCard/GameShowWinnersCard';
import dayjs from 'dayjs';
const {width, height} = Dimensions.get('window');

let li = [
  {
    sr: 1,
    status: false,
    status2: false,
  },
];
let reff = [
  {
    name: null,
    phone_no: null,
  },
];

const WinnersModal = props => {
  const ModalState = useRef();
  const ModalStateError = useRef();
  const totalLives = useRef();
  const livePlans = useSelector(state => state.app.livePlans);
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const [selected, setSelected] = useState(0);
  const [id, setId] = useState(0);
  const [validatorIndex, setValidatorIndex] = useState(false);
  //const validatorIndex=[];
  const [updateData, setUpdateData] = useState(false);
  const [refferalLivePlans, setRefferalLivePlans] = useState([]);
  const [totalRef, setTotalRef] = useState([]);

  const [loader, setLoader] = useState(false);

  const ApproveRef = useRef();
  const DeclineRef = useRef();

  const navigation = useNavigation();
  const SucessModalState = useRef();
  const gameShowWinners = useSelector(state => state.app.gameShowWinners);
  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = HandleChange;
  });

  const HandleChange = (state, details = null, ForceSuccess = false) => {
    setModelState({state, details, ForceSuccess});
  };
  useEffect(() => {
    dispatch1(GameShowWinners());
    //   dispatch(getLiveShowPlans);

    let li = [];
    let idforFirst;
    livePlans?.plan?.forEach(element => {
      if (element.type === 'referral') {
        li.push(element);

        if (element.required_referrals === 1) {
          idforFirst = element.id;
        }
      }
    });
    setRefferalLivePlans(li);
    setId(idforFirst);
  }, []);

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

      <LinearGradient
        style={styles.ModalView}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#f8d7e8', '#c7dfe8']}>
        <View style={styles.SmallBorder} />

        <View style={styles.ModalBody}>
          <FlatList
            data={gameShowWinners?.winners}
            style={{width: '100%', paddingHorizontal: 15}}
            scrollEnabled={true}
            contentContainerStyle={{
              width: '100%',
            }}
            // horizontal={true}
            ListHeaderComponent={() => (
              <Text
                style={[
                  styles.text2,
                  {
                    fontSize: RFValue(14),
                    color: '#420E92',
                    textAlign: 'center',
                    width: '100%',
                  },
                ]}>
                Winners
              </Text>
            )}
            renderItem={({item, index}) => {
              return (
                <GameShowWinnersCard
                  name={
                    item?.user?.first_name?.charAt(0)?.toUpperCase() +
                    item?.user?.first_name?.slice(1) +
                    ' ' +
                    item?.user?.last_name?.charAt(0)?.toUpperCase() +
                    item?.user?.last_name?.slice(1)
                  }
                  date={dayjs(item.created_at).format('MMMM DD, YYYY')}
                  ammount={FormatNumber(+item?.price)}
                  profile_image={item?.user?.profile_image}
                />
              );
            }}
          />
        </View>
      </LinearGradient>
    </Modal>
  );
};

export default WinnersModal;

const styles = StyleSheet.create({
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
    marginTop: height * 0.02,
    height: height * 0.6,
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
  textHeading: {
    color: '#6F5F87',
    fontFamily: 'Axiforma-Bold',
    fontSize: RFValue(16),
    textAlign: 'center',
  },
  mainTextHeading: {
    color: '#6F5F87',
    fontFamily: 'Axiforma-Regular',
    fontSize: RFValue(16),
    textAlign: 'center',
    lineHeight: height * 0.03,
  },
  refferBox: {
    width: width * 0.29,
    height: height * 0.12,
    backgroundColor: '#F2EFF5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refferBoxSelected: {
    width: width * 0.29,
    height: height * 0.12,
    backgroundColor: '#F2EFF5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#420E92',
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
  mainView: {
    height: height * 0.7,
    width: width,
    alignItems: 'center',
  },
  avatarViewTop: {
    width: 80,
    height: 80,
  },
  newGameView: {
    marginTop: 10,
    width: width - 25,
    height: height - 600,
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnView: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    width: width - 200,
    height: height - 665,
    justifyContent: 'center',
    borderRadius: 30,
  },
  text: {
    fontFamily: 'Axiforma-Regular',
    color: '#000000',
    fontSize: RFValue(12),
  },
  text2: {
    fontFamily: 'Axiforma-SemiBold',
    color: '#000000',
    fontSize: RFValue(12),
  },
});
