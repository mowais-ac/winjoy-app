import React, {useEffect, useState} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/store';
import {Provider} from 'react-redux';
import Router from './Router';
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();
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
