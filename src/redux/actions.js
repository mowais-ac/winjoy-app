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
            if (json && json.status === "success") {
                dispatch({
                    type: types.GET_WALLET_DATA,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!',json);
            }
        }
    } catch (error) {
       alert(error)
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
            if (json && json.status === "success") {
                dispatch({
                    type: types.GET_LANDING_DATA,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
       alert(error)
    }
}
export const getProducts = (isClosing) => {
  
    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/products/list?is_closing_soon=${isClosing}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json && json.status === "success") {
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
export const getLiveShowPlans = () => {

    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/gameshow_live_plans`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json && json.status === "success") {
                dispatch({
                    type: types.GET_LIVE_PLANS,
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
export const getAllCreator = () => {

    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/fanjoy/index`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();

            if (json && json.status === "success") {
                dispatch({
                    type: types.GET_FANJOY_DATA,
                    payload: json
                });
            } else {
                console.log('Unable to fetch fanjoyAPI!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const GetGalleryData = (id) => {
    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/gallery/index?user_id=${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json && json.status === "success") {
                dispatch({
                    type: types.GALLERY_DATA,
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
export const GetCreatorPageData = (id) => {
    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/celebrity/detail/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json && json.status === "success") {
                dispatch({
                    type: types.CREATOR_PAGE_DATA,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!',json);
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const ExperienceProductData = (id) => {
    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/experience/product_list?experience_id=${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json && json.status === "success") {
                dispatch({
                    type: types.WIN_EXPERIENCE_PRODUCT_DATA,
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
export const ExperienceProductDetal = (expId, productId) => {
    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/experience/${expId}/product/detail/${productId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            
            if (json && json.status === "success") {
                dispatch({
                    type: types.EXPERIENCE_PRODUCT_DETAILS,
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
export const ExperienceDetals = (experience_id,celebrity_id) => {
    console.log(experience_id,celebrity_id);
    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/experience/detail?experience_id=${experience_id}&celebrity_id=${celebrity_id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            
            if (json && json.status === "success") {
                dispatch({
                    type: types.EXPERIENCE_DETAILS,
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
export const GameShowWinners = () => {

    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/gameshow/winners`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json) {
                dispatch({
                    type: types.GAME_SHOW_WINNERS,
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
export const LuckyDrawWinnersAPI = () => {

    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/luckydraw/winners`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json) {
                dispatch({
                    type: types.LUCKY_DRAW_WINNERS,
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
export const LeaderBoardWinners = () => {

    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/leaderboard`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            
            if (json) {
                dispatch({
                    type: types.LEADER_BOARD_WINNERS,
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
export const DealsJoyAPI = () => {

    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/dealsjoy/index`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            
            if (json) {
                dispatch({
                    type: types.DEALS_JOY,
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
export const TriviaJoyAPI = () => {

    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/triviajoy/index`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json) {
                dispatch({
                    type: types.TRIVIA_JOY,
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
export const CheckGameEnterStatus = () => {

    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/joinGameshow`, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json) {
                dispatch({
                    type: types.GAME_ENTER_STATUS,
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



