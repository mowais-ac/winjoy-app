import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Background from '../../Components/Background';
import SafeArea from '../../Components/SafeArea';
import Label from '../../Components/Label';
import Header from '../../Components/Header';

import {Colors} from '../../Constants/Index';
import Section from '../../Components/Section';
import UserInfo from '../../Components/UserInfo';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import NotFoundCart from '../../Components/NotFoundCart';
import {FormatNumber, wait} from '../../Constants/Functions';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightConverter,
  widthConverter,
  widthPercentageToDP,
} from '../../Components/Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import LongButton from '../../Components/LongButton';
import PaymentModals from '../../Components/PaymentModals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modals from '../../Components/Modals';
import BuyLifeCongrats from '../../Components/BuyLifeCongrats';
import {GetCartData, RemoveCartData} from '../../redux/actions';
const {width, height} = Dimensions.get('window');
import {useDispatch, useSelector} from 'react-redux';
import types from '../../redux/types';
import NotFoundNotification from '../../Components/NotFoundNotification';

const index = ({navigation}) => {
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const dispatch3 = useDispatch();
  const ModalState = useRef();
  const SucessModalState = useRef();
  const ModalStateError = useRef();
  const [Data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activity, setActivity] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [listloader, setListloader] = useState(false);
  const [id, setId] = useState(null);
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const cartData = useSelector(state => state.app.cartData);
  const removeCartData = useSelector(state => state.app.removeCartData);
  const loading = useSelector(state => state.event.loading);
  const counterMain = useSelector(state => state.app.counter);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(500).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={{height: height}}>
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
        <View style={{alignItems: 'center'}}>
          <Text style={[styles.headerText, {marginVertical: 20}]}>
            Notifications
          </Text>
        </View>
      </LinearGradient>
      <NotFoundNotification />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.18,
  },
  card2Wrap: {
    bottom: 10,
    left: 0,
    position: 'absolute',
    paddingHorizontal: 10,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    marginTop: height * 0.03,
    marginLeft: width * 0.034,
  },
  Section: {
    marginTop: height * 0.01,
    height: height * 0.12,
    justifyContent: 'center',
  },
  SectionView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 12,
  },
  ImageView: {
    width: width * 0.22,
    height: height * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  Image: {
    width: 80,
    height: 65,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  TextView: {
    marginLeft: width * 0.052,
  },
  LessMargin: {
    marginTop: height * 0.003,
    color: 'red',
  },
  card2: {
    width: width - 25,
    paddingBottom: heightConverter(65),
    backgroundColor: '#ffffff',
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    left: 2,
    alignItems: 'center',
    elevation: 3,
    position: 'absolute',
    paddingTop: 13,
    marginVertical: 30,
  },
  metaText: {
    color: '#000000',
    fontFamily: 'Axiforma-Regular',
    paddingVertical: 1.5,
  },
  text: {
    color: '#e7003f',
    fontFamily: 'Axiforma-Regular',
  },
  ///modal styles

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  MarginLarge: {
    paddingLeft: width * 0.09,
    fontSize: RFValue(12),
    color: Colors.WHITE,
  },
  headerText: {
    color: '#ffffff',
    fontFamily: 'Axiforma-SemiBold',
    fontSize: RFValue(22),
  },
});
export default index;
