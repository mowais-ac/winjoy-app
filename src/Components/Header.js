import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Images} from '../Constants/Index';
import Cart_count from './Cart_count';
import Label from './Label';
import {Colors} from '../Constants/Index';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import {connect, useSelector} from 'react-redux';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {heightConverter, widthConverter} from './Helpers/Responsive';
const {width, height} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UpdateBell} from '../redux/actions';
import NotificationBell from './NotificationBell';
const Header = props => {
  const navigation = useNavigation();

  return (
    <View style={props.style}>
      <View style={[styles.Container, {height: props.height}]}>
        {props.back ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.containerBack}>
              <BackIcon
                name="ios-chevron-back"
                size={20}
                color="#FFFFFF"
                style={{left: 5}}
              />
              <Text style={styles.text}>Back</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'BottomTabStack'}],
              });
            }}>
            <Image
              source={Images.Logo}
              style={[
                styles.Logo,
                {
                  height: height * 0.058,
                },
              ]}
            />
          </TouchableOpacity>
        )}
        {/* <NotificationBell style={styles.N_Bell} /> */}
        {!props.noBell && (
          <Cart_count style={styles.Bell} value={props.value} />
        )}
        <TouchableOpacity
          style={styles.Lines}
          onPress={() =>
            navigation.navigate('MenuStack', {
              screen: 'HamburgerMenu',
            })
          }>
          <Image source={Images.Lines} style={styles.Logo} />
        </TouchableOpacity>
      </View>

      {props.heading && (
        <Label bold notAlign style={[styles.Heading, props.style]} font={27}>
          {props.heading}
        </Label>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  containerBack: {
    flexDirection: 'row',
    width: widthConverter(80),
    marginRight: widthConverter(-30),
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Axiforma-Regular',
    fontSize: RFValue(14),
    color: Colors.LABEL,
    left: 4,
  },
  Logo: {
    width: width * 0.086,
    height: height * 0.038,
    resizeMode: 'contain',
    marginLeft: width * 0.043,
  },
  N_Bell: {
    marginLeft: width * -0.1,
    backgroundColor: 'red',
  },
  Bell: {
    marginLeft: width * 0.63,
    //backgroundColor: 'pink',
  },
  Heading: {
    marginLeft: width * 0.05,
    marginTop: height * 0.03,
  },
  Lines: {
    position: 'absolute',
    marginLeft: width * 0.83,
  },
});

export default Header;
