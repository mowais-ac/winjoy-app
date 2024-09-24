import {
  PURGE,
  PAUSE,
  FLUSH,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from 'redux-persist';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  cartSlice,
  celebsSlice,
  fanjoySlice,
  homeSlice,
  walletSlice,
  livePlanSlice,
  joinGameshowSlice,
  leaderboardSlice,
  userSlice,
  getproductSlice,
  gameshowwinnersSlice,
  leaderboardwinnersSlice,
  allcreatorsSlice,
  dealsjoySlice,
  experiencecelebsSlice,
  gallerySlice,
  causesSlice,
  winnersSlice,
} from './slices';
import { luckydrawwinnersSlice } from './slices/luckydrawwinnersSlice';
import { triviajoySlice } from './slices/triviajoySlice';


const reducers = combineReducers({
  home: homeSlice.reducer,
  cart: cartSlice.reducer,
  wallet: walletSlice.reducer,
  livePlans: livePlanSlice.reducer,
  fanjoy: fanjoySlice.reducer,
  leaderboard: leaderboardSlice.reducer,
  celebs: celebsSlice.reducer,
  joingameshow: joinGameshowSlice.reducer,
  user:userSlice.reducer,
  getproduct: getproductSlice.reducer,
  fanjoyall: allcreatorsSlice.reducer,
  triviajoyall: triviajoySlice.reducer,
  dealsjoyall: dealsjoySlice.reducer,
  gameshowwinners: gameshowwinnersSlice.reducer,
  luckydrawwinners: luckydrawwinnersSlice.reducer,
  experienceceleb: experiencecelebsSlice.reducer,
  gallery: gallerySlice.reducer,
  leaderboardwinners:leaderboardwinnersSlice.reducer,
  causesSlug:causesSlice.reducer,
  winners:winnersSlice.reducer,
  livedraw:livePlanSlice.reducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store, persistor};
