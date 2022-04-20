import types from '../types';

const initialState = {
  count: 0,
};

const Bell = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_BELL:
      return {
        count: parseInt(action.count),
      };
    default:
      return state;
  }
};

export default Bell;
