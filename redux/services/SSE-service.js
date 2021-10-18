import Config from "react-native-config";
import EncryptedStorage from "react-native-encrypted-storage";
import RNEventSource from "react-native-event-source";

const Token = await EncryptedStorage.getItem("Token");

export const SSE = {
  createNotificationService,
};

function createNotificationService(params) {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${Token}`,
    },
  };
  const eventSource = new RNEventSource(
    `${Config.API_URL}/unread/notifications/count`,
    requestOptions
  );

  eventSource.addEventListener("message", (data) => {
    // console.log(data);
    // console.log(data.type); // message
    // console.log(data.data);
  });

  return eventSource;

  return Http.get(GET_COUNTRIES).then((response) => {
    const data = response.data;
    localStorage.setItem("countries", JSON.stringify(data));
    return {
      data,
      params: params,
    };
  });
}
