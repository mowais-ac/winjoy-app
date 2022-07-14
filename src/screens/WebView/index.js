import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
const index = ({route, navigation}) => {
  const {uri} = route.params;
  return (
    <WebView
      source={{uri: uri}}
      onNavigationStateChange={navState => {
        console.log('navState.url1', navState.url.substring(0, 42));
        if (
          navState.url.substring(0, 42) ===
          'https://www.winjoy.ae/order/payment-status'
        )
          navigation.navigate('Noon');
      }}
    />
  );
};
export default index;
