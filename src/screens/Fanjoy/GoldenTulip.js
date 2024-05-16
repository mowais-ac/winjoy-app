import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  Text,
  ImageBackground,
  Platform,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import counts from '../../assets/imgs/counts.png';
import tropy from '../../assets/imgs/tropyyy.png';
import hand_btn from '../../assets/imgs/handbtn.png';
import Background from '../../Components/Background';
import p_btn from '../../assets/imgs/pl_btn.png';
import SafeArea from '../../Components/SafeArea';
import Label from '../../Components/Label';
import Header from '../../Components/Header';
import {Colors, Images} from '../../Constants/Index';
import Section from '../../Components/Section';
import UserInfo from '../../Components/UserInfo';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import car from '../../assets/imgs/room.png';
import {FormatNumber, wait, JSONtoForm} from '../../Constants/Functions';
import LinearGradient from 'react-native-linear-gradient';
import CountDown from 'react-native-countdown-component';
import Causes from '../../Components/Fanjoy_comp/Causes';
import Vacation from '../../Components/Fanjoy_comp/Vacation';
import Collabs from '../../Components/Fanjoy_comp/Collabs';
import palm from '../../../src/assets/imgs/palm_tree.png';
import rashid from '../../../src/assets/imgs/rashid_img.png';
import {Slug_Details} from '../../redux/actions';
import UniquenoModal from '../../Components/Livescomponents/UniquenoModal';
import ShippingModal from '../../Components/Livescomponents/ShippingModal';
import Enterluckydraw from '../../Components/Livescomponents/Enterluckydraw';
const {width, height} = Dimensions.get('window');

