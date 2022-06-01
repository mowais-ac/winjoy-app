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
} from 'react-native';

import Background from '../../Components/Background';
import SafeArea from '../../Components/SafeArea';
import Label from '../../Components/Label';
import Header from '../../Components/Header';

import {Colors, Images} from '../../Constants/Index';
import Section from '../../Components/Section';
import UserInfo from '../../Components/UserInfo';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import NotFound from '../../Components/NotFound';
import {FormatNumber, wait} from '../../Constants/Functions';

import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const Entries = ({navigation}) => {
  const [Data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    check();
    wait(500).then(() => setRefreshing(false));
  }, []);

  const check = async () => {
    if (Data === null) {
      const Token = await EncryptedStorage.getItem('Token');
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      };
      await fetch(`${Config.API_URL}/luckydraw_winner_list`, requestOptions)
        .then(async response => response.json())
        .then(res => {
          {
            console.log({winnerlist: res.data});
          }
          setData(res.data);
        });
    }
  };
  useEffect(() => {
    check();
  }, []);
  const renderItem = ({item, i}) => {
    return (
      <TouchableNativeFeedback
        key={i}
        onPress={() => navigation.navigate('OrderDetails', {item})}
        activeOpacity={0.8}>
        <View
          style={{
            marginTop: 30,
            height: 340,
            position: 'relative',
            width: 365,
            alignSelf: 'center',
          }}>
          <View
            style={{
              marginHorizontal: 10,
              width: '95%',
              height: 10,
              backgroundColor: '#E7003F',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}
          />
          <View
            style={{
              backgroundColor: '#ffffff',
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              position: 'relative',
              marginHorizontal: 10,
            }}>
            <View
              style={{
                width: 33,
                height: 33,
                //marginLeft: 375,
                marginHorizontal: 330,
                zIndex: 100,
                borderRadius: 100,
                marginTop: 235,
                position: 'absolute',
                backgroundColor: '#C8DFE9',
              }}
            />
            <View
              style={{
                //marginLeft: -18,
                marginHorizontal: -17.5,
                width: 33,
                height: 33,
                zIndex: 100,
                borderRadius: 100,
                marginTop: 235,
                position: 'absolute',
                backgroundColor: '#FAD8E9',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Image
                  style={{width: 50, height: 50, margin: 5}}
                  source={require('../../assets/imgs/newlogo.png')}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    margin: 5,
                  }}>
                  <Text
                    style={{
                      color: '#E7003F',
                      fontWeight: 'bold',
                      fontSize: 18,
                      fontFamily: 'Axiforma',
                    }}>
                    Win
                    <Text
                      style={{
                        color: '#420E92',
                        fontWeight: 'bold',
                        fontFamily: 'Axiforma',
                      }}>
                      joy
                    </Text>
                  </Text>
                  <Text
                    style={{
                      color: '#C4C4C4',
                      fontWeight: '500',
                      textAlign: 'center',
                      lineHeight: 20,
                      fontFamily: 'Axiforma',
                    }}>
                    {item?.lucky_draw?.created_at
                      ? dayjs(item?.lucky_draw?.created_at).format(
                          'dddd, MMMM D YYYY',
                        )
                      : 'NAN'}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: '400',
                  fontSize: 18,
                  fontFamily: 'Axiforma',
                }}>
                {item?.user?.name}
              </Text>
            </View>
            <View
              style={{
                height: '1%',
                width: '100%',
                borderStyle: 'dashed',
                borderBottomWidth: 1,
                borderColor: 'rgba(161,155,183,1)',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Image
                  style={{width: 70, height: 50, margin: 5}}
                  source={{uri: item?.product?.image}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    margin: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: '400',
                      fontSize: 14,
                      fontFamily: 'Axiforma',
                    }}>
                    {item?.product?.title}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: '500',
                  fontSize: 18,
                  fontFamily: 'Axiforma',
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontWeight: '700',
                    fontSize: 18,
                    fontFamily: 'Axiforma',
                  }}>
                  AED
                </Text>{' '}
                {item?.product?.price}
              </Text>
            </View>
            <View
              style={{
                height: '1%',
                width: '100%',
                borderStyle: 'dashed',
                borderBottomWidth: 1,
                borderColor: 'rgba(161,155,183,1)',
              }}
            />
            <View style={{alignItems: 'center', marginVertical: 16}}>
              <Text
                numberOfLines={1}
                style={{
                  color: '#000000',
                  fontWeight: '400',
                  fontSize: 11,
                  fontFamily: 'Axiforma',
                  lineHeight: 30,
                }}>
                THIS COUPON GIVES YOU A CHANCE TO ENTER THE LUCKY DRAW
              </Text>
              <Text
                style={{
                  color: '#E7003F',
                  fontWeight: 'bold',
                  fontFamily: 'Axiforma',
                  fontSize: 18,
                  letterSpacing: 16,
                  //lineHeight: 22,
                }}>
                {item?.entry_code}
              </Text>
            </View>
            <View
              style={{
                height: 80,
                width: '100%',
                backgroundColor: '#E7003F',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
              }}>
              <Text
                numberOfLines={3}
                style={{
                  color: '#ffffff',
                  fontWeight: '700',
                  fontFamily: 'Axiforma',
                  fontSize: 17,
                }}>
                {item?.lucky_draw?.name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#420E92', '#E7003F']}
        style={{
          height: 'auto',
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <Header
          style={{
            top: Platform.OS === 'android' ? 0 : height * 0.03,
          }}
        />

        <View style={styles.MainTop}>
          <UserInfo style={styles.header} OwnUser popup status />
        </View>
        <View style={{marginVertical: 5}}>
          <Label bold headingtype="h2">
            Tickets
          </Label>
        </View>
      </LinearGradient>

      {Data === null ? (
        <ActivityIndicator size="large" color={Colors.BLACK} />
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f8d7e8', '#c7dfe8']}
          style={{flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={Data}
            renderItem={renderItem}
            keyExtractor={i => i}
            ListEmptyComponent={
              <View style={{marginVertical: 5}}>
                <Label dark bold headingtype="h1" style={styles.Heading}>
                  No Tickets found!
                </Label>
                <Label dark style={styles.Info}>
                  Sorry, we don’t have enough data to show you right now. Please
                  check again later.
                </Label>
              </View>
            }
            refreshControl={
              <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }
            // contentContainerStyle={{height: 'auto'}}
          />
        </LinearGradient>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    // height: height * 0.17,
    marginTop: Platform.OS === 'android' ? 10 : 25,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  head: {
    width: '100%',
    height: 30,
    borderTopRightRadius: 20,
    borderLeftRadius: 20,
  },
  ImageView: {
    shadowColor: Colors.SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: width * 0.22,
    height: height * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  Image: {
    height: height * 0.1,
    resizeMode: 'contain',
  },
  Heading: {
    marginTop: height * 0.02,
    color: 'black',
  },
  Info: {
    marginTop: height * 0.01,
    width: width * 0.8,
    lineHeight: height * 0.025,
    color: 'black',
  },

  LessMargin: {
    marginTop: height * 0.003,
  },
});
export default Entries;
