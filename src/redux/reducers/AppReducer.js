import types from '../types';

const INITIAL_STATE = {
  lastGameData: {},
  userData: [],
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types. LAST_GAME_DATA:
      return {
        ...state,
        lastGameData: action.lastGameData,
      };
      case types.USER_DATA:
        return {
          ...state,
          userData: action.userData,
        };
    default:
      return state;
  }
};
