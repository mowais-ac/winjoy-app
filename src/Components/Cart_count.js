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
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');

const Cart_count = props => {
  const navigation = useNavigation();
  const cartData = useSelector(state => state.app.cartData);

  return (
    <>
      <TouchableOpacity
        style={[styles.Main, props.style]}
        onPress={() => navigation.navigate('Cart')}>
        <ImageBackground
          source={Images.Bell}
          style={styles.Bell}
          resizeMode={'stretch'}>
          {cartData?.data?.length > 0 ? (
            <>
              <View style={styles.Pop}>
                <Text style={styles.Label}>{cartData?.data?.length}</Text>
              </View>
            </>
          ) : null}
        </ImageBackground>
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
  Pop1: {
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

export default Cart_count;
