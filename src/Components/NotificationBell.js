import React from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {Images} from '../Constants/Index';
import Label from './Label';
import {useNavigation} from '@react-navigation/native';
import {connect, useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const NotificationBell = props => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={[styles.Main, props.style]}
        onPress={() => navigation.navigate('NotificationBellList')}>
        <ImageBackground
          source={Images.N_Bell}
          style={styles.Bell}
          resizeMode={'stretch'}></ImageBackground>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  Main: {bottom: height * 0.005},
  Bell: {
    width: width * 0.09,
    height: width * 0.08,
  },
  Pop: {
    backgroundColor: 'red',
    width: 17,
    height: 17,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -2,
    top: -3,
  },
  Label: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    position: 'absolute',
    fontSize: 10,
  },
});

export default NotificationBell;
