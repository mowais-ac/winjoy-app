import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiBaseUrl, celebsList, experienceCeleb, home} from '../../../env';
import EncryptedStorage from 'react-native-encrypted-storage';

export const experiencecelebData: any = createAsyncThunk(
  'experiencecelebData',
  async (link, {rejectWithValue}) => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + Token);
      const data = await fetch(`${apiBaseUrl}${experienceCeleb}${link}`, {
        method: 'GET',
        headers: myHeaders,
      });
      return data.json();
    } catch (error: any) {
      return rejectWithValue('');
    }
  },
);
