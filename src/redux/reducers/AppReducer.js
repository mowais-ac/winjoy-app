import types from '../types';

const INITIAL_STATE = {
  counter: 0,
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
  winExperienceProductData: [],
  expProductDetail: [],
  experienceID: '',
  experienceDetail: [],
  gameShowWinners: [],
  luckyDrawWinners: [],
  leaderBoardWinners: [],
  dealsJoyData: [],
  triviaJoyData: [],
  gameEnterStatus: [],
  totalLives: '',
  allCreatorsList: [],
  cartData: [],
  removeCartData: [],
  productsDetals: [],
  creatorExpList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CART_COUNTER:
      return {
        ...state,
        counter: action.counter,
      };
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
      return {...state, walletData: action.payload};
    case types.GET_LANDING_DATA:
      return {...state, LandingData: action.payload};
    case types.GET_PRODUCTS_LIST:
      return {...state, productsData: action.payload};
    case types.GET_LIVE_PLANS:
      return {...state, livePlans: action.payload};
    case types.BUY_LIVE_PLAN:
      return {...state, resLivePlans: action.payload};
    case types.GET_FANJOY_DATA:
      return {...state, fanjoyData: action.payload};
    case types.CREATOR_ID:
      return {
        ...state,
        creatorId: action.creatorId,
      };
    case types.GALLERY_DATA:
      return {...state, galleryData: action.payload};
    case types.CREATOR_PAGE_DATA:
      return {...state, creatorPageData: action.payload};
    case types.WIN_EXPERIENCE_PRODUCT_DATA:
      return {...state, winExperienceProductData: action.payload};
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

    default:
      return state;
  }
};
