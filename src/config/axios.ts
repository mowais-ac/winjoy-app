import axios from 'axios';
import {apiBaseUrl} from '../../env';
import {store} from '../reduxToolkit';

const API_SERVER = apiBaseUrl;

const reqConfig = {
  baseURL: API_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
};

const AXIOS = axios.create(reqConfig);

AXIOS.interceptors.request.use(
  async config => {
    let myConfig: any = config;
    const userReducer: any = store.getState?.()?.user || {};
    if (userReducer?.user_data) {
      const TOKEN: string = userReducer?.user_data?.token || '';
      myConfig = {
        ...config,
        headers: {
          ...(config?.headers || {}),
          ...(!!TOKEN ? {Authorization: `Bearer ${TOKEN || ''}`} : {}),
        },
      };
    }
    return myConfig;
  },
  err => {
    return Promise.reject(err);
  },
);

// Add a response
AXIOS.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    return Promise.reject(err);
  },
);

export const setAuthTokenInAxios = async (token?: string) => {
  try {
    const userReducer: any = store?.getState?.()?.user;
    const TOKEN: string = token || userReducer?.user_data?.token || '';
    if (!!TOKEN) {
      axios.defaults.headers.common.Authorization = `Bearer ${TOKEN}`;
    }
  } catch (error) {
    console.log('error in setAxiosToken ===> ', error);
  }
};

setTimeout(() => {
  setAuthTokenInAxios?.();
}, 1500);

export default AXIOS;
