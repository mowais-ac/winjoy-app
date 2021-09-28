import {
  NOTIFICATION_COUNT_REQUEST,
  NOTIFICATION_COUNT_ERROR,
  NOTIFICATION_COUNT_SUCCESS,
} from "../constants/SSE-constant";

const initialState = {
  NotificationCount: {
    searching: false,
    isError: false,
  },
};

const SSE = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_COUNT_REQUEST:
      return {
        ...state,
        NotificationCount: {
          ...NotificationCount,
          searching: true,
          isError: false,
        },
      };
    case NOTIFICATION_COUNT_SUCCESS:
      return {
        ...state,
        NotificationCount: {
          ...NotificationCount,
          searching: false,
          isError: false,
          data: action.response.data,
        },
      };
    case NOTIFICATION_COUNT_ERROR:
      return {
        ...state,
        NotificationCount: {
          ...NotificationCount,
          searching: false,
          isError: true,
        },
      };
    default:
      return state;
  }
};

export default SSE;
