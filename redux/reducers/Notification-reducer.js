import {
  NOTIFICATION_COUNT_REQUEST,
  NOTIFICATION_COUNT_ERROR,
  NOTIFICATION_COUNT_SUCCESS,
  UPDATE_NOTIFICATION,
} from "../constants/Notification-constant";

const initialState = {
  searching: false,
  isError: false,
  count: 0,
};

const Notification = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_COUNT_REQUEST:
      return {
        searching: true,
        isError: false,
      };
    case NOTIFICATION_COUNT_SUCCESS:
      return {
        searching: false,
        isError: false,
        data: action.response.data,
      };
    case NOTIFICATION_COUNT_ERROR:
      return {
        searching: false,
        isError: true,
        Error: action.response,
      };
    case UPDATE_NOTIFICATION:
      return {
        count: parseInt(action.params),
      };
    default:
      return state;
  }
};

export default Notification;
