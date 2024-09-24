import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiBaseUrl,dealsjoy} from '../../../env';
import EncryptedStorage from 'react-native-encrypted-storage';

export const dealsjoyallData: any = createAsyncThunk(
  'dealsjoyallData',
  async (_, {rejectWithValue}) => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + Token);
      const data = await fetch(`${apiBaseUrl}${dealsjoy}`, {
        method: 'GET',
        headers: myHeaders,
      });
      return data.json();
    } catch (error: any) {
      return rejectWithValue('');
    }
  },
);
