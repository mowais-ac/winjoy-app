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

import WithDrawModal from '../../Components/WithDrawModal';
import SuccessModal from '../../Components/SuccessModal';
import {JSONtoForm} from '../../Constants/Functions';
import Modals from '../../Components/Modals';
import PaymentModalExperience from '../../Components/PaymentModalExperience';
const index = ({props, navigation}) => {
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [productData, setProductData] = useState([]);
  const [ammount, setAmmount] = useState(null);
  const userData = useSelector(state => state.app.userData);
  const walletData = useSelector(state => state.app.walletData);
  const dispatch = useDispatch();
  const ModalStateTopup = useRef();
  const ModalState = useRef();
  const ModalState2 = useRef();
  const ModalStateError = useRef();
  const [headerValue, setHeaderValue] = useState(0);
  const [activity, setActivity] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    dispatch(getWalletData());

    wait(500).then(() => setRefreshing(false));
  }, []);
  //console.log({walletData: walletData?.transaction});
  useEffect(() => {
    dispatch(getWalletData());
  }, []);
  const HandleWithdraw = async () => {
    setActivity(true);
    if (!ammount) {
      // alert('hiii');
    } else {
      const Token = await EncryptedStorage.getItem('Token');
      const body = JSONtoForm({
        w_amount: ammount,
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
          if (res.status === 'error') {
            ModalStateError.current(true, {
              heading: 'Error',
              Error: res.message,
              array: res.errors ? Object.values(res.errors) : [],
            });
          } else {
            ModalState.current(false);
            ModalStateTopup.current(false);
            ModalState2.current(true);
          }
          setActivity(false);
        })
        .catch(e => {});
    }
  };

  const onPress = () => {
    HandleWithdraw();
  };

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#420E92', '#E7003F']}
          style={{
            height: 'auto',
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}>
          <Header />
          <View
            style={{
              flexDirection: 'row',
              width: widthConverter(420),
              marginLeft: 25,
              marginVertical: 10,
              alignItems: 'center',
            }}>
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
              <Text
                style={{
                  color: '#FFFFFF',

                  fontFamily: 'Axiforma-Bold',
                  fontSize: 15,
                }}>
                {userData?.first_name?.charAt(0)?.toUpperCase() +
                  userData?.first_name?.slice(1)}{' '}
                {userData?.last_name?.charAt(0)?.toUpperCase() +
                  userData?.last_name?.slice(1)}
              </Text>
            </View>
          </View>
        </LinearGradient>

        <WalletBlanceCard
          yourBalance={
            walletData?.wallet?.your_balance?.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ',',
            ) === null
              ? 0
              : walletData?.wallet?.your_balance?.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ',',
                )
          }
          onPressWithdraw={() => ModalState.current(true)}
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

        <View
          style={{
            flex: 1,
            width: width - 25,
            marginTop: 5,
            backgroundColor: '#ffffff',
            margin: 10,
            borderRadius: 10,
            padding: 5,
            alignItems: 'center',
            elevation: 3,
          }}>
          <View style={{marginLeft: 30}}>
            <Label notAlign primary font={14} bold style={{color: '#E7003F'}}>
              {t('last_five_transcation')}
            </Label>
            <FlatList
              data={walletData?.transaction}
              ListEmptyComponent={() => (
                <View>
                  <Text
                    style={{
                      marginTop: 15,
                      color: '#000000',
                      fontFamily: 'Axiforma-Regular',
                      fontSize: 13,
                    }}>
                    No Transactions
                  </Text>
                </View>
              )}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{
                      marginTop: 5,
                      height: 1,
                      width: '92%',
                      backgroundColor: '#dedae9',
                    }}
                  />
                );
              }}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: widthConverter(300),
                      marginTop: 7,
                    }}>
                    <View style={{marginTop: 10}}>
                      <Image
                        style={styles.tinyLogo}
                        source={require('../../assets/imgs/lpgame.png')}
                      />
                    </View>
                    <View
                      style={{
                        width: widthConverter(200),
                        marginLeft: 15,
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

        <TopupPaymentModals ModalRef={ModalStateTopup} />

        <WithDrawModal
          ModalRef={ModalState}
          details
          onPressWithDrawal={() => onPress()}
          yourBalance={
            walletData?.wallet?.your_balance === null
              ? 0
              : walletData?.wallet?.your_balance
          }
          AmmountHandleChange={text => setAmmount(text)}
          ammount={ammount}
          activity={activity}
        />
        <SuccessModal
          ModalRef={ModalState2}
          details
          requestOnPress={() => ModalState2.current(false)}
          closeOnPress={() => ModalState2.current(false)}
          yourBalance={
            walletData?.wallet?.your_balance === null
              ? 0
              : walletData?.wallet?.your_balance
          }
        />
        <Modals ModalRef={ModalStateError} Error />
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
  avatarView: {
    //position: 'absolute',

    width: widthConverter(70),
    height: widthConverter(70),
    borderRadius: heightConverter(130),
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000',
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
    width: 30,
    height: 20,
  },
  text: {
    fontFamily: 'Axiforma-SemiBold',
    color: '#000000',
    fontSize: 14,
  },
  text2: {
    fontFamily: 'Axiforma-Light',
    color: '#627482',
    fontSize: 14,
  },
});

export default index;
