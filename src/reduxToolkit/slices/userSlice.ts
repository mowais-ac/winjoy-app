import {createSlice} from '@reduxjs/toolkit';
import {countryData} from '../actions/user.actions';

const userInitialState: any = {
  userData: null,
  totalLives: [],
  user_dataDetail: null,
  countryData: {
    data: [],
    error: false,
    loading: true,
  },
};

export const userSlice: any = createSlice({
  name: 'user',
  initialState: userInitialState || {},
  reducers: {
    resetUserSlice: () => userInitialState,
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserDataOTP: (state, action) => {
      state.user_dataDetail = action.payload;
    },
    clearUserData: state => {
      state.user_data = null;
      state.user_dataDetail = null;
    },
    usertotalLive: (state, action) => {
      state.totalLives = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(countryData.pending, state => {
        state.countryData.error = false;
        state.countryData.loading = true;
      })
      .addCase(countryData.fulfilled, (state, action) => {
        state.countryData.error = false;
        state.countryData.loading = false;
        state.countryData.data = action.payload;
      })
      .addCase(countryData.rejected, state => {
        state.countryData.error = true;
        state.countryData.loading = false;
      });
  },
});

export const {setUserData, setUserDataOTP, clearUserData, usertotalLive} =
  userSlice.actions;
