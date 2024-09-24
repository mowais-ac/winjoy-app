import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiBaseUrl,fanjoyjoy, triviajoy} from '../../../env';
import EncryptedStorage from 'react-native-encrypted-storage';

export const triviajoyallData: any = createAsyncThunk(
  'triviajoyallData',
  async (_, {rejectWithValue}) => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + Token);
      const data = await fetch(`${apiBaseUrl}${triviajoy}`, {
        method: 'GET',
        headers: myHeaders,
      });
      return data.json();
    } catch (error: any) {
      return rejectWithValue('');
    }
  },
);
