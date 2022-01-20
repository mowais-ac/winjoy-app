import { SET_USER_NAME, SET_USER_AGE, INCREASE_AGE, GET_CITIES } from '../actions';
import types from '../types';

const INITIAL_STATE = {
  lastGameData: {},
  userData: [],

  name: '',
  age: 0,
  walletData: [],
  LandingData: [],
  productsData: [],
  livePlans: [],
  resLivePlans: []
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LAST_GAME_DATA:
      return {
        ...state,
        lastGameData: action.lastGameData,
      };
    case types.USER_DATA:
      return {
        ...state,
        userData: action.userData,
      };

    case types.GET_WALLET_DATA:
      return { ...state, walletData: action.payload };
    case types.GET_LANDING_DATA:
      return { ...state, LandingData: action.payload };
    case types.GET_PRODUCTS_LIST:
      return { ...state, productsData: action.payload };
    case types.GET_LIVE_PLANS:
      return { ...state, livePlans: action.payload };
      case types.BUY_LIVE_PLAN:
        return { ...state, resLivePlans: action.payload };
      
    default:
      return state;
  }
};