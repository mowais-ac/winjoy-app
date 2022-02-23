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
import Bell from './Bell';
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
const Header = props => {
  const navigation = useNavigation();

  // const check = async () => {
  //
  // check();

  // const UpdateValueOnce = async () => {
  //   const Token = await EncryptedStorage.getItem("Token");
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Accept: "application/json",
  //       Authorization: `Bearer ${Token}`,
  //     },
  //   };
  //   await fetch(`${Config.API_URL}/unread/notifications/list`, requestOptions)
  //     .then(async (response) => response.json())
  //     .then(async (res) => {
  //       if (
  //         res.status &&
  //         res.status.toLowerCase() === "success" &&
  //         res.data[0].length !== props.Bell.count
  //       ) {
  //         props.UpdateBell(UpdateBell(res.data[0].length));
  //       }
  //     })
  //     .catch((e) => console.log(e));
  // };
  // const UpdateValueOnce = async () => {
  //   let dat = await AsyncStorage.getItem('ids');
  //   let count = JSON.parse(dat);
  //   props.UpdateBell(UpdateBell(count?.length));
  // };

  // useEffect(() => {
  //   UpdateValueOnce();
  // }, []);
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
        {!props.noBell && <Bell style={styles.Bell} value={props.value} />}
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
  Bell: {
    marginLeft: width * 0.64,
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

// const mapStateToProps = (state) => {
//   const { Bell } = state;
//   return {
//     Bell,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     UpdateBell: (data) => dispatch(data),
//   };
// };

export default Header;
