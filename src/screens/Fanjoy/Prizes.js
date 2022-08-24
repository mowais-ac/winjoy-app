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
import ShippingModal from '../../Components/Livescomponents/ShippingModal';
import {Fanjoy_dataList} from '../../redux/actions';
import PrizesComp from '../../Components/Comp_fanjoy/PrizesComp';
const {width, height} = Dimensions.get('window');

const Prizes = ({navigation}) => {
  const Fanjoy_datalist = useSelector(state => state.app.Fanjoy_data_list);
  const [Activedata, setActivedata] = useState(0);
  const [Data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    dispatch(Fanjoy_dataList());
  }, []);
  //console.log('fanjoyss', Fanjoy_datalist?.data);

  const list1 = ['abc', 'abc2', 'abc3', 'abc4', 'abc5', 'abc6'];
  return (
    <View style={styles.srollbody}>
      <View style={styles.mainbody}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#420E92', '#E7003F']}>
          <Header style={styles.header} />
          <View style={styles.topbody}>
            <View style={styles.topinnerbody}>
              <Text style={styles.storkepic}>PRIZES</Text>
              <Text style={styles.toptext3}>Every Saturaday at 5 pm</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
      <View style={{height: 50, bottom: 70, marginLeft: 10}}>
        <FlatList
          data={Fanjoy_datalist?.data?.products_list}
          horizontal
          contentContainerStyle={{
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          renderItem={({item}) => (
            <View style={[styles.selectbody, {backgroundColor: 'red'}]}>
              <TouchableOpacity
                onPress={() => setActivedata(item)}
                style={[
                  styles.selectbtn,
                  item.id == Activedata.id
                    ? {backgroundColor: '#E7003F'}
                    : {backgroundColor: '#fff'},
                ]}>
                <Text
                  style={[
                    styles.btntext1,
                    item.id == Activedata.id
                      ? {color: '#fff'}
                      : {color: '#E7003F'},
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
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
        />
      </View>
      <ScrollView>
        <FlatList
          data={Activedata?.products}
          horizontal
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
          }}
          renderItem={({item}) => (
            <View
              style={{width: '50%', paddingHorizontal: 5, paddingVertical: 5}}>
              <PrizesComp
                title={item.title}
                lives={item.lives}
                stock={item.stock}
                u_stock={item.updated_stocks}
                image={item.image}
              />
            </View>
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
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  srollbody: {flex: 1},
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
  selectbody: {
    width: 115,
    height: 41,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectbtn: {
    width: 115,
    height: 41,
    borderRadius: 20,
    borderColor: '#E7003F',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntext1: {
    fontFamily: 'Axiforma',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 16,
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
    height: 100,
    alignItems: 'center',
  },
  toptext1: {
    color: '#D9FE51',
    fontWeight: 'bold',
    fontSize: 24,
  },
  toptext2: {color: '#fff', fontWeight: 'bold', fontSize: 26},
  toptext3: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    marginTop: 5,
    fontFamily: 'Axiforma',
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
    textShadowColor: '#E7003F',
    textShadowOffset: {width: 0, height: 0},
    color: '#D9FE51',
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
export default Prizes;
