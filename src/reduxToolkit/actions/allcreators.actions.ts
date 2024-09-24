import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiBaseUrl,fanjoyjoy} from '../../../env';
import EncryptedStorage from 'react-native-encrypted-storage';

export const fanjoyallData: any = createAsyncThunk(
  'fanjoyallData',
  async (_, {rejectWithValue}) => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + Token);
      const data = await fetch(`${apiBaseUrl}${fanjoyjoy}`, {
        method: 'GET',
        headers: myHeaders,
      });
      return data.json();
    } catch (error: any) {
      return rejectWithValue('');
    }
  },
);
