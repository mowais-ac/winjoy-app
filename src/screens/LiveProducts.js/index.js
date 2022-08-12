import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import {
  Image,
  Platform,
  Text,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  BackHandler,
  Alert,
  AppState,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import ProfilePicture from '../../Components/ProfilePicture';
import DeviceInfo from 'react-native-device-info';
import Liveerror from '../../Components/Livescomponents/Liveerror';
import {firebase} from '@react-native-firebase/admob';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import {JSONtoForm} from '../../Constants/Functions';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import axios from 'axios';
import NoonBuylives from '../../Components/NoonBuylives';
import {FormatNumber, wait} from '../../Constants/Functions';
import {io} from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../redux/types';
import {useIsFocused} from '@react-navigation/native';
import {GameShowWinners, getLandingScreen} from '../../redux/actions';
import mensuit from '../../assets/imgs/mensuit.jpg';
import bgcart from '../../assets/imgs/bgcart.png';
import Cart_count from '../../Components/Cart_count';
import WinningProduct from '../../Components/Livescomponents/WinningProduct';
const {width, height} = Dimensions.get('window');
import arrow from '../../assets/imgs/r-arrow.png';
import ChatList from '../../Components/Livescomponents/ChatList';
import Chat from '../../Components/Livescomponents/Chat';
import ShippingModal from '../../Components/Livescomponents/ShippingModal';
import UniquenoModal from '../../Components/Livescomponents/UniquenoModal';
import Enterluckydraw from '../../Components/Livescomponents/Enterluckydraw';
import Randomnames from '../../Components/Livescomponents/Randomnames';
import WinnerModal from '../../Components/Livescomponents/WinnerModal';
import Nolives from '../../Components/Livescomponents/Nolives';
import Picknumbers from '../../Components/Livescomponents/Picknumbers';
import Buyliveform from '../../Components/Livescomponents/Buyliveform';
import Redirecting from '../../Components/Livescomponents/Redirecting';
import {Live_Luckydraw} from '../../redux/actions';
import {Winjoy} from '../../redux/Winjoy';
import {useNavigation} from '@react-navigation/native';
const LiveProducts = ({route, navigation}) => {
  const Isfocused = useIsFocused();
  const userData = useSelector(state => state.app.userData);
  const totalLives = useSelector(state => state.app.totalLives);
  const Luckydrawlive = useSelector(state => state.app.postliveluckydraw);
  const [stream, setstream] = useState(true);
  const [checkLive, setChecklive] = useState(true);
  const [joinedUsers, setJoinedUsers] = useState(0);
  const [activityScreen, setActivityScreen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const buildNumber = DeviceInfo.getBuildNumber();
  const [JoinerList, setJoinerList] = useState([]);
  const [no1, setno1] = useState(0);
  const [no2, setno2] = useState(0);
  const [no3, setno3] = useState(0);
  const [no4, setno4] = useState(0);
  const [no5, setno5] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState();
  const [orderinfo, setOrderinfo] = useState([]);
  const [UNM_Visible, setUNM_Visible] = useState(false);
  const [ELD_Visible, setELD_Visible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [WmodalVisible, setWmodalVisible] = useState(false);
  const [NolivemodalVisible, setNolivemodalVisible] = useState(false);
  const [PnmodalVisible, setPnmodalVisible] = useState(false);
  const [BlmodalVisible, setBlmodalVisible] = useState(false);
  const [SmodalVisible, setSmodalVisible] = useState(false);
  const [Itemshow1, setItemshow1] = useState(false);
  const [BuyProduct, setBuyProduct] = useState(false);
  const [Itemshow2, setItemshow2] = useState(true);
  const [EndLuckydraw, setEndLuckydraw] = useState(false);
  const [LE_Visible, setLE_Visible] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('dubai');
  const [defaultAddress, setDefaultAddress] = useState(
    'Floor # 24, Room # 2402, API Wolrd Tower, Sheikh Zayed Road, Dubai',
  );
  const socket = io('https://node-winjoyserver-deploy.herokuapp.com/');
  const dispatch1 = useDispatch();
  const dispatch2 = useDispatch();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch1(getLandingScreen());
    wait(1000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    socket.on('sendCount', msg => {
      setJoinedUsers(msg);
    });
    socket.on('sendProductStartlive', msg => {});
    socket.on('sendShowProductWinner', msg => {
      setWmodalVisible(true);
    });
    socket.on('sendHideProductWinner', msg => {
      setItemshow1(false);
      setWmodalVisible(false);
    });
    socket.on('sendBuyProduct', msg => {
      setBuyProduct(true);
    });
    socket.on('sendEndLuckydraw', msg => {
      setBuyProduct(false);
      setEndLuckydraw(true);
    });
  }, []);
  const GetData = async () => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      console.log(Token);
      const data = {live_luckydraw_id: 1};
      return await Winjoy.post(
        'enter/liveluckydraw',
        {data},
        {
          headers: {
            Authorization: `Bearer ${'4437|Vfslk6akr2M6MbswI2q6IHjaLrBLLFj5mSPtDiuw'}`,
          },
        },
      ).then(res => {
        if (res.data) {
          setUNM_Visible(true);
          console.log('sarwar', res.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const SendOrderId = async () => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      const orderid = await AsyncStorage.getItem('Buylife_noon_orderid1');
      console.log('orderid1', orderid);
      const body = JSONtoForm({
        order_id: orderid,
      });
      const result = await fetch(`${Config.API_URL}/order/pay_now_buy_live`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body,
      });
      const json = await result.json();
      console.log('myresp', json);
      await AsyncStorage.removeItem('Buylife_noon_orderid1');
      if (json.status === 'success') {
        setLE_Visible(false);
        setBlmodalVisible(false);
        setOrderinfo(json);
        setSmodalVisible(true);

        console.log('success', json);
      }
      if (json.status === 'error') {
        setOrderinfo(json);
        setSmodalVisible(true);
        console.log('error', json);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const OrderDetail = async () => {
    const Token = await EncryptedStorage.getItem('Token');
    const body = JSONtoForm({
      product_id: 52,
      shipping_country: 'Pakistan',
      shipping_method: paymentMethod,
      shipping_address: '8th Street',
      num1: no1,
      num2: no2,
      num3: no3,
      num4: no4,
      num5: no5,
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${'4437|Vfslk6akr2M6MbswI2q6IHjaLrBLLFj5mSPtDiuw'}`,
      },
      body,
    };
    await fetch(
      `https://testing.winjoy.ae/public/api/fanjoy/order/create`,
      requestOptions,
    )
      .then(async response => response.json())
      .then(res => {
        setModalVisible(false);
        setELD_Visible(true);
        console.log({joingameshow_res: res});
      })
      .catch(e => {
        console.log(e);
      });
  };
  const JoinUsers = async () => {
    const Token = await EncryptedStorage.getItem('Token');
    const body = JSONtoForm({
      live_luckydraw_id: 1,
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${'4437|Vfslk6akr2M6MbswI2q6IHjaLrBLLFj5mSPtDiuw'}`,
      },
      body,
    };
    await fetch(
      `https://testing.winjoy.ae/public/api/web/liveluckydraw/participants`,
      requestOptions,
    )
      .then(async response => response.json())
      .then(res => {
        setJoinerList(res.participants);
        setELD_Visible(false);
        setItemshow2(false);
        setItemshow1(true);
        console.log({ress: res});
      })
      .catch(e => {
        console.log(e);
      });
  };
  const data = [
    'Abc1',
    'Abc1',
    'Abc1',
    'Abc1',
    'Abc1',
    'Abc1',
    'Abc1',
    'Abc1',
    'Abc1',
    'Abc1',
  ].map(item => ({
    title: item,
  }));
  const orderId = async () => {
    try {
      const orderid = await AsyncStorage.getItem('Buylife_noon_orderid1');
      orderid === null ? console.log('id_is_null') : SendOrderId();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (Isfocused) {
      orderId();
    }
    setChecklive(true);
    //setJoinedUsers(30);
  }, [Isfocused]);
  //console.log(userData);
  return (
    <View style={styles.gradientView}>
      {stream ? (
        <Video
          source={{
            uri: false,
          }}
          hls={true}
          paused={false}
          style={styles.backgroundVideo}
          resizeMode={'cover'}
        />
      ) : (
        <ActivityIndicator
          size="large"
          color={'#fff'}
          style={styles.activity}
        />
      )}
      <View style={styles.livetop}>
        <View style={styles.liveinnerTop}>
          <View style={styles.left_liveinnerTop}>
            <View style={styles.live}>
              <Text style={styles.live_text}>LIVE</Text>
            </View>
            <View style={styles.joins}>
              <Text style={styles.join_text}>{joinedUsers}</Text>
            </View>
          </View>
          {/*  <ImageBackground source={bgcart} style={styles.bg_cart}>
            <Cart_count style={styles.cart} />
          </ImageBackground> */}
        </View>
      </View>
      {checkLive && (
        <LinearGradient
          style={styles.backgroundImage}
          colors={[
            'rgba(128,0,128,0)',
            'rgba(128,0,128,0)',
            '#3D2D56',
            '#3D2D56',
          ]}>
          {Itemshow2 && (
            <Chat
              userInfo={userData}
              onPress={() => {
                totalLives >= 120 ? GetData() : setLE_Visible(true);
              }}
            />
          )}
          {Itemshow1 && <Randomnames data={JoinerList} />}
          {BuyProduct && <WinningProduct />}
          {EndLuckydraw && <Redirecting />}
        </LinearGradient>
      )}
      <ShippingModal
        OrderDetail={() => OrderDetail}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setShippingAddress={setShippingAddress}
      />
      <UniquenoModal
        setModalVisible={setModalVisible}
        setno5={setno5}
        setno4={setno4}
        setno3={setno3}
        setno2={setno2}
        setno1={setno1}
        no5={no5}
        no4={no4}
        no3={no3}
        no2={no2}
        no1={no1}
        UNM_Visible={UNM_Visible}
        setUNM_Visible={setUNM_Visible}
      />
      <Liveerror
        LE_Visible={LE_Visible}
        setLE_Visible={setLE_Visible}
        onPress={() => setBlmodalVisible(true)}
      />
      <Enterluckydraw
        JoinUsers={() => JoinUsers}
        ELD_Visible={ELD_Visible}
        setELD_Visible={setELD_Visible}
      />
      <WinnerModal
        WmodalVisible={WmodalVisible}
        setWmodalVisible={setWmodalVisible}
      />
      <Nolives
        NolivemodalVisible={NolivemodalVisible}
        setNolivemodalVisible={setNolivemodalVisible}
      />
      <Picknumbers
        PnmodalVisible={PnmodalVisible}
        setPnmodalVisible={setPnmodalVisible}
      />
      <Buyliveform
        setBlmodalVisible={setBlmodalVisible}
        BlmodalVisible={BlmodalVisible}
      />
      <NoonBuylives
        SmodalVisible={SmodalVisible}
        setSmodalVisible={setSmodalVisible}
        Data={orderinfo}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundVideo: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
    borderColor: '#ffffff',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  livetop: {marginTop: Platform.OS === 'android' ? 3 : 30},
  liveinnerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '2%',
    marginVertical: '2%',
  },
  joins: {
    flexDirection: 'row',
    minWidth: 50,
  },
  live: {
    borderRadius: 17,
    backgroundColor: '#E7003F',
    height: 20,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  join_text: {fontSize: 16, marginLeft: 2, color: '#E7003F'},
  live_text: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Axiforma',
    lineHeight: 16.5,
  },
  activity: {position: 'absolute', top: 290, left: 0, right: 0},
  left_liveinnerTop: {
    flexDirection: 'row',
    width: '33%',
    justifyContent: 'space-between',
  },
  bg_cart: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cart: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  avatarView: {
    width: 55,
    height: 55,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffffff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
});
export default LiveProducts;
