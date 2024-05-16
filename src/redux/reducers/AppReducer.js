import types from '../types';

const INITIAL_STATE = {
  counter: 0,
  lastGameData: {},
  userData: [],
  fanjoyalldata: {loading: true, data: []},
  Fanjoy_data_list: {loading: true, data: []},
  postliveluckydraw: {loading: true, data: []},
  slugDetails: {loading: true, data: []},
  homeDetails: {loading: true, data: []},
  winner: {loading: true, data: []},
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
  winExperienceProductData: [],
  loader: true,
  expProductDetail: [],
  experienceID: '',
  experienceDetail: [],
  gameShowWinners: [],
  luckyDrawWinners: [],
  leaderBoardWinners: [],
  dealsJoyData: [],
  triviaJoyData: [],
  gameEnterStatus: [],
  totalLives: '0',
  allCreatorsList: [],
  cartData: [],
  removeCartData: [],
  productsDetals: [],
  creatorExpList: [],
  isloading: true,

  /*   Homedata: {loading: false, LandingData: []}, */
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CART_COUNTER:
      return {...state, counter: action.CART_COUNTER};
    case types.LAST_GAME_DATA:
      return {...state, lastGameData: action.lastGameData};
    case types.USER_DATA:
      return {...state, userData: action.userData};
    case types.GET_WALLET_DATA:
      return {...state, walletData: action.payload};
    case types.GET_LANDING_DATA:
      return {...state, LandingData: action.payload};
    case types.POST_LIVELUCKY_DRAW:
      return {
        ...state,
        postliveluckydraw: {
          loading: action.payload.loading,
          data: action.payload.data,
        },
      };
    case types.SLUG_DETAILS:
      return {
        ...state,
        slugDetails: {
          loading: action.payload.loading,
          data: action.payload.data,
        },
      };
    case types.WINNER:
      return {
        ...state,
        winner: {
          loading: action.payload.loading,
          data: action.payload.data,
        },
      };
    case types.FANJOY_ALL_DATA:
      return {
        ...state,
        fanjoyalldata: {
          loading: action.payload.loading,
          data: action.payload.data,
        },
      };
    case types.FANJOY_DATA_LIST:
      return {
        ...state,
        Fanjoy_data_list: {
          loading: action.payload.loading,
          data: action.payload.data,
        },
      };
    case types.GET_PRODUCTS_LIST:
      return {...state, productsData: action.payload};
    case types.GET_LIVE_PLANS:
      return {...state, livePlans: action.payload};
    case types.BUY_LIVE_PLAN:
      return {...state, resLivePlans: action.payload};
    case types.GET_FANJOY_DATA:
      return {...state, fanjoyData: action.payload};
    case types.CREATOR_ID:
      return {...state, creatorId: action.creatorId};
    case types.GALLERY_DATA:
      return {...state, galleryData: action.payload};
    case types.CREATOR_PAGE_DATA:
      return {...state, creatorPageData: action.payload};
    case types.WIN_EXPERIENCE_PRODUCT_DATA:
      return {
        ...state,
        loader: action.l,
        winExperienceProductData: action.payload,
      };
    case types.HOME_DETAILS:
      return {...state, homeDetails: action.payload};
    case types.EXPERIENCE_PRODUCT_DETAILS:
      return {...state, expProductDetail: action.payload};
    case types.EXPERIENCE_ID:
      return {...state, experienceID: action.experienceID};
    case types.EXPERIENCE_DETAILS:
      return {...state, experienceDetail: action.payload};
    case types.GAME_SHOW_WINNERS:
      return {...state, gameShowWinners: action.payload};
    case types.LUCKY_DRAW_WINNERS:
      return {...state, luckyDrawWinners: action.payload};
    case types.LEADER_BOARD_WINNERS:
      return {...state, leaderBoardWinners: action.payload};
    case types.DEALS_JOY:
      return {...state, dealsJoyData: action.payload};
    case types.TRIVIA_JOY:
      return {...state, triviaJoyData: action.payload};
    case types.GAME_ENTER_STATUS:
      return {...state, gameEnterStatus: action.payload};
    case types.TOTAL_LIVES:
      return {...state, totalLives: action.totalLives};
    case types.ALL_CREATORS_LIST:
      return {...state, allCreatorsList: action.payload};
    case types.CAR_DATA:
      return {...state, cartData: action.payload};
    case types.REMOVE_CAR_DATA:
      return {...state, removeCartData: action.payload};
    case types.PRODUCTS_DETAILS:
      return {...state, productsDetals: action.payload};
    case types.CREATORS_EXPERIENCE_LIST:
      return {...state, creatorExpList: action.payload};
    case types.IS_LOADING:
      return {...state, isloading: action.payload};
    case types.BELL_NOTIFICATION:
      return {...state, bell_notification: action.payload};
    default:
      return state;
  }
};
