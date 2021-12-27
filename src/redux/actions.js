import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";

import types from './types';
const API_URL = 'https://mocki.io/v1/48419bdb-1d76-45a1-89cb-3ac3fcc7f6ca';



export const UpdateBell = (params) => {
  return (dispatch) => {
    dispatch(UpdateCount(params));
  };

  function UpdateCount(count) {
    return { type: types.UPDATE_BELL, count }; 
  }
};


export const getWalletData = () => {
   
    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/wallet`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                  },
            });
            const json = await result.json();
            if (json&&json.status === "success") {
                dispatch({
                    type: types.GET_WALLET_DATA,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const getLandingScreen = () => {
   
    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/home`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                  },
            });
            const json = await result.json();
            if (json&&json.status === "success") {
                dispatch({
                    type: types.GET_LANDING_DATA,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const getProducts = () => {
   
    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/products/list`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                  },
            });
            const json = await result.json();
            if (json&&json.status === "success") {
                dispatch({
                    type: types.GET_PRODUCTS_LIST,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}

