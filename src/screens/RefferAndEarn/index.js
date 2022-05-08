import React, {useState, useEffect, useRef} from 'react';
import {
  Share,
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../Components/Header';
import {
  LifeCard,
  LifeCardRefferAndVideo,
  RewardzButton,
  WjBackground,
  RefferalTextInputForScreen,
} from '../../Components';
import {firebase, dynamicLinks} from '@react-native-firebase/dynamic-links';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
import I18n from 'react-native-i18n';
import axios from 'axios';
import {heightConverter} from '../../Components/Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import RefferLifeLineModal from '../../Components/RefferLifeLineModal';
import {getLiveShowPlans} from '../../redux/actions';
import Label from '../../Components/Label';
import LabelButton from '../../Components/LabelButton';
import {Colors, Images} from '../Constants/Index';
import {numericRegex, alphabetRegex} from '../../Constants/regex';
import Modals from '../../Components/Modals';
import BuyLifeCongrats from '../../Components/BuyLifeCongrats';
import Clipboard from '@react-native-clipboard/clipboard';
import Config from 'react-native-config';
import types from '../../redux/types';
import {NavigationHelpersContext} from '@react-navigation/native';

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
    countrycode: null,
    phone_no: null,
  },
];
const index = ({route, navigation}) => {
  const livePlans = useSelector(state => state.app.livePlans);
  const RefferModalState = useRef();
  const SucessModalState = useRef();
  const ModalStateError = useRef();
  const [selected, setSelected] = useState(0);
  const [validatorIndex, setValidatorIndex] = useState(false);
  //const validatorIndex=[];
  const [updateData, setUpdateData] = useState(false);
  const [refferalLivePlans, setRefferalLivePlans] = useState([]);
  const [totalRef, setTotalRef] = useState([]);
  const totalLives = useRef();
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState(0);
  const [Link, setLink] = useState('');
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const [DL, setDL] = useState('');
  const [CountryCode, setCountryCode] = useState(+971);
  const loading = useSelector(state => state.app.loading);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  useEffect(() => {
    dispatch(getLiveShowPlans());
  }, [dispatch]);

  //console.log('livePlans', livePlans?.refer_code);

  useEffect(() => {
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
    buildLink();
    setRefferalLivePlans(li);
    setId(idforFirst);
  }, [livePlans]);
  //Share dynamic Link
  const buildLink = async () => {
    const link = await firebase.dynamicLinks().buildLink({
      //link: `https://winjoy.ae?referral=WINJOY-534274796`,
      link: 'https://winjoy.ae',
      domainUriPrefix: 'https://winjoyae.page.link/7Yoh',
      analytics: {
        campaign: 'refferal link',
        content: 'Click Me',
      },
      /*  social: {
        title: 'Winjoy',
        descriptionText: 'Reffer a friends and family to win prizes',
        imageUrl:
          'https://lh3.googleusercontent.com/geougc/AF1QipMMFxFa5U5IOkxLkFJEYtiXZPwOOkArwEHiF_4x=w573-h573-p-no',
      }, */
      android: {
        packageName: 'com.winjoy',
        minimumVersion: '35',
      },
    });

    setLink(link);
    console.log('buildLink', link);
    return link;
  };
  /* const copyToClipboard = () => {
    Clipboard.setString(
      `https://winjoy.ae/invite/token?${livePlans?.refer_code}`,
    );
  }; */

  //Share btn
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Refferal link',
        message: Link,
        url: Link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const onPressRefTab = (index, item) => {
    li = [];
    reff = [];
    setTotalRef(item.required_referrals);
    setSelected(index);
    setId(item.id);
    for (var i = 0; i < item?.required_referrals; ++i) {
      li.push({
        sr: i + 1,
        status: false,
        status2: false,
      });
      reff.push({
        name: null,
        phone_no: null,
      });
    }
  };
  const SettingName = (name, index) => {
    reff[index].name = name;
  };
  const SettingNumber = (number, index) => {
    reff[index].phone_no = number;
  };
  const SettingCountryCode = (text, index) => {
    reff[index].countrycode = text;

    setUpdateData(!updateData);
  };

  const HandleClick = async () => {
    let validToPost = true;
    var postData = '';
    reff?.forEach((element, index) => {
      if (
        element.name !== '' &&
        element.name !== null &&
        element.name !== undefined &&
        alphabetRegex.test(element?.name)
      ) {
        li[index].status = false;
      } else {
        li[index].status = true;
      }
      if (
        element.phone_no !== '' &&
        element.phone_no !== null &&
        element.phone_no !== undefined
      ) {
        li[index].status2 = false;
      } else {
        li[index].status2 = true;
      }
    });
    li?.forEach(element => {
      if (element.status === true) {
        validToPost = false;
      }
      if (element.status2 === true) {
        validToPost = false;
      }
    });
    setUpdateData(!updateData);
    let fData = [];
    reff.forEach((element, index) => {
      fData.push({
        name: element.name,
        phone_no:
          (element?.countrycode ? element?.countrycode : 971) +
          element.phone_no,
      });
    });

    if (validToPost) {
      postData = {
        referrals: fData,
      };

      PostData(postData);
    }
  };
  const PostData = async postData => {
    setLoader(true);
    var Token = await EncryptedStorage.getItem('Token');
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify(postData),
    };
    await fetch(`${Config.API_URL}/buy_lives_plan/${id}`, requestOptions)
      .then(response => response.json())
      .then(async res => {
        setLoader(false);
        if (res.status === 'success') {
          dispatch(getLiveShowPlans());
          totalLives.current = res?.lives;
          dispatch2({
            type: types.TOTAL_LIVES,
            totalLives: res?.lives,
          });
          SucessModalState.current(true);
        } else {
          ModalStateError.current(true, {
            heading: 'Error',
            Error: res.message,
            // array: res.errors ? Object.values(res.errors) : [],
          });
        }
      })
      .catch(e => {
        setLoader(false);
      });
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
      <ScrollView>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f8d7e8', '#c7dfe8']}
          style={{paddingBottom: 60}}>
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
            <View style={{marginVertical: 20, alignItems: 'center'}}>
              <Text style={[styles.headerText]}>Refer & Earn Lives</Text>
              <Text style={styles.subHeaderText}>
                Stay in the game even with the wrong answer!
              </Text>
            </View>
          </LinearGradient>

          <View
            style={{
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <ImageBackground
                resizeMode="center"
                style={{
                  width: 90,
                  height: 90,
                  // marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                source={require('../../assets/imgs/life.png')}>
                <Text
                  style={{
                    color: '#E7003F',
                    fontFamily: 'Axiforma-SemiBold',
                    fontSize: RFValue(20),
                  }}>
                  {livePlans?.total_lives === null ? 0 : livePlans?.total_lives}
                </Text>
              </ImageBackground>
              <Text style={[styles.text, {textAlign: 'left'}]}>
                Lifelines are available to avail
              </Text>
            </View>
            <View
              style={{
                width: width * 0.15,
                height: 2,
                backgroundColor: '#ffffff',
              }}
            />

            <View
              style={{
                marginTop: height * 0.03,
                width: width,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: width, justifyContent: 'center'}}>
                <View style={styles.SmallBorder} />

                <Text
                  style={[styles.text, {textAlign: 'center', width: width}]}>
                  Refer To Earn Lives
                </Text>

                <View style={{alignItems: 'center', marginTop: 10}}>
                  <View
                    style={{
                      width: width * 0.93,
                      height: height * 0.075,
                      backgroundColor: '#F2EFF5',
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: height * 0.03,
                      flexDirection: 'row',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.mainTextHeading,
                        {
                          color: '#000000',
                          width: width * 0.68,
                          textAlign: 'left',
                        },
                      ]}>
                      https:/ /winjoy.ae/invite/token?aaasd
                    </Text>
                    <TouchableOpacity onPress={onShare}>
                      <View
                        style={{
                          width: width * 0.2,
                          height: height * 0.06,
                          backgroundColor: '#fff',
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#420E92',
                            fontFamily: 'Axiforma-Bold',
                          }}>
                          Share
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    horizontal={true}
                    contentContainerStyle={{
                      height: height * 0.14,
                      marginLeft: 11,
                    }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={refferalLivePlans}
                    renderItem={({item, index}) =>
                      item?.type === 'referral' ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: width * 0.32,
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              onPressRefTab(index, item);
                            }}>
                            <View
                              style={
                                selected === index
                                  ? styles.refferBoxSelected
                                  : styles.refferBox
                              }>
                              <Text
                                style={[
                                  styles.mainTextHeading,
                                  {
                                    color:
                                      selected === index
                                        ? '#420E92'
                                        : '#6F5F87',
                                  },
                                ]}>
                                {item?.title?.split(' ')[0] +
                                  ' ' +
                                  item?.title?.split(' ')[1]}
                              </Text>
                              <Text
                                style={[
                                  styles.textHeading,
                                  {
                                    color:
                                      selected === index
                                        ? '#420E92'
                                        : '#6F5F87',
                                  },
                                ]}>
                                {item?.title?.split(' ')[2] +
                                  ' ' +
                                  item?.title?.split(' ')[3]}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : null
                    }
                    keyExtractor={item => item.id}
                  />
                </View>
                <View
                  style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}>
                  {selected === 0 ? (
                    <FlatList
                      style={{width: '100%'}}
                      scrollEnabled={false}
                      data={li}
                      extraData={updateData}
                      renderItem={({item, index}) => (
                        <RefferalTextInputForScreen
                          srNumber={item.sr}
                          validationBorderName={item.status}
                          validationBorderNumber={item.status2}
                          CountryCode={text => SettingCountryCode(text, index)}
                          code={
                            reff[index]?.countrycode
                              ? reff[index].countrycode
                              : 971
                          }
                          onChangeName={name => {
                            if (!name) {
                              SettingName(name, index);
                            } else {
                              SettingName(name, index);
                            }
                          }}
                          onChangeNumber={number => {
                            if (!number) {
                              SettingNumber(number, index);
                            } else {
                              SettingNumber(number, index);
                            }
                          }}
                        />
                      )}

                      //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
                    />
                  ) : null}
                  {selected === 1 ? (
                    <FlatList
                      style={{width: '100%'}}
                      contentContainerStyle={{}}
                      scrollEnabled={false}
                      data={li}
                      extraData={updateData}
                      renderItem={({item, index}) => (
                        <RefferalTextInputForScreen
                          srNumber={item.sr}
                          validationBorderName={item.status}
                          validationBorderNumber={item.status2}
                          CountryCode={text => SettingCountryCode(text, index)}
                          code={
                            reff[index]?.countrycode
                              ? reff[index].countrycode
                              : 971
                          }
                          onChangeName={name => {
                            if (!name) {
                              SettingName(name, index);
                            } else {
                              SettingName(name, index);
                            }
                          }}
                          onChangeNumber={number => {
                            if (!number) {
                              SettingNumber(number, index);
                            } else {
                              SettingNumber(number, index);
                            }
                          }}
                        />
                      )}

                      //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
                    />
                  ) : null}
                  {selected === 2 ? (
                    <FlatList
                      style={{width: '100%'}}
                      contentContainerStyle={{}}
                      data={li}
                      extraData={updateData}
                      scrollEnabled={false}
                      renderItem={({item, index}) => (
                        <RefferalTextInputForScreen
                          srNumber={item.sr}
                          validationBorderName={item.status}
                          validationBorderNumber={item.status2}
                          CountryCode={text => SettingCountryCode(text, index)}
                          code={
                            reff[index]?.countrycode
                              ? reff[index].countrycode
                              : 971
                          }
                          onChangeName={name => {
                            if (!name) {
                              SettingName(name, index);
                            } else {
                              SettingName(name, index);
                            }
                          }}
                          onChangeNumber={number => {
                            if (!number) {
                              SettingNumber(number, index);
                            } else {
                              SettingNumber(number, index);
                            }
                          }}
                        />
                      )}

                      //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
                    />
                  ) : null}
                </View>

                <View
                  style={{
                    width: '100%',
                    height: height * 0.15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      HandleClick();
                    }}
                    disabled={loader}
                    style={{
                      height: heightConverter(20),
                      width: width * 0.9,

                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: height * 0.03,
                    }}>
                    <View
                      style={{
                        height: heightConverter(60),
                        width: width * 0.9,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#420e92',
                        borderRadius: 40,
                      }}>
                      {loader ? (
                        <ActivityIndicator size="large" color={'#ffffff'} />
                      ) : selected === 0 ? (
                        <Label
                          primary
                          font={16}
                          bold
                          style={{color: '#ffffff'}}>
                          Refer 1 Friends
                        </Label>
                      ) : selected === 1 ? (
                        <Label
                          primary
                          font={16}
                          bold
                          style={{color: '#ffffff'}}>
                          Refer {totalRef} Friends
                        </Label>
                      ) : selected === 2 ? (
                        <Label
                          primary
                          font={16}
                          bold
                          style={{color: '#ffffff'}}>
                          Refer {totalRef} Friends
                        </Label>
                      ) : null}
                    </View>
                  </TouchableOpacity>

                  <Modals ModalRef={ModalStateError} Error />
                  <BuyLifeCongrats
                    ModalRef={SucessModalState}
                    heading={'Congratulations'}
                    description={
                      totalLives.current +
                      ' lives are ready to use. Feel free to play more games & win amazin prizes.'
                    }
                    requestOnPress={() => {
                      SucessModalState.current(false);
                    }}
                    closeOnPress={() => {
                      SucessModalState.current(false);
                      setModelState({
                        ...ModelState,
                        state: !ModelState.state,
                      });
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <RefferLifeLineModal
            ModalRef={RefferModalState}
            details
            onPressContinue={() => {
              RefferModalState.current(false);
              SucessModalState.current(true);
            }}
          />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
export default index;
