import types from '../types';

const INITIAL_STATE = {
  loading: false,
  eventData: [],
  eventError: false,
}; 

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
   
    // case EVENT_LOG:
    //   return {
    //     ...state,
    //     eventData: action.payload,
    //   };
    // case EVENT_FAILURE:
    //   return {
    //     ...state,
    //     eventError: action.payload,
    //   };
    case types.SHOW_LOADER:
      return {
        ...state,
        loading: true,
      };
    case types.HIDE_LOADER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};