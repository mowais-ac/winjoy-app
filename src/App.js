import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EncryptedStorage from "react-native-encrypted-storage";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { Provider } from "react-redux";
import Router from './Router';
const App = () => {
    return (
        <PersistGate loading={null} persistor={persistor}>
            <Provider store={store}>
                <Router />
            </Provider>
        </PersistGate>
    );
};

export default App;