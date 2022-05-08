import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  Linking,
  Alert,
} from 'react-native';
import Label from '../../Components/Label';
const {width, height} = Dimensions.get('window');
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../../Components/Helpers/Responsive';
import Header from '../../Components/Header';
import ProfilePicture from '../../Components/ProfilePicture';
import {AuthContext} from '../../Components/context';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTranslation} from 'react-i18next';
import {WjBackground} from '../../Components';
import SelectLanguageModal from '../../Components/SelectLanguageModal';
import SelectCurrencyModal from '../../Components/SelectCurrencyModal';
import {useSelector} from 'react-redux';
import Info_btn from '../../Components/Info';
import LinearGradient from 'react-native-linear-gradient';
import packageJson from '../../../package.json';

const index = ({props, navigation}) => {
  const ModalStateInfo = useRef();
  const userData = useSelector(state => state.app.userData);
  const {t, i18n} = useTranslation();
  const [headerValue, setHeaderValue] = useState(0);
  const ModalStateLanguage = useRef();
  const ModalStateCurrency = useRef();
  const {signOut} = React.useContext(AuthContext);

  let data2 = [
    {
      name: t('view_profile'),
      icon: require('../../assets/imgs/humburgerIcons/viewProfile.png'),
    },
    {
      name: t('wallet'),
      icon: require('../../assets/imgs/humburgerIcons/wallet.png'),
    },
    {
      name: t('my_order'),
      icon: require('../../assets/imgs/humburgerIcons/myOrders.png'),
    },
    {
      name: t('My Tickets'),
      icon: require('../../assets/imgs/humburgerIcons/myOrders.png'),
    },
    {
      name: t('refer_&_Earn'),
      icon: require('../../assets/imgs/humburgerIcons/reffer.png'),
    },
    {
      name: t('Buy Lives'),
      icon: require('../../assets/imgs/humburgerIcons/buyLives.png'),
    },
    {
      name: t('leaderboard'),
      icon: require('../../assets/imgs/humburgerIcons/leaderBoard.png'),
    },

    {
      name: t('played_games'),
      icon: require('../../assets/imgs/humburgerIcons/playedGames.png'),
    },

    {
      name: t('logout'),
      icon: require('../../assets/imgs/humburgerIcons/logout.png'),
    },
  ];

  const OpenWhatsApp = () => {
    Linking.openURL('http://api.whatsapp.com/send?phone=971501235240');
  };
  const OpenTikTok = () => {
    Linking.openURL('https://vm.tiktok.com/ZSe7SEt69/');
  };
  const OpenSnapChat = () => {
    Linking.openURL(
      'https://www.snapchat.com/add/wjwinjoy?share_id=WiY7dKP-QK4&locale=en-GB',
    );
  };
  const OpenInsta = () => {
    let appUrl = 'https://www.instagram.com/winjoyae?utm_medium=copy_link';
    Linking.openURL(appUrl)
      .then(supported => {
        if (!supported) {
          alert('not supported');
        } else {
          return Linking.openURL(appUrl);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  const OpenFB = () => {
    let appUrl = 'https://www.facebook.com/winjoyae/';
    Linking.openURL(appUrl)
      .then(supported => {
        if (!supported) {
          alert('not supported');
        } else {
          return Linking.openURL(appUrl);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <View style={{backgroundColor: '#ffffff'}}>
      <Header
        style={{
          position: 'absolute',
          zIndex: 1000,
          backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
          width: '100%',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          top: Platform.OS === 'android' ? 0 : height * 0.028,
        }}
      />
      <ScrollView
        onScroll={e => {
          setHeaderValue(e.nativeEvent.contentOffset.y);
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#420E92', '#E7003F']}
          style={{
            height: 'auto',
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}>
          <View style={[styles.topView]}>
            <ProfilePicture
              picture={userData?.profile_image}
              id={userData?.id}
              name={
                userData?.first_name?.slice(0, 1) +
                userData?.last_name?.slice(0, 1)
              }
              style={styles.avatarView}
            />
            <View
              style={{
                width: widthConverter(250),
                marginLeft: 20,
                justifyContent: 'center',
              }}>
              <Label font={14} notAlign bold style={{color: '#FFFFFF'}}>
                {userData?.first_name?.charAt(0)?.toUpperCase() +
                  userData?.first_name?.slice(1)}{' '}
                {userData?.last_name?.charAt(0)?.toUpperCase() +
                  userData?.last_name?.slice(1)}
              </Label>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.aView}>
          <FlatList
            data={data2}
            contentContainerStyle={{
              paddingBottom: height * 0.02,
            }}
            // horizontal={true}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    marginTop: 5,
                    height: 1,
                    width: '100%',
                    backgroundColor: '#E6DFEE',
                  }}
                />
              );
            }}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: width,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (item.name === 'Wallet') {
                        // navigation.navigate("BottomTabStack");
                        navigation.navigate('BottomTabStack', {
                          screen: 'WALLET',
                        });
                      }
                      if (item.name === 'Leaderboard') {
                        navigation.navigate('LeaderBoard');
                      }
                      if (item.name === 'View profile') {
                        navigation.navigate('Profile', {
                          selected: 2,
                        });
                      }
                      if (item.name === 'Played games') {
                        navigation.navigate('Profile', {
                          selected: 1,
                        });
                      }
                      if (item.name === 'My purchases') {
                        navigation.navigate('Orders');
                      }
                      if (item.name === 'My Tickets') {
                        navigation.navigate('Entries');
                      }
                      if (item.name === 'Logout') {
                        signOut();
                      }

                      if (item.name === 'Buy Lives') {
                        navigation.navigate('BuyLife');
                      }
                      if (item.name === t('refer_&_Earn')) {
                        navigation.navigate('RefferAndEarn');
                      }
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: width * 0.05,
                        paddingVertical: 4,
                      }}>
                      <Image
                        style={styles.iconImage}
                        source={item?.icon}
                        resizeMode="contain"
                      />
                      <Text
                        style={[
                          styles.text,
                          {
                            color: '#0B2142',
                          },
                        ]}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          <View style={{width: '95%', alignItems: 'center'}}>
            <View
              style={{
                height: 1,
                width: width,
                backgroundColor: '#E6DFEE',
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: height * 0.001,
              }}>
              <TouchableOpacity onPress={() => OpenInsta()}>
                <Image
                  style={styles.bottomImage}
                  source={require('../../assets/imgs/humburgerIcons/insta.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => OpenFB()}>
                <Image
                  style={styles.bottomImage}
                  source={require('../../assets/imgs/humburgerIcons/faceBook.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => OpenWhatsApp()}>
                <Image
                  style={styles.bottomImage}
                  source={require('../../assets/imgs/humburgerIcons/whatsApp.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => OpenTikTok()}>
                <Image
                  style={styles.bottomImage}
                  source={require('../../assets/imgs/humburgerIcons/tiktok.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => OpenSnapChat()}>
                <Image
                  style={styles.bottomImage}
                  source={require('../../assets/imgs/humburgerIcons/snapChat.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: height * 0.001,
                height: 1,
                width: width,
                backgroundColor: '#E6DFEE',
              }}
            />
            <Info_btn ModalRef={ModalStateInfo} />

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: width,
                height: height * 0.15,
                marginTop: 20,
                marginBottom: 15,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Contactus');
                }}>
                <View
                  style={[
                    styles.bottomBtnView,
                    {
                      //backgroundColor: '#E9E3F0',
                      borderTopRightRadius: height * 0.035,
                      borderBottomRightRadius: height * 0.035,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.text,
                      {
                        color: '#E7003F',
                        fontSize: RFValue(15),
                        fontFamily: 'Axiforma-SemiBold',
                        textAlign: 'center',
                      },
                    ]}>
                    Contact Us
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  width: width * 0.8,
                  height: height * 0.059,
                  borderWidth: 1,
                  borderColor: '#E9E3F0',
                  borderRadius: height * 0.06,
                  flexDirection: 'row',
                  marginTop: 16,
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('FAQS')}>
                  <View
                    style={[
                      styles.bottomBtnView,
                      {
                        backgroundColor: '#E9E3F0',
                        borderTopLeftRadius: height * 0.035,
                        borderBottomLeftRadius: height * 0.035,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.text,
                        {
                          color: '#420E92',
                          fontSize: RFValue(14),
                          fontFamily: 'Axiforma-SemiBold',
                          textAlign: 'center',
                        },
                      ]}>
                      FAQ's
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* onPress={() => Linking.openURL('mailto:support@winjoy.ae')} */}
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('GamesRules');
                  }}>
                  <View
                    style={[
                      styles.bottomBtnView,
                      {
                        //backgroundColor: '#E9E3F0',
                        borderTopRightRadius: height * 0.035,
                        borderBottomRightRadius: height * 0.035,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.text,
                        {
                          color: '#420E92',
                          fontSize: RFValue(14),
                          fontFamily: 'Axiforma-SemiBold',
                          textAlign: 'center',
                        },
                      ]}>
                      Game Rules
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  ModalStateInfo.current(true);
                }}>
                <View
                  style={{
                    backgroundColor: '#E9E3F0',
                    width: width * 0.5,
                    height: height * 0.059,
                    borderWidth: 1,
                    borderColor: '#E9E3F0',
                    borderRadius: height * 0.06,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Text
                    style={{
                      color: '#420E92',
                      fontSize: RFValue(14),
                      fontFamily: 'Axiforma-SemiBold',
                    }}>
                    Legal
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <SelectLanguageModal ModalRef={ModalStateLanguage} details />
            <SelectCurrencyModal ModalRef={ModalStateCurrency} details />
          </View>
        </View>

        <Text
          style={{
            fontSize: 11,
            color: '#cccccc',
            paddingHorizontal: 8,
            paddingBottom: 8,
          }}>
          Version: 0.0.{packageJson.version}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: 800,
    width: width,
    alignItems: 'center',
  },
  newGameView: {
    marginTop: 10,
    width: width - 25,
    height: height - 600,
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnView: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    width: width - 200,
    height: height - 665,
    justifyContent: 'center',
    borderRadius: 30,
  },

  aView: {
    alignItems: 'center',
    width: widthPercentageToDP('100%'),
    // marginTop: height * 0.05,
  },
  bView: {
    // backgroundColor: "rgba(0,0,0,0.4)",
    height: heightPercentageToDP('16%'),
  },
  flatListHeader: {
    marginTop: heightConverter(20),
    width: widthPercentageToDP('100%'),
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: heightConverter(65),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  footer: {
    width: widthPercentageToDP('100%'),
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topView: {
    width: widthPercentageToDP('100%'),
    marginTop: 50,
    paddingVertical: 20,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  avatarView: {
    width: height * 0.105,
    height: height * 0.105,
    borderRadius: heightConverter(65),
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
    marginLeft: 15,
  },
  text: {
    fontFamily: 'Axiforma-Regular',
    color: '#0B2142',
    fontSize: RFValue(13),
    // textTransform: 'capitalize',
  },
  rowView: {
    width: width * 0.9,
    justifyContent: 'space-between',
    // borderWidth:3
    //elevation:3,
    flexDirection: 'row',

    marginBottom: 10,
    // backgroundColor: "rgba(128,0,128,0.5)",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  innerRow: {
    flexDirection: 'row',
  },
  iconImage: {
    width: width * 0.05,
    height: height * 0.05,
    marginRight: 10,
  },
  bottomImage: {
    width: 55,
    height: 55,
    margin: 10,

    resizeMode: 'contain',
  },
  Margin: {
    height: height * 0.065,
    width: width * 0.36,
    backgroundColor: '#fcd9e2',
    borderRadius: 10,
  },
  twoBtnView: {
    width: width * 0.4,
    height: height * 0.05,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E6DFEE',
    borderRadius: height * 0.06,
  },
  bottomBtnView: {
    width: width * 0.4,
    height: height * 0.058,
    justifyContent: 'center',
  },
});

export default index;
