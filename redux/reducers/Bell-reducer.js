import { UPDATE_BELL } from "../constants/Bell-constant";

const initialState = {
  count: 0,
};

const Bell = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BELL:
      return {
        count: parseInt(action.count),
      };
    default:
      return state;
  }
};

export default Bell;
