import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  View,
  Platform,
} from 'react-native';
import Label from '../Components/Label';
import {Images} from '../Constants/Index';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import axios from 'axios';
import LoaderImage from './LoaderImage';
import {Colors} from '../Constants/Index';
const {width, height} = Dimensions.get('window');

function LiveHostCard({item}) {
  return (
    <View>
      {Platform.OS === 'android' ? (
        <LoaderImage
          source={{
            uri: item.url,
          }}
          style={{
            width: width * 0.7,
            height: height * 0.3,
            borderRadius: 15,
            borderBottomLeftRadius: 0,
            justifyContent: 'center',
            marginLeft: 10,
          }}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={{
            uri: item.url,
          }}
          style={{
            width: width * 0.65,
            height: height * 0.25,
            borderRadius: 16,
            // borderBottomLeftRadius: 0,
            justifyContent: 'center',
            marginLeft: 10,
          }}
          resizeMode="contain"
        />
      )}
    </View>
  );
}
const TriviaJoyBottomList = props => {
  const navigation = useNavigation();
  const {data} = props;

  return (
    <FlatList
      horizontal={true}
      style={{minHeight: 50}}
      contentContainerStyle={{
        paddingRight: 10,
      }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({item}) => (
        <LiveHostCard props={props} index={item.index} item={item} />
      )}
      keyExtractor={item => item.id}
      //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
    />
  );
};

const styles = StyleSheet.create({
  ShoppingBanner: {
    width: width * 1.01,
    height: height * 0.245,
    marginTop: height * 0.015,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  LinerGradientProgrees: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    borderRadius: 9,
    height: 9,
  },
  GreybarWidth: {
    width: 120,
    height: 9,
    zIndex: -1,
    position: 'absolute',
    backgroundColor: '#EADFE3',
    borderRadius: 9,
  },
  containerprogressBar: {
    width: 100,
    marginBottom: 2,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    height: 3,
    marginLeft: 2,
  },
  mainView: {
    height: height - 250,
    width: width,

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: 'hidden',
  },
  ProfileView: {
    width: 100,
    height: 120,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfileBG: {
    backgroundColor: Colors.PROFILE_BG,
  },
});
const mapStateToProps = state => {
  const {Bell} = state;
  return {
    Bell,
  };
};

export default connect(mapStateToProps, null)(TriviaJoyBottomList);
