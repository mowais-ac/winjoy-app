import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiBaseUrl, celebsList, home} from '../../../env';
import EncryptedStorage from 'react-native-encrypted-storage';

export const getProducts: any = createAsyncThunk(
  'getProducts',
  async (link, {rejectWithValue}) => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + Token);
      const data = await fetch(`${apiBaseUrl}${celebsList}${link}`, {
        method: 'GET',
        headers: myHeaders,
      });
      return data.json();
    } catch (error: any) {
      return rejectWithValue('');
    }
  },
);
