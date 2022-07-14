import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundRound from '../../Components/BackgroundRound';
import Header from '../../Components/Header';
import Label from '../../Components/Label';
import LongButton from '../../Components/LongButton';
import {WalletBlanceCard, WalletLastPlayedCard} from '../../Components';
import ProfilePicture from '../../Components/ProfilePicture';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import {useTranslation} from 'react-i18next';
//import TopupModal from '../../Components/TopupModal';
import {FormatNumber, wait} from '../../Constants/Functions';
import TopupPaymentModals from '../../TopupPaymentModals';
import dayjs from 'dayjs';
//I18n.locale = "ar";
import axios from 'axios';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../../Components/Helpers/Responsive';
const {width, height} = Dimensions.get('window');
//import { getWalletData } from '../../redux/actions/Wallet';
import {useDispatch, useSelector} from 'react-redux';
import {getWalletData} from '../../redux/actions';
import Cart from '../../screens/Cart/index';
import WithDrawModal from '../../Components/WithDrawModal';
import SuccessModal from '../../Components/SuccessModal';
import {JSONtoForm} from '../../Constants/Functions';
import Modals from '../../Components/Modals';
import {Picker} from '@react-native-picker/picker';
import socketIO from 'socket.io-client';
import AddaccountModal from '../../Components/AddaccountModal';
const MYServer = 'https://node-winjoyserver-deploy.herokuapp.com/';
const index = ({props, navigation}) => {
  const socket = socketIO(MYServer);
  const {t} = useTranslation();
  const LandingData = useSelector(state => state.app.LandingData);
  const userData = useSelector(state => state.app.userData);
  const walletData = useSelector(state => state.app.walletData);
  const [activeno, setActiveno] = useState('25');
  const [ammount, setAmmount] = useState('10');
  const [messageError, setmessageError] = useState('error occurs');
  const [refreshing, setRefreshing] = React.useState(false);
  const [productData, setProductData] = useState([]);
  const ModalStateTopup = useRef();
  const ModalState = useRef();
  const ModalState2 = useRef();
  const ModalErrorState = useRef();
  const [headerValue, setHeaderValue] = useState(0);
  const [activity, setActivity] = useState(false);
  const accountmodal = useRef();
  const dispatch = useDispatch();
  const Combined_closed = () => {
    ModalState2.current(false);
    accountmodal.current(false);
    onRefresh();
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getWalletData());
    wait(500).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    dispatch(getWalletData());
    socket.on('sendOnboarding', msg => {
      console.log('Should navigate from product details');
      NavigateToQuiz(true);
    });
  }, []);

  const NavigateToQuiz = fromSocket => {
    if (
      LandingData?.gameShow?.status === 'on_boarding' ||
      LandingData?.gameShow?.status === 'started' ||
      fromSocket
    ) {
      {
        console.log(
          'LandingData?.gameShow?.status pd',
          LandingData?.gameShow?.status,
        );
      }
      navigation.navigate('GameStack', {
        screen: 'Quiz',
        params: {
          uri: LandingData?.gameShow?.live_stream?.key,
          gameshowStatus: LandingData?.gameShow?.status,
        },
      });
    }
  };
  const HandleWithdraw = async accountId => {
    setActivity(true);
    // console.log('account id', accountId);
    if (!activeno) {
    } else {
      const Token = await EncryptedStorage.getItem('Token');
      const body = JSONtoForm({
        w_amount: activeno,
        account_id: accountId,
      });

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body,
      };
      await fetch(`${Config.API_URL}/withdrawal`, requestOptions)
        .then(async response => response.json())
        .then(async res => {
          setActivity(false);
          console.log('wallet_res', res);
          setmessageError(res.message);
          if (res.status === 'error') {
            accountmodal.current(false);
            ModalErrorState.current(true);
          } else {
            accountmodal.current(false);
            dispatch(getWalletData());
            ModalState.current(false);
            ModalStateTopup.current(false);
            ModalState2.current(true);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const onPressRequestWithdrawal = accountId => {
    HandleWithdraw(accountId);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#420E92'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{backgroundColor: '#f6f1f3'}}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#420E92', '#E7003F']}
          style={styles.lineargradient}>
          <Header />
          {/*  <View style={styles.info_mainView}>
            <View style={styles.avatarView}>
              <ProfilePicture
                picture={userData?.profile_image}
                id={userData?.id}
                name={
                  userData?.first_name.slice(0, 1) +
                  userData?.last_name.slice(0, 1)
                }
                style={styles.avatarView}
                font={28}
              />
            </View>
            <View
              style={{
                width: widthConverter(250),
                marginLeft: widthConverter(8),
              }}>
              <Text style={styles.userName}>
                {userData?.first_name?.charAt(0)?.toUpperCase() +
                  userData?.first_name?.slice(1)}{' '}
                {userData?.last_name?.charAt(0)?.toUpperCase() +
                  userData?.last_name?.slice(1)}
              </Text>
            </View>
          </View> */}
          <View style={{alignItems: 'center', marginVertical: 20}}>
            <Text
              style={{
                color: '#D9FE51',
                fontFamily: 'Axiforma-SemiBold',
                fontSize: 23,
              }}>
              Wallet
            </Text>
          </View>
        </LinearGradient>

        <WalletBlanceCard
          yourBalance={
            walletData?.wallet?.your_balance === null
              ? 0
              : walletData?.wallet?.your_balance
          }
          onPressaccountdetails={() => accountmodal.current(true)}
          //onPressWithdraw={() => ModalState.current(true)}
          onPressTopup={() => ModalStateTopup.current(true)}
        />
        <WalletLastPlayedCard
          onPress={() => navigation.navigate('WINNERS')}
          noOfQuestions={10}
          wonPrize={
            walletData?.wallet?.won_prize === null
              ? 0
              : walletData?.wallet?.won_prize
          }
        />
        <View style={styles.mainView}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#E7003F',
                lineHeight: 30,
                fontFamily: 'Axiforma-Regular',
                fontSize: 15.5,
              }}>
              {t('last_five_transcation')}
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={walletData?.transaction}
              ListEmptyComponent={() => (
                <View>
                  <Text style={styles.text_trasactions}>No Transactions</Text>
                </View>
              )}
              ItemSeparatorComponent={() => {
                return <View style={styles.text_separator} />;
              }}
              renderItem={({item, i}) => {
                return (
                  <View key={i} style={styles.listView}>
                    <View style={{alignSelf: 'center'}}>
                      <Image
                        style={styles.tinyLogo}
                        source={require('../../assets/imgs/lpgame.png')}
                      />
                    </View>

                    <View
                      style={{
                        marginLeft: 18,
                      }}>
                      <Text style={styles.text}>AED {item?.amount}</Text>
                      <Text style={styles.text2}>
                        {dayjs(item.transaction_date).format('DD MMM, YYYY')}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>

        <AddaccountModal
          ModalRef={accountmodal}
          details
          onPressWithDrawal={accountId => onPressRequestWithdrawal(accountId)}
          yourBalance={
            walletData?.wallet?.your_balance === null
              ? 0
              : walletData?.wallet?.your_balance
          }
          AmmountHandleChange={text => setAmmount(text)}
          ammount={ammount}
          activity={activity}
          activeno={activeno}
          setActiveno={setActiveno}
        />

        <TopupPaymentModals ModalRef={ModalStateTopup} />

        {/* <WithDrawModal
          ModalRef={ModalState}
          details
          onPressWithDrawal={() => onPress()}
          yourBalance={
            walletData?.wallet?.your_balance === null
              ? 0
              : walletData?.wallet?.your_balance
          }
          // AmmountHandleChange={text => setAmmount(text)}
          // ammount={ammount}
          activity={activity}
        /> */}
        <Modals ModalRef={ModalErrorState} message_error={messageError} Alert />
        <SuccessModal
          ModalRef={ModalState2}
          details
          requestOnPress={() => ModalState2.current(false)}
          closeOnPress={() => Combined_closed()}
          ammount={activeno}
          yourBalance={
            walletData?.wallet?.your_balance === null
              ? 0
              : walletData?.wallet?.your_balance
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Margin: {
    height: height * 0.06,
    width: width * 0.4,
    backgroundColor: '#ffffff',
  },
  listView: {
    flexDirection: 'row',
    height: 40,

    //width: widthConverter(100),
    marginTop: 5,
    alignItems: 'center',
  },
  info_mainView: {
    flexDirection: 'row',
    width: widthConverter(420),
    marginLeft: 25,
    marginVertical: 10,
    alignItems: 'center',
  },
  mainView: {
    flex: 1,
    width: 'auto',
    paddingVertical: 10,
    marginVertical: 5.5,
    backgroundColor: '#ffffff',
    marginHorizontal: 14,
    borderRadius: 10,
    paddingHorizontal: 20,
    elevation: 3,
  },
  text_separator: {
    marginTop: 5,
    height: 1,
    width: '100%',
    backgroundColor: '#dedae9',
  },
  text_trasactions: {
    marginTop: 15,
    color: '#000000',
    fontFamily: 'Axiforma-Regular',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userName: {
    color: '#FFFFFF',
    fontFamily: 'Axiforma-Bold',
    fontSize: 15,
  },
  lineargradient: {
    height: 'auto',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  avatarView: {
    width: widthConverter(70),
    height: widthConverter(70),
    borderRadius: heightConverter(130),
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffffff',
    elevation: 3,
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
  aView: {
    alignItems: 'center',
    width: widthConverter('100%'),
    marginTop: 20,
  },
  tinyLogo: {
    width: 40,
    height: 30,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Axiforma-SemiBold',
    color: '#000000',
    fontSize: 14,
    lineHeight: 25,
  },
  text2: {
    fontFamily: 'Axiforma-Light',
    color: '#627482',
    fontSize: 14,
    //lineHeight: 25,
  },
});

export default index;
