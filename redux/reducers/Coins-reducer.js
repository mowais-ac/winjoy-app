import { GetDate } from "../../Constants/Functions";
import {
  COINS_REQUEST,
  COINS_ERROR,
  COINS_SUCCESS,
} from "../constants/Coins-constant";

const initialState = {
  searching: true,
  isError: false,
  Balance: {
    "Gold Coins": "0.00",
    "Gold Credit": "0.00",
    // "Diamond Coins": "0.00",
  },
  date: GetDate(),
};

const Coins = (state = initialState, action) => {
  switch (action.type) {
    case COINS_REQUEST:
      return {
        ...state,
        searching: true,
      };
    case COINS_SUCCESS:
      return {
        ...state,
        searching: false,
        isError: false,
        Balance: action.response.data[0],
        date: GetDate(),
      };
    case COINS_ERROR:
      return {
        ...state,
        searching: false,
        isError: true,
        Error: action.response,
      };
    default:
      return state;
  }
};

export default Coins;
