import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import ReduxThunk from 'redux-thunk';
import reducers from '../redux/reducers/index';
import EncryptedStorage from 'react-native-encrypted-storage';

const storage = createSensitiveStorage({
  keychainService: 'winjoy',
  sharedPreferencesName: 'winjoy',
});

const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
// Development
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

let persistor = persistStore(store);

export {store, persistor};
