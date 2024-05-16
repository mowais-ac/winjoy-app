import React, {useRef} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

import {Images, Colors} from '../Constants/Index';
import Label from './Label';
import LongButton from './LongButton';
import AddConnectionModal from './AddConnectionModal';

import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const NotFoundPurchase = props => {
  const ConModalRef = useRef();
  const navigation = useNavigation();
  return (
    <View style={{alignItems: 'center'}}>
      {/*  <Image
        source={require('../assets/imgs/CartEmptyList.png')}
        style={styles.Img}
      /> */}
      <Label primary bold headingtype="h2" style={styles.Heading}>
        No Purchases found!
      </Label>

      {/*  <View style={styles.SmallBorder} /> */}
      <Label dark style={styles.Info}>
        Sorry, we don’t have enough data to show you right now. Please check
        again later.
      </Label>

      <AddConnectionModal ModalRef={ConModalRef} DisplayAlert />
      <LongButton
        text={'Get to shopping'}
        textstyle={{color: '#ffffff', fontFamily: 'Axiforma-Bold'}}
        style={styles.Btn}
        shadowless
        onPress={props.onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Img: {
    marginTop: height * 0.03,
    resizeMode: 'contain',
    width: width * 0.25,
    height: height * 0.1,
    alignSelf: 'center',
  },
  Heading: {
    marginTop: height * 0.02,
    color: '#420E92',
  },
  Info: {
    marginTop: height * 0.01,
    width: width * 0.8,
    lineHeight: height * 0.025,
    color: '#000000',
    marginTop: height * 0.02,
  },
  SmallBorder: {
    width: width * 0.15,
    height: 2,
    backgroundColor: '#420E92',
    alignSelf: 'center',
    marginTop: height * 0.03,
  },
  HeadingQuestion: {
    marginTop: height * 0.02,
    color: 'red',
  },
  Btn: {
    marginTop: height * 0.02,
    backgroundColor: '#420E92',
    width: '70%',
  },
});

export default NotFoundPurchase;
