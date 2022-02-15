import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
const index = ({ route,navigation }) => {
    const { uri } = route.params;
    return (
        <WebView source={{ uri: uri}} />
    );

}
export default index;