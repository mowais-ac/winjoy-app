import {View, Text} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';

const Webmodallive = ({route, navigation}) => {
  const {uri} = route.params;

  return (
    <WebView
      source={{uri: uri}}
      onNavigationStateChange={navState => {
        console.log('navState.url1', navState.url.substring(0, 42));

        if (
          navState.url.substring(0, 42) ===
          'https://www.winjoy.ae/order/payment-status'
        ) {
          const timer = setTimeout(() => {
            clearTimeout(timer);
            navigation.navigate('LiveProducts');
          }, 10000);
        }
      }}
    />
  );
};

export default Webmodallive;