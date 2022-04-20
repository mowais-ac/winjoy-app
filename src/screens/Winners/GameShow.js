import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import Label from '../../Components/Label';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import {GameShowWinnersCard} from '../../Components';
import {
  heightConverter,
  heightPercentageToDP,
  widthConverter,
} from '../../Components/Helpers/Responsive';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import axios from 'axios';
import ProfilePicture from '../../Components/ProfilePicture';
import {RFValue} from 'react-native-responsive-fontsize';
import dayjs from 'dayjs';
import {FormatNumber} from '../../Constants/Functions';
import LongButton from '../../Components/LongButton';

const GameShow = props => {
  return (
    <View style={[styles.mainView]}>
      <View style={{width: width, marginTop: height * 0.02}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginBottom: 6,
          }}>
          <Text
            style={[styles.text2, {fontSize: RFValue(14), color: '#420E92'}]}>
            Last Game Winners
          </Text>
          <LongButton
            style={[
              {backgroundColor: '#ffffff', width: 150, height: 36, margin: 0},
            ]}
            textstyle={{
              color: '#000000',
              fontFamily: 'Axiforma-SemiBold',
              fontSize: 12,
            }}
            text="View Leaderboard"
            font={16}
            shadowless
            onPress={() =>
              props.navigation.navigate('MenuStack', {screen: 'LeaderBoard'})
            }
          />
        </View>
        <FlatList
          horizontal={true}
          style={{marginTop: 5}}
          ItemSeparatorComponent={() => <View style={{width: 16}} />}
          scrollEnabled={true}
          contentContainerStyle={{
            marginBottom: 20,
            alignSelf: 'flex-start',
          }}
          ListEmptyComponent={() => (
            <View>
              <Text
                style={{
                  paddingLeft: 10,
                  color: '#000000',
                  fontFamily: 'Axiforma-Regular',
                  fontSize: RFValue(13),
                }}>
                No Winners Found
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={props?.lastWinners}
          renderItem={({item}) => (
            <View style={{width: width / 3 - 16, justifyContent: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <ProfilePicture
                  picture={item?.user?.profile_image}
                  // id={userInfo?.id || userData?.id}
                  name={item?.user?.first_name?.charAt(0).toUpperCase()}
                  // name={userInfo?.first_name?.charAt(0).toUpperCase()}
                  style={styles.avatarViewTop}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  width: 20,
                  height: 20,
                  top: 4,
                  left: 22,
                }}>
                <Image
                  source={require('../../assets/imgs/redStar.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
              <View style={{justifyContent: 'center', marginTop: 5}}>
                <Text style={[styles.text2, {textAlign: 'center'}]}>
                  {item?.user?.first_name?.charAt(0)?.toUpperCase() +
                    item?.user?.first_name?.slice(1) +
                    ' ' +
                    item?.user?.last_name?.charAt(0)?.toUpperCase() +
                    item?.user?.last_name?.slice(1)}
                </Text>

                <Text
                  style={[
                    styles.text2,
                    {color: '#420E92', textAlign: 'center'},
                  ]}>
                  AED {parseFloat(FormatNumber(+item?.price)).toFixed(2)}
                </Text>
              </View>
            </View>
          )}
          //   keyExtractor={(item) => item.id}
        />
      </View>

      <FlatList
        data={props?.pastWinners}
        style={{
          width: '100%',
          paddingHorizontal: 10,
        }}
        scrollEnabled={false}
        contentContainerStyle={{
          width: '100%',
        }}
        ListEmptyComponent={() => (
          <View style={{}}>
            <Text
              style={{
                marginTop: 15,
                color: '#000000',
                fontFamily: 'Axiforma-Regular',
                fontSize: RFValue(13),
              }}>
              No PastWinners Found
            </Text>
          </View>
        )}
        // horizontal={true}
        ListHeaderComponent={() => (
          <Text
            style={[styles.text2, {fontSize: RFValue(14), color: '#420E92'}]}>
            Past Winners
          </Text>
        )}
        renderItem={({item, index}) => {
          return (
            <GameShowWinnersCard
              name={
                item?.user?.first_name?.charAt(0)?.toUpperCase() +
                item?.user?.first_name?.slice(1) +
                ' ' +
                item?.user?.last_name?.charAt(0)?.toUpperCase() +
                item?.user?.last_name?.slice(1)
              }
              date={dayjs(item.created_at).format('MMMM DD, YYYY')}
              ammount={parseFloat(FormatNumber(+item?.price)).toFixed(2)}
              profile_image={item?.user?.profile_image}
              // onPress={()=>navigation.navigate("LastGameWinnerDetail")}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: width,
    alignItems: 'center',
    paddingBottom: 10,
  },
  avatarViewTop: {
    width: 80,
    height: 80,
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
  text: {
    fontFamily: 'Axiforma-Regular',
    color: '#000000',
    fontSize: RFValue(12),
  },
  text2: {
    fontFamily: 'Axiforma-SemiBold',
    color: '#000000',
    fontSize: RFValue(12),
  },
});

export default GameShow;
