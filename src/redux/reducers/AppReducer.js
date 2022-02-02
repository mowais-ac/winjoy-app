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
  resLivePlans: [],
  fanjoyData: [],
  creatorId: '',
  galleryData: [],
  creatorPageData: [],
  winExperienceProductData:[],
  expProductDetail:[]
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
        ...state,userData: action.userData
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
    case types.GET_FANJOY_DATA:
      return { ...state, fanjoyData: action.payload };
    case types.CREATOR_ID:
      return {
        ...state,
        creatorId: action.creatorId

      };
    case types.GALLERY_DATA:
      return { ...state, galleryData: action.payload };
    case types.CREATOR_PAGE_DATA:
      return { ...state, creatorPageData: action.payload };
      case types.WIN_EXPERIENCE_PRODUCT_DATA:
        return { ...state, winExperienceProductData: action.payload };
        case types.EXPERIENCE_PRODUCT_DETAILS:
        return { ...state, expProductDetail: action.payload};
    default:
      return state;
  }
};