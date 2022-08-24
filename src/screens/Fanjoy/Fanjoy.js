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
import car from '../../assets/imgs/f_car.png';
import {useDispatch, useSelector} from 'react-redux';
import {FormatNumber, wait} from '../../Constants/Functions';
import LinearGradient from 'react-native-linear-gradient';
import CountDown from 'react-native-countdown-component';
import Causes from '../../Components/Fanjoy_comp/Causes';
import Vacation from '../../Components/Fanjoy_comp/Vacation';
import Collabs from '../../Components/Fanjoy_comp/Collabs';
import {Fanjoyalldata, Slug_Details} from '../../redux/actions';
import GoldenTulip from './GoldenTulip';
import dayjs from 'dayjs';
import moment from 'moment';
import UniquenoModal from '../../Components/Livescomponents/UniquenoModal';
import ShippingModal from '../../Components/Livescomponents/ShippingModal';
import Enterluckydraw from '../../Components/Livescomponents/Enterluckydraw';
const {width, height} = Dimensions.get('window');

const Fanjoy = ({navigation}) => {
  const Fanjoy_data = useSelector(state => state.app.fanjoyalldata);
  const [Data, setData] = useState(null);
  const [slug, setSlug] = useState(null);
  const [UNM_Visible, setUNM_Visible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('dubai');
  const [no1, setno1] = useState(0);
  const [no2, setno2] = useState(0);
  const [no3, setno3] = useState(0);
  const [no4, setno4] = useState(0);
  const [no5, setno5] = useState(0);
  const [id, setId] = useState(0);
  const [loader, setLoader] = useState(false);
  const [ELD_Visible, setELD_Visible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);
  const [time, setTime] = useState(() => {
    dispatch(Fanjoyalldata());
    var CurrentDate = new Date();
    var duration = dayjs(Fanjoy_data?.data.luckydraw_upcoming).diff(
      dayjs(CurrentDate.toLocaleString()),
      'seconds',
    );
    return parseInt(duration);
  });
  useEffect(() => {
    dispatch(Fanjoyalldata());
    var CurrentDate = new Date();
    var duration = dayjs(Fanjoy_data?.data.luckydraw_upcoming).diff(
      dayjs(CurrentDate.toLocaleString()),
      'seconds',
    );
    setTime(parseInt(duration));
  }, []);
  var dateToFormat = Fanjoy_data?.data.luckydraw_upcoming; //TIMESTAMP
  const date = moment(dateToFormat).format('DD MMM YYYY');

  const list1 = ['abc', 'abc2', 'abc3', 'abc4', 'abc5', 'abc6'];
  return (
    <ScrollView style={styles.srollbody}>
      <View style={styles.mainbody}>
        <ImageBackground resizeMode="cover" source={car} style={styles.bgimg}>
          <Header style={styles.header} />
          <View style={styles.topbody}>
            <View style={styles.topinnerbody}>
              <Text style={styles.toptext1}>Fanjoy</Text>
              <Text style={styles.toptext2}>
                WIN <Text style={styles.storkepic}>EPIC</Text> PRIZES
              </Text>
              <Text style={styles.toptext3}>Every Saturaday at 5 pm</Text>
            </View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#420E92', '#E7003F']}
              style={styles.topbtn}>
              <TouchableOpacity>
                <Text style={styles.btntext}>Enter Now</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.timerbody}>
        <View style={styles.timerinnerbody}>
          <View>
            <Text style={styles.timmertext1}>Next Lucky Draw</Text>
            <Text style={styles.timmertext2}>{date}</Text>
          </View>
          <CountDown
            until={time}
            size={16}
            //onFinish={() => alert('Finished')}
            digitStyle={styles.digit}
            digitTxtStyle={styles.timmertext}
            timeLabels={false}
            timeLabelStyle={{color: '#000', marginTop: -20}}
            timeLabels={{m: 'min', s: 'sec', h: 'hrs', d: 'days'}}
          />
        </View>
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
          Win prizes and support <Text style={styles.GC}>GREAT CAUSES</Text>
        </Text>
        <TouchableOpacity>
          <Text style={styles.viewbtn}>View All</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: 10,
        }}>
        <FlatList
          data={Fanjoy_data?.data?.allProducts}
          horizontal={true}
          renderItem={({item}) => (
            <Causes
              onpress={async () => {
                await dispatch1(Slug_Details(item?.product_slug));
                navigation?.navigate('GoldenTulip');
                setId(item.product_id);
              }}
              title={item.title}
              lives={item.lives}
              stock={item.stock}
              u_stock={item.updated_stocks}
              image={item.image}
              date={item.luckydraw.conduct_date}
            />
          )}
          keyExtractor={item => item}
          ListEmptyComponent={() => (
            <Text
              style={{
                color: '#000000',
                textAlign: 'center',
              }}>
              The list is empty
            </Text>
          )}
          contentContainerStyle={{
            paddingVertical: 5,
          }}
        />
      </View>

      <View style={styles.causetextbody}>
        <Text style={styles.causestext1}>WHAT WOULD YOU LIKE TO WIN?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Prizes')}>
          <Text style={styles.viewbtn}>View All</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: 10,
        }}>
        <FlatList
          data={Fanjoy_data?.data?.product_categories}
          horizontal={true}
          renderItem={({item}) => <Vacation title={item.name} />}
          keyExtractor={item => item}
          ListEmptyComponent={() => (
            <Text
              style={{
                color: '#000000',
                textAlign: 'center',
              }}>
              The list is empty
            </Text>
          )}
          contentContainerStyle={{
            paddingVertical: 5,
          }}
        />
      </View>
      <Text style={styles.outtext1}>
        Unforgettable vacations and staycations, amazing experiences, and prizes
        to fit your lifestyle!
      </Text>
      <View style={styles.causetextbody}>
        <Text style={styles.causestext1}>
          SEE OUR <Text style={styles.storkcollab}>COLLABS</Text>
        </Text>
        <TouchableOpacity>
          <Text style={styles.viewbtn}>View All</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: 10,
        }}>
        <FlatList
          data={list1}
          horizontal={true}
          renderItem={({item}) => <Collabs />}
          keyExtractor={item => item}
          ListEmptyComponent={() => (
            <Text
              style={{
                color: '#000000',
                textAlign: 'center',
              }}>
              The list is empty
            </Text>
          )}
          contentContainerStyle={{
            paddingVertical: 5,
          }}
        />
      </View>
      <Text style={styles.outtext2}>Win your favourite brand's products</Text>
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
    fontWeight: 'bold',
    fontSize: 24,
  },
  toptext2: {color: '#fff', fontWeight: 'bold', fontSize: 26},
  toptext3: {color: '#fff', fontWeight: 'bold', fontSize: 17},
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
    marginTop: -10,
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
  storkepic: {
    textShadowColor: '#fff',
    textShadowOffset: {width: 0, height: 0},
    color: '#E7003F',
    fontSize: 26,
    textShadowRadius: 5.5,
    fontFamily: 'Axiforma-Regular',
    fontWeight: '700',
  },
  storkcollab: {
    textShadowColor: '#420E92',
    textShadowOffset: {width: 0, height: 0},
    color: '#fff',
    fontSize: 15,
    textShadowRadius: 5.5,
    fontFamily: 'Axiforma-Regular',
    fontWeight: '700',
  },
  GC: {
    textShadowColor: '#420E92',
    textShadowOffset: {width: 0, height: 0},
    color: '#fff',
    fontSize: 15,
    textShadowRadius: 5.5,
    fontFamily: 'Axiforma-Regular',
    fontWeight: '700',
  },
  outtext1: {
    color: '#000000',
    fontFamily: 'Axiforma',
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 8,
  },
  outtext2: {
    color: '#000000',
    fontFamily: 'Axiforma',
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 8,
  },
});
export default Fanjoy;
