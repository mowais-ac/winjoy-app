import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../Components/Header';
import {
  ExperienceCard,
  WinExperienceCard,
  FanJoyCard,
  TrendingCards,
  WjBackground,
} from '../../Components';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import Config from 'react-native-config';
import {strings} from '../../i18n';
import {RFValue} from 'react-native-responsive-fontsize';
import {AllCreatorsList} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import types from '../../redux/types';
import ModalCelebrityProducts from '../../Components/ModalCelebrityProducts';
import ExperienceCelebrityModal from '../../Components/ExperienceCelebrityModal';
import NotFoundCart from '../../Components/NotFoundCart';
import Icon from 'react-native-vector-icons/Feather';
import useSelector from '../../reduxToolkit/useSelector';
import {celebsData} from '../../reduxToolkit/actions/celebs.actions';
import { CreatorId } from '../../reduxToolkit/slices/celebsSlice';
const {width, height} = Dimensions.get('window');
const index = ({route, navigation}: any) => {
  const celebrityModalState = useRef();
  const ModalState = useRef();
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const [resData, setResData] = useState([]);
  const [insearchData, setInsearchData] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const allCreatorsList = useSelector(state => state?.celebs?.celebsData);
  // const [experienceId, setExperienceId] = useState();
  useEffect(() => {
    dispatch(celebsData());
    console.log('allCreatorsList', allCreatorsList);
    setResData(allCreatorsList?.data?.data);
    setInsearchData(allCreatorsList?.data?.data);
  }, []);
  const onPressCreator = id => {
    // alert(id)
    dispatch2(CreatorId(id));
    navigation.navigate('CreatorsPage');
  };
  const searchEmployee = value => {
    const filteredContacts = insearchData.filter(item => {
      let contactLowercase = (
        item.first_name +
        ' ' +
        item.last_name
      ).toLowerCase();
      let searchTermLowercase = value.toLowerCase();
      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    setResData(filteredContacts);
  };
  return (
    <SafeAreaView style={styles.safeStyle}>
      <ScrollView>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f8d7e8', '#c7dfe8']}
          style={{height: height}}>
          <WjBackground
            style={{
              height: height * 0.19,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}>
            <View style={{marginTop: width * 0.20, alignItems: 'center'}}>
              <Text style={[styles.headerText]}>Our Creators</Text>
              <Text style={styles.subHeaderText}>Created By Stars</Text>
            </View>
            <View
            style={{
              width: '100%',
              marginTop:-width * 0.09,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingHorizontal: 15,
            }}>
            <TouchableOpacity
              onPress={() => {
                setShowResult(!showResult);
              }}>
              <Icon name="search" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>
          </WjBackground>
          <Header style={{top: 0, position: 'absolute', marginTop: 10}} />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: height * 0.05,
            }}>
            {showResult ? (
              <View
                style={{
                  backgroundColor: '#ffffff',
                  width: '90%',
                  borderRadius: 25,
                }}>
                <TextInput
                  style={{
                    paddingVertical: height * 0.015,
                    paddingLeft: 20,
                    fontFamily: 'Axiforma-Regular',
                    color: '#000000',
                  }}
                  onChangeText={text => searchEmployee(text)}
                  // value={number}
                  placeholder="Search by name"
                  placeholderTextColor={'#420E92'}
                  keyboardType="default"
                />
              </View>
            ) : null}
            <FlatList
              data={resData}
              style={{paddingLeft: 20}}
              numColumns={2}
              // horizontal={true}

              renderItem={({item}) => (
                <FanJoyCard
                  onPress={() => {
                    onPressCreator(item?.id);
                  }}
                  name={item?.first_name + ' ' + item?.last_name}
                  imageUrl={item?.profile_image}
                  fans={item.fans}
                  style={{width: 160, marginRight: 20, height: 180}}
                />
              )}
              //keyExtractor={(e) => e.id.toString()}
              contentContainerStyle={{
                marginTop: 10,
              }}
              ItemSeparatorComponent={() => <View style={{height: 15}} />}
              // refreshControl={
              //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              // }
              keyExtractor={item => item.id}
            />
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
export default index;
