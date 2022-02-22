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
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Header from '../../Components/Header';
import {
  CreatorExperienceCard,
  FanJoyCard,
  SecondExperienceCard,
  TrendingCards,
  WjBackground,
} from '../../Components';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
import I18n from 'react-native-i18n';
import axios from 'axios';
import Config from 'react-native-config';
import {strings} from '../../i18n';
import {Avatar} from 'react-native-elements';
import ExperienceCelebrityModal from '../../Components/ExperienceCelebrityModal';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {GetCreatorPageData, ExperienceDetals} from '../../redux/actions';
const {width, height} = Dimensions.get('window');
const index = ({route, navigation}) => {
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const ModalState = useRef();
  const celebrity_id = useRef();
  const experience_id = useRef();

  const creatorId = useSelector(state => state.app.creatorId);
  const data = useSelector(state => state.app.creatorPageData);
  const experienceDetail = useSelector(state => state.app.experienceDetail);
  useEffect(() => {
    console.log('creatorId', creatorId);
    dispatch(GetCreatorPageData(creatorId));
  }, []);

  const onPressContinue = () => {
    ModalState.current(false);
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
      <ScrollView>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f8d7e8', '#c7dfe8']}>
          <ImageBackground
            source={require('../../assets/imgs/creatorImage.png')}
            style={styles.mainView}>
            <Header style={{top: 0, position: 'absolute', width: width}} />
            <Text
              style={{
                color: '#ffffff',
                fontSize: RFValue(22),
                fontFamily: 'Axiforma-Bold',
              }}>
              Q/A
            </Text>
            <Text
              style={{
                color: '#ffffff',
                fontSize: RFValue(16),
                fontFamily: 'Axiforma-Regular',
                padding: 25,
                textAlign: 'center',
              }}>
              Record a question and recive a instant reply
            </Text>
          </ImageBackground>
          <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
            <FlatList
              data={[1, 2, 3, 4, 5]}
              numColumns={2}
              //style={{paddingLeft: 8}}
              renderItem={({item}) => (
                <CreatorExperienceCard
                  // onPress={() => navigation.navigate('CreatorExperience')}
                  imageUrl={
                    'https://winjoy-assets.s3.amazonaws.com/experiences/experience-1.jpg'
                  }
                  title={'waqar'}
                  short_desc={'tes tsts ststs stst '}
                />
              )}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              //keyExtractor={(e) => e.id.toString()}
              contentContainerStyle={{}}
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
