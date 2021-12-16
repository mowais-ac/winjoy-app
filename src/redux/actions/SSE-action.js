import {
  NOTIFICATION_COUNT_REQUEST,
  NOTIFICATION_COUNT_SUCCESS,
  NOTIFICATION_COUNT_ERROR,
} from "../constants/SSE-constants";
import { createNotificationService } from "../services/SSE-service";

export const createNotification = (params) => {
  return (dispatch) => {
    dispatch(NotificationRequest(params));
    createNotificationService
      .then((response) => {
        dispatch(NotificationSuccess(response));
      })
      .catch((error) => {
        dispatch(NotificationError(error));
      });
  };

  function NotificationRequest(params) {
    return { type: NOTIFICATION_COUNT_REQUEST, params };
  }

  function NotificationSuccess(response) {
    return { type: NOTIFICATION_COUNT_SUCCESS, response };
  }

  function NotificationError(response) {
    return { type: NOTIFICATION_COUNT_ERROR, response };
  }
};
