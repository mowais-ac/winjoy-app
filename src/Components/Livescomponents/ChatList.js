import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ProfilePicture from '../ProfilePicture';
const ChatList = props => {
  return (
    <View
      style={{
        height: 65,
        flexDirection: 'row',
        width: '98%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 8,
        paddingHorizontal: 8,
      }}>
      <ProfilePicture
        //picture={props?.userInfo?.profile_image}
        //id={props?.userInfo?.id}
        //name={
        // props?.userInfo?.first_name?.slice(0, 1)?.toUpperCase() +
        //  props?.userInfo?.last_name?.slice(0, 1)?.toUpperCase()
        // }
        style={styles.avatarView}
        font={19}
      />
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 30,
          width: '82%',
          height: 55,
          paddingHorizontal: 10,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 15,
            fontWeight: 'bold',
            fontFamily: 'Axiforma-Regular',
          }}>
          {props?.name}
        </Text>
        <Text numberOfLines={2} style={{color: '#fff'}}>
          {props?.Inputdata}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  avatarView: {
    width: 55,
    height: 55,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#A49FAA',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
});
export default ChatList;