const GoldenTulip = ({navigation, slug, route, props}) => {
  const SlugDetails = useSelector(state => state.app.slugDetails);
  const totalLives = useSelector(state => state.app.totalLives);
  const [UNM_Visible, setUNM_Visible] = useState(false);
  const [ELD_Visible, setELD_Visible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('dubai');
  const [JoinerList, setJoinerList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [no1, setno1] = useState(0);
  const [no2, setno2] = useState(0);
  const [no3, setno3] = useState(0);
  const [no4, setno4] = useState(0);
  const [no5, setno5] = useState(0);
  const [id, setId] = useState(0);
  const [Data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch1 = useDispatch();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);
  const OrderDetail = async () => {
    setLoader(true);
    const Token = await EncryptedStorage.getItem('Token');
    const body = JSONtoForm({
      product_id: SlugDetails?.data?.product?.product_id,
      shipping_country: shippingAddress,
      shipping_method: paymentMethod,
      shipping_address: '8th Street',
      num1: no1,
      num2: no2,
      num3: no3,
      num4: no4,
      num5: no5,
    });
    console.log('mybody', body);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
      body,
    };
    await fetch(`${Config.API_URL}/fanjoy/order/create`, requestOptions)
      .then(async response => response.json())
      .then(res => {
        setLoader(false);
        setModalVisible(false);
        setELD_Visible(true);
        console.log({joingameshow_res: res});
      })
      .catch(e => {
        setLoader(false);
        console.log(e);
      });
  };
  const JoinUsers = async () => {
    setLoader(true);
    const Token = await EncryptedStorage.getItem('Token');
    const body = JSONtoForm({
      live_luckydraw_id: Homedetails?.live_luckydraw?.id,
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

    await fetch(
      `${Config.API_URL}/web/liveluckydraw/participants`,
      requestOptions,
    )
      .then(async response => response.json())
      .then(res => {
        if (res.status === 'success') {
          setLoader(false);
          setJoinerList(res.participants);
          setELD_Visible(false);
          setItemshow2(false);
          setItemshow1(true);
        }
      })
      .catch(e => {
        setLoader(false);
        console.log(e);
      });
  };
  //console.log('s', SlugDetails?.data);
  const list1 = ['abc', 'abc2', 'abc3', 'abc4', 'abc5', 'abc6'];
  return (
    <ScrollView style={styles.srollbody}>
      <View style={styles.mainbody}>
        <ImageBackground
          resizeMode="cover"
          source={{uri: SlugDetails?.data?.product?.image}}
          style={styles.bgimg}>
          <Header style={styles.header} />
          <View style={styles.topbody}>
            <View style={styles.topinnerbody}>
              <Text style={styles.toptext1}>
                {SlugDetails?.data?.product?.title}
              </Text>
              <Text style={styles.toptext3}>
                {SlugDetails?.data?.product?.description}
              </Text>
            </View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#420E92', '#E7003F']}
              style={styles.topbtn}>
              <TouchableOpacity
                onPress={
                  totalLives >= 120
                    ? () => setUNM_Visible(true)
                    : () =>
                        alert('not enough lives to buy this product        ')
                }>
                <Text style={styles.btntext}>Enter Now</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.playbtnbody}>
        <View style={styles.playbtninner}>
          <ImageBackground
            resizeMode="contain"
            source={p_btn}
            style={{
              width: 14,
              height: 14,
            }}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.playtext}>How it works</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.d_body}>
        <View style={styles.d_inner}>
          <View style={styles.d_innertop}>
            <Image resizeMode="center" source={hand_btn} style={styles.d_img} />
          </View>
          <Text style={styles.d_innertext}>Pick a prize</Text>
        </View>
        <View style={styles.d_inner}>
          <View style={styles.d_innertop}>
            <Image resizeMode="center" source={counts} style={styles.d_img} />
          </View>
          <Text style={styles.d_innertext}>Choose numbers</Text>
        </View>

        <View style={styles.d_inner}>
          <View style={styles.d_innertop}>
            <Image resizeMode="center" source={tropy} style={styles.d_img} />
          </View>
          <Text style={styles.d_innertext}>Win the prize</Text>
        </View>
      </View>
      <View style={styles.causetextbody}>
        <Text style={styles.causestext1}>
          Win prizes and support{' '}
          <Text
            style={{
              textShadowColor: '#420E92',
              textShadowOffset: {width: 0, height: 0},
              color: '#fff',
              fontSize: 15,
              textShadowRadius: 5.5,
              fontFamily: 'Axiforma-Regular',
              fontWeight: '700',
            }}>
            GREAT CAUSES
          </Text>
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 7,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: 140,
          //backgroundColor: 'red',
        }}>
        <Image
          resizeMode="contain"
          source={palm}
          style={{width: 170, height: 200}}
        />
        <Image
          resizeMode="contain"
          source={rashid}
          style={{width: 170, height: 200}}
        />
      </View>
      <View style={styles.causetextbody}>
        <Text style={styles.causestext1}>What's included?</Text>
      </View>
      <View
        style={{
          marginHorizontal: 10,
        }}>
        <Text style={styles.contexttest}>
          <View style={styles.circle} />
          Pool and facities access for one or two people.
        </Text>
        <Text style={styles.contexttest}>
          <View style={styles.circle} /> Choose to gain access for one day or
          one month
        </Text>
        <Text style={styles.contexttest}>
          <View style={styles.circle} />
          Customers can vists at 8 am and stay until 6pm
        </Text>
        <Text style={styles.contexttest}>
          <View style={styles.circle} />
          Facities includes: pool access | sauna | shower
        </Text>
      </View>
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
      <ShippingModal
        loading={loader}
        OrderDetail={() => OrderDetail}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setShippingAddress={setShippingAddress}
      />
      <Enterluckydraw
        loading={loader}
        JoinUsers={() => JoinUsers}
        ELD_Visible={ELD_Visible}
        setELD_Visible={setELD_Visible}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  srollbody: {flex: 1, width: '100%'},
  mainbody: {height: 270, width: '100%'},
  bgimg: {
    height: '100%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },
  header: {
    top: Platform.OS === 'android' ? 0 : height * 0.03,
  },
  topbody: {
    height: 170,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  topinnerbody: {
    flexDirection: 'column',
    width: '100%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  toptext1: {
    color: '#D9FE51',

    //color: 'transparent',
    fontWeight: 'bold',
    fontSize: 22,
    textShadowColor: '#D9FE51',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5.5,
    fontFamily: 'Axiforma-Regular',
  },
  toptext2: {color: '#fff', fontWeight: 'bold', fontSize: 26},
  toptext3: {color: '#fff', fontWeight: 'bold', fontSize: 17},
  circle: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: '#420E92',
  },
  contexttest: {
    color: '#000',
    fontFamily: 'Axiforma-Regular',
    fontSize: 15,
    marginTop: 10,
    paddingLeft: 4,
    // textAlign: 'justify',
  },
  topbtn: {
    height: 46,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  btntext: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 19,
    lineHeight: 20,
  },
  timerbody: {
    width: '95%',
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    top: -25,
    marginHorizontal: 10,
  },
  timerinnerbody: {
    flexDirection: 'row',
    width: '95%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timmertext1: {color: '#E7003F', fontWeight: '600', fontSize: 15},
  timmertext2: {color: '#000', fontWeight: '700', fontSize: 15},
  digit: {
    backgroundColor: '#FFF',
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#000',
  },
  timmertext: {
    color: '#000',
    marginTop: -8,
  },
  playbtnbody: {
    flexDirection: 'row',
    width: '38%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginTop: 10,
  },
  playbtninner: {
    backgroundColor: '#420E92',
    width: 30,
    height: 30,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playtext: {
    color: '#420E92',
    fontWeight: '700',
    fontSize: 17,
    fontFamily: 'Axiforma-Regular',
  },
  d_body: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  d_inner: {
    borderWidth: 0.7,
    borderColor: '#000',
    width: 110,
    height: 80,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 50,
  },
  d_img: {width: 40, height: 40},
  d_innertop: {
    backgroundColor: '#E7003F',
    width: 95,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -45,
  },
  d_innertext: {
    color: '#E7003F',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Axiforma',
    height: 40,
    textAlign: 'center',
  },

  causetextbody: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
  },
  causestext1: {color: '#420E92', fontSize: 15.5, fontWeight: '700'},
  viewbtn: {color: '#E7003F', fontSize: 16, fontWeight: '600'},
});
export default GoldenTulip;
