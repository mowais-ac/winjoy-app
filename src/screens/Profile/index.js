import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Text,
  FlatList,
} from 'react-native';
import Label from '../../Components/Label';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import HomeBottomList from '../../Components/HomeBottomList';
import {TriviaAvatar, TriviaCard} from '../../Components';
import {
  widthPercentageToDP,
  heightConverter,
  widthConverter,
} from '../../Components/Helpers/Responsive';
import Background from '../../Components/Background';
import Header from '../../Components/Header';
import {Avatar} from 'react-native-elements';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import axios from 'axios';
import NotFound from '../../Components/NotFound';
import ProfilePicture from '../../Components/ProfilePicture';
import UserInfo from '../../Components/UserInfo';
import Section from '../../Components/Section';
import Colors from '../../Constants/Colors';
import LongButton from '../../Components/LongButton';
import {useFocusEffect} from '@react-navigation/native';
import {wait} from '../../Constants/Functions';
import {useSelector} from 'react-redux';
const index = ({props, navigation, route}) => {
  const [userData, setUserData] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [selected, setSelected] = useState(1);
  const [friendData, setFriendData] = useState([]);
  const [Data, setData] = useState(null);
  const routeSelected = route?.params?.selected;
  const [activity, setActivity] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector(state => state.app.userData);

  useEffect(async () => {
    if (JSON.stringify(Data) !== user) {
      setData(user);
    }
    setUserInfo(user);
    GetData();
    MyFriends();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetData();
    MyFriends();
    wait(500).then(() => setRefreshing(false));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (routeSelected) {
        setSelected(routeSelected);
      }
    }, [routeSelected]),
  );

  const GetData = async () => {
    setActivity(true);
    const Token = await EncryptedStorage.getItem('Token');
    const requestOptions = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    };
    // alert(13123);

    await axios
      .get(`${Config.API_URL}/livegameshow/user/game/history`, requestOptions)
      .then(response => {
        let res = response;
        if (res.data.message === 'No Data Found.') {
          setUserData([]);
        } else {
          setUserData(res?.data);
        }
        setActivity(false);
      });
  };
  const MyFriends = async () => {
    const Token = await EncryptedStorage.getItem('Token');
    const requestOptions = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    };
    // alert(13123);
    await axios
      .get(`${Config.API_URL}/accepted-connections/list`, requestOptions)
      .then(response => {
        let res = response.data;
        setFriendData(res.data[0]);
      });
  };
  const GetField = props => {
    const {name, val, style} = props;
    return (
      <View style={[styles.ItemView, style]}>
        <Label notAlign bold darkmuted text={name} />
        <Label
          notAlign
          bold
          dark
          text={val || 'N/A'}
          style={styles.ItemLabel}
          {...props}
        />
      </View>
    );
  };

  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#420E92', '#E7003F']}
        style={{
          display: 'flex',
          flex: 1,
        }}>
        <View style={{height: 10}} />
        <Header back={true} />
        <View style={styles.aView}>
          <View style={styles.avatarView}>
            <ProfilePicture
              picture={userInfo?.profile_image}
              id={userInfo?.id}
              name={
                userInfo?.first_name?.slice(0, 1)?.toUpperCase() +
                userInfo?.last_name?.slice(0, 1)?.toUpperCase()
              }
              style={styles.avatarView}
              font={28}
            />
          </View>

          <Label font={14} style={{color: '#FFFFFF', marginTop: 8}}>
            {userInfo?.first_name?.charAt(0).toUpperCase() +
              userInfo?.first_name?.slice(1)}{' '}
            {userInfo?.last_name?.charAt(0).toUpperCase() +
              userInfo?.last_name?.slice(1)}
          </Label>

          <View style={styles.flatListHeader}>
            <TouchableOpacity
              onPress={() => {
                setSelected(1);
              }}>
              <Text
                style={[
                  styles.text,
                  {color: selected === 1 ? '#ffff00' : '#ffffff'},
                ]}>
                Played Games
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected(2);
              }}>
              <Text
                style={[
                  styles.text,
                  {color: selected === 2 ? '#ffff00' : '#ffffff'},
                ]}>
                About
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
            onPress={() => { setSelected(3) }}
          >
            <Text style={[styles.text, { color: selected === 3 ? "#ffff00" : "#ffffff" }]}>Friends</Text>
          </TouchableOpacity> */}
          </View>
          {selected === 1 ? (
            <>
              {userData?.length > 0 && (
                <Label
                  notAlign
                  style={{
                    top: 5,
                    color: '#FFFFFF',
                    marginTop: 8,
                    fontSize: 16,
                  }}>
                  Played Games
                </Label>
              )}
              <FlatList
                data={userData}
                contentContainerStyle={{
                  paddingBottom: height * 0.48,
                }}
                refreshControl={
                  <RefreshControl
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                  />
                }
                ListEmptyComponent={
                  activity ? (
                    <ActivityIndicator size="large" color="#fff" />
                  ) : (
                    <NotFound
                      text="Games"
                      desc="You don't have win any Games yet "
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: height * 0.4,
                      }}
                    />
                  )
                }
                ItemSeparatorComponent={() => {
                  return (
                    <View
                      style={{
                        marginTop: 20,
                        height: 1,
                        width: '100%',
                        backgroundColor: '#994e7c',
                      }}
                    />
                  );
                }}
                renderItem={({item, index}) => {
                  return (
                    <TriviaCard
                      userInfo={user}
                      userData={item}
                      //  onPress={() => navigation.navigate("MenuStack")}
                    />
                  );
                }}
              />
            </>
          ) : null}
          {selected === 2 ? (
            <View style={{marginTop: 10}}>
              <Label bold headingtype="h4">
                Personal Details
              </Label>
              {Data === null ? (
                <ActivityIndicator size="large" color={Colors.BLACK} />
              ) : (
                <>
                  <Section style={styles.Personal}>
                    <View style={{marginTop: height * 0.005}}>
                      <GetField name="First name" val={user?.first_name} />
                      <GetField name="Last name" val={user?.last_name} />
                      <GetField name="Username" val={user?.user_name} />
                      <GetField name="Email" val={user?.email} />
                      <GetField name="Country" val={user?.country} />
                      <GetField name="City" val={user?.city} />
                      <GetField name="Address" val={user?.address} />
                      <GetField name="Phone" val={user?.phone_no} />
                      <LongButton
                        light
                        shadowless
                        text="Edit"
                        style={styles.EditBtn}
                        onPress={() =>
                          navigation.navigate('MenuStack', {
                            screen: 'EditProfile',
                          })
                        }
                      />
                    </View>
                  </Section>
                </>
              )}
            </View>
          ) : null}
          {selected === 3 ? (
            <>
              {friendData?.length > 0 && (
                <Label
                  notAlign
                  style={{
                    top: 5,
                    color: '#FFFFFF',
                    marginTop: 8,
                    fontSize: 16,
                  }}>
                  Friends
                </Label>
              )}
              <FlatList
                data={friendData}
                contentContainerStyle={{
                  paddingBottom: height * 0.48,
                }}
                refreshControl={
                  <RefreshControl
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                  />
                }
                ListEmptyComponent={
                  activity ? (
                    <ActivityIndicator size="large" color="#fff" />
                  ) : (
                    <NotFound
                      text="Friends"
                      desc="You don't have any Friend yet "
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: height * 0.4,
                      }}
                    />
                  )
                }
                ItemSeparatorComponent={() => {
                  return (
                    <View
                      style={{
                        marginTop: 20,
                        height: 1,
                        width: '100%',
                        backgroundColor: '#994e7c',
                      }}
                    />
                  );
                }}
                renderItem={({item, index}) => {
                  return (
                    <TriviaCard
                      userData={item}
                      //onPress={() => navigation.navigate("HamburgerMenu")}
                    />
                  );
                }}
              />
            </>
          ) : null}
        </View>
      </LinearGradient>
    </>
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
    marginTop: 20,
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
  avatarView: {
    //position: 'absolute',

    width: widthConverter(130),
    height: widthConverter(130),
    borderRadius: heightConverter(130),
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
  },
  text: {
    fontFamily: 'Axiforma-Regular',
    color: '#ffffff',
    fontSize: 16,
  },
  EditBtn: {
    marginTop: height * 0.007,
    width: width * 0.8,
    height: height * 0.05,
  },
  Personal: {
    marginTop: height * 0.005,
    height: height * 0.372,
  },
  ItemView: {
    marginTop: height * 0.012,
    marginLeft: width * 0.05,
  },
  ItemLabel: {
    position: 'absolute',
    textAlign: 'right',
    width: width * 0.85,
  },
});

export default index;
