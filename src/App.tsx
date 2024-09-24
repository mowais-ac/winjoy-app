import React from 'react';
import Router from './Router';
import {Provider} from 'react-redux';
import { persistor, store } from './reduxToolkit';
import {PersistGate} from 'redux-persist/integration/react';

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
