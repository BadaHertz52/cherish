import axios, { AxiosError } from 'axios';

import { APIErrorData } from './types';
export const httpClient = axios.create({
  //baseURL: import.meta.env.VITE_SERVER_API_URL,
  //import.meta.env.VITE_SERVER_API_URL,
  // mock server test- >import.meta.env.VITE_MOCK_SERVER_URL,
});

export const handleAxiosError = (axiosError: AxiosError) => {
  const errorResponse = axiosError.response;
  if (errorResponse && errorResponse.status === 400) {
    const { message } = errorResponse.data as APIErrorData;
    console.error(message);
  }
};
