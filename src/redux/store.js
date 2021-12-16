import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import ReduxThunk from 'redux-thunk';
import reducers from '../redux/reducers/index';
import sensitiveInfo from 'react-native-sensitive-info';


const storage = createSensitiveStorage({
  keychainService: 'myTask',
  sharedPreferencesName: 'myTask',
});

const persistConfig = {
  key: 'root',
  storage,
  timeout: 0,
 
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

let persistor = persistStore(store);

export {store, persistor};
