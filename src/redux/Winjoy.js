import axios from 'axios';
export const Winjoy = axios.create({
  baseURL: 'https://apiwinjoy.incubytes.com/api/',
  // baseURL: 'https://testing.winjoy.ae/public/api/',
});
