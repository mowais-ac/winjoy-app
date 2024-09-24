import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiBaseUrl,leaderboard} from '../../../env';
import EncryptedStorage from 'react-native-encrypted-storage';

export const leaderboardData: any = createAsyncThunk(
  'leaderboardData',
  async (_, {rejectWithValue}) => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + Token);
      const data = await fetch(`${apiBaseUrl}${leaderboard}`, {
        method: 'GET',
        headers: myHeaders,
      });
      return data.json();
    } catch (error: any) {
      return rejectWithValue('');
    }
  },
);
