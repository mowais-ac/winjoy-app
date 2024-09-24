import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiBaseUrl, joinGame} from '../../../env';
import EncryptedStorage from 'react-native-encrypted-storage';

export const joingameshowData: any = createAsyncThunk(
  'joingameshowData',
  async (_, {rejectWithValue}) => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + Token);
      const data = await fetch(`${apiBaseUrl}${joinGame}`, {
        method: 'GET',
        headers: myHeaders,
      });
      return data.json();
    } catch (error: any) {
      return rejectWithValue('');
    }
  },
);
