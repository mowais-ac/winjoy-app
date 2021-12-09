import {
  NOTIFICATION_COUNT_REQUEST,
  NOTIFICATION_COUNT_SUCCESS,
  NOTIFICATION_COUNT_ERROR,
} from "../constants/Notification-constant";
import { createSSE } from "../services/Notification-service";
export const createNotification = () => {
  return (dispatch) => {
    dispatch(requestNotifications());
    createSSE()
      .then((response) => {
        dispatch(NotificationSuccess(response));
      })
      .catch((error) => {
        dispatch(NotificationError(error));
      });
  };

  function requestNotifications() {
    return { type: NOTIFICATION_COUNT_REQUEST };
  }

  function NotificationSuccess(response) {
    return { type: NOTIFICATION_COUNT_SUCCESS, response };
  }

  function NotificationError(response) {
    return { type: NOTIFICATION_COUNT_ERROR, response };
  }
};
