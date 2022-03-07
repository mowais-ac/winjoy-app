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

const Bell = props => {
  const navigation = useNavigation();
  const counter = useSelector(state => state.app.counter);

  const {Bell} = props;

  return (
    <>
      <TouchableOpacity
        style={[styles.Main, props.style]}
        onPress={() => navigation.navigate('Cart')}>
        <ImageBackground
          source={Images.Bell}
          style={styles.Bell}
          resizeMode={'stretch'}>
          {+counter >= 1 && (
            <>
              {/* <Image source={Images.BellPop} style={styles.Pop} />
            <Label notAlign bold style={styles.Label} font={11}>
              {counter > 99 ? 99 : counter}
            </Label> */}
              <View style={styles.Pop}>
                <Text style={styles.Label}>{counter > 99 ? 99 : counter}</Text>
              </View>
            </>
          )}
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
    textColor: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    position: 'absolute',
    fontSize: 10,
  },
});
const mapStateToProps = state => {
  const {Bell} = state;
  return {
    Bell,
  };
};

export default connect(mapStateToProps, null)(Bell);
