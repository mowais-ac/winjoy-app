import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import {widthConverter} from '../Helpers/Responsive';
import styles from './Styles';
import CountDown from 'react-native-countdown-component';
function TriviaNightCard({style, uri, onPress, subHeading, timer, startIn}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.mainView, style]}>
        <Image
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
          source={{
            uri: uri,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export {TriviaNightCard};
