import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiBaseUrl, gallery} from '../../../env';
import EncryptedStorage from 'react-native-encrypted-storage';

export const galleryData: any = createAsyncThunk(
  'galleryData',
  async (link, {rejectWithValue}) => {
    try {
      const Token = await EncryptedStorage.getItem('Token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + Token);
      const data = await fetch(`${apiBaseUrl}${gallery}${link}`, {
        method: 'GET',
        headers: myHeaders,
      });
      return data.json();
    } catch (error: any) {
      return rejectWithValue('');
    }
  },
);
