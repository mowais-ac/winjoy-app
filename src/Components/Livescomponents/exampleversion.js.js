import {View, Text, FlatList, StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import React from 'react';
import ProfilePicture from '../ProfilePicture';
const Randomnames = () => {
  const names = [
    'Abc1',
    'Abc1',
    'Abc1',
    'Abc1',
    'Abc1',
    'Abc1',
    'Abc1',
    'Abc1',
    'Abc1',
    'Abc1',
  ];
  return (
    <View style={styles.mainbody}>
      <Text style={{color: '#fff'}}>Randomnames</Text>
      <FlatList
        data={names}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View style={{height: 'auto', width: '100%'}}>
              <View
                style={{
                  height: 100,
                  backgroundColor: 'green',
                  width: 330,
                  borderRadius: 10,
                  marginVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 5,
                }}>
                <ProfilePicture
                  // picture={userInfo?.profile_image}
                  // id={userInfo?.id}
                  // name={
                  //   userInfo?.first_name?.slice(0, 1)?.toUpperCase() +
                  //   userInfo?.last_name?.slice(0, 1)?.toUpperCase()
                  // }
                  style={styles.avatarView}
                  font={28}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: '600',
                    fontFamily: 'Axiforma-Regular',
                    paddingLeft: 12,
                  }}>
                  {item}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainbody: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    height: height * 0.5,
    width: '95%',
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
  },
  avatarView: {
    width: 65,
    height: 65,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffffff',
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
export default Randomnames;
