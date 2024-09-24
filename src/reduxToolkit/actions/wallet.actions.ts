import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiBaseUrl, wallet} from '../../../env';
import EncryptedStorage from 'react-native-encrypted-storage';

export const walletData: any = createAsyncThunk(
  'walletData',
  async (_, {rejectWithValue}) => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + Token);
      const data = await fetch(`${apiBaseUrl}${wallet}`, {
        method: 'GET',
        headers: myHeaders,
      });
      return data.json();
    } catch (error: any) {
      return rejectWithValue('');
    }
  },
);
