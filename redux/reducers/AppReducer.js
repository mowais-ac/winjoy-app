import types from '../types';

const INITIAL_STATE = {
  lastGameData: {},
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types. LAST_GAME_DATA:
      return {
        ...state,
        lastGameData: action.lastGameData,
      };
    default:
      return state;
  }
};
