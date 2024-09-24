import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl, countries } from '../../../env';


export const countryData: any = createAsyncThunk(
  'countryData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetch(`${apiBaseUrl}${countries}`);   
        return data.json();
    } catch (error: any) {
      return rejectWithValue('');
    }
  },
);