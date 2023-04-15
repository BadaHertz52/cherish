import axios from 'axios';
export const httpClient = axios.create({
  //import.meta.env.VITE_SERVER_API_URL,
  baseURL: import.meta.env.VITE_MOCK_SERVER_URL,
});
