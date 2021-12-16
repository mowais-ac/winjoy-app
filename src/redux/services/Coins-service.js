import Config from "react-native-config";
import EncryptedStorage from "react-native-encrypted-storage";

const GetCoins = async () => {
  const Token = await EncryptedStorage.getItem("Token");
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await fetch(
    `${Config.API_URL}/user/current-balance`,
    requestOptions
  );
  const res = await response.json();
  if (res.status && res.status.toLowerCase() === "success") {
    // return { data: res.data };
    let coins = { data: [{ "Gold Coins": res.data[0]["Gold Coins"] }] };
    await fetch(`${Config.API_URL}/credit/balance`, requestOptions)
      .then(async (response) => response.json())
      .then((res) => {
        coins.data[0] = {
          ...coins.data[0],
          "Gold Credit": res.outstanding_balance,
        };
      });
    return coins;
  }
  return { data: [Coins.Balance] };
};

export const CoinsService = {
  GetCoins,
};
