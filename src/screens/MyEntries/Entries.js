import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  Text,
  ImageBackground,
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
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';

const {width, height} = Dimensions.get('window');

const Entries = ({navigation}) => {
  const [Data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData(null);
    wait(500).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    let isActive = true;
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
    check();
  }, []);
  const renderItem = ({item, i}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('OrderDetails', {item})}>
        <View
          style={{
            backgroundColor: '#fff',
            overflow: 'hidden',
            borderRAdius: 10,
            padding: 10,
            marginVertical: 6,
          }}>
          <View>
            <Text>ID: {item?.entry_code}</Text>
          </View>
          <View>
            <Text>lucky_draw Name: {item?.lucky_draw?.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  // console.log(Data);
  return (
    <SafeArea>
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
        <View style={styles.MainTop}>
          <UserInfo style={styles.header} OwnUser popup status />
        </View>
      </LinearGradient>

      {Data === null ? (
        <ActivityIndicator size="large" color={Colors.BLACK} />
      ) : (
        <>
          <FlatList
            data={Data}
            ListHeaderComponent={
              <>
                {Data?.length >= 1 && (
                  <Label primary bold headingtype="h4">
                    Entries
                  </Label>
                )}
              </>
            }
            renderItem={renderItem}
            keyExtractor={i => i}
            ListEmptyComponent={<NotFound text="Entries" />}
            refreshControl={
              <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }
            contentContainerStyle={{
              paddingHorizontal: 10,
            }}
          />
        </>
      )}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    // height: height * 0.17,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  Section: {
    marginTop: 10,
    padding: 10,
  },
  SectionView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    width: '100%',
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
  TextView: {},
  LessMargin: {
    marginTop: height * 0.003,
  },
});
export default Entries;
