import React, {useRef} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

import {Images, Colors} from '../Constants/Index';
import Label from './Label';
import LongButton from './LongButton';

import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const NotFound = props => {
  return (
    <View style={props.style}>
      {/* <Label dark bold headingtype="h1" style={styles.Heading}>
        No {props.text} found!
      </Label> */}
      <Label dark bold headingtype="h1" style={styles.Heading}>
        No {props.text2} Played!
      </Label>

      <Label dark style={styles.Info}>
        {props.desc ||
          'Sorry, we don’t have enough data to show you right now. Please check again later.'}
      </Label>
    </View>
  );
};

const styles = StyleSheet.create({
  Img: {
    marginTop: height * 0.03,
    resizeMode: 'contain',
    width: width * 0.625,
    height: height * 0.2,
    alignSelf: 'center',
  },
  Heading: {
    marginTop: height * 0.02,
    color: '#ffff',
  },
  Info: {
    marginTop: height * 0.01,
    width: width * 0.8,
    lineHeight: height * 0.025,
    color: '#ffff',
  },
  SmallBorder: {
    width: width * 0.15,
    height: 2,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: 'center',
    marginTop: height * 0.03,
  },
  HeadingQuestion: {
    marginTop: height * 0.02,
    color: 'red',
  },
  Btn: {
    marginTop: height * 0.02,
    borderWidth: 2,
    borderColor: Colors.PRIMARY_LABEL,
    backgroundColor: Colors.INVISIBLE,
  },
});

export default NotFound;
