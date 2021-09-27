import { UPDATE_BELL } from "../constants/Bell-constant";

export const UpdateBell = (params) => {
  return (dispatch) => {
    dispatch(UpdateCount(params));
  };

  function UpdateCount(count) {
    return { type: UPDATE_BELL, count };
  }
};
