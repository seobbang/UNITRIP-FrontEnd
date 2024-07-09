import axios, { AxiosInstance } from "axios";

const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

export default client;
