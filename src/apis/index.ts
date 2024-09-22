import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

export default client;

export const publicDataClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_DATA_BASE_URL,
});
