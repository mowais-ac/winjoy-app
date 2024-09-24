import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiBaseUrl, home} from '../../../env';
import EncryptedStorage from 'react-native-encrypted-storage';

export const homeData: any = createAsyncThunk(
  'homeData',
  async (_, {rejectWithValue}) => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + Token);
      const data = await fetch(`${apiBaseUrl}${home}`, {
        method: 'GET',
        headers: myHeaders,
      });
      return data.json();
    } catch (error: any) {
      return rejectWithValue('');
    }
  },
);
