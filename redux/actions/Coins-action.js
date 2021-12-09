import {
  COINS_REQUEST,
  COINS_SUCCESS,
  COINS_ERROR,
} from "../constants/Coins-constant";
import { CoinsService } from "../services/Coins-service";

const UpdateCoins = () => {
  return (dispatch) => {
    dispatch(requestCoins());
    CoinsService.GetCoins()
      .then((response) => {
        dispatch(CoinsSuccess(response));
      })
      .catch((error) => {
        dispatch(CoinsError(error));
      });
  };
  function requestCoins() {
    return { type: COINS_REQUEST };
  }

  function CoinsSuccess(response) {
    return { type: COINS_SUCCESS, response };
  }

  function CoinsError(response) {
    return { type: COINS_ERROR, response };
  }
};

export default UpdateCoins;
