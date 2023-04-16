import axios, { AxiosError, AxiosResponse } from 'axios';

import { LogInAPIParams } from './types';

import { handleAxiosError, httpClient } from '.';
const LOG_IN_PATH = '/public/member/login';
const TOKEN_REFRESH_PATH = '/public/token/refresh';
// item key
export const LOG_IN_API_ITEM_KEY = {
  logIn: 'logIn', // 사용자 로그인 여부 (sessionStorage)
  logInNow: 'logIn_now', // 사용자가 방금 로그인 했는지 (sessionStorage)
  accessExpireTime: 'access_expire_time', // accessToken 만료 시간 1분 전 (sessionStorage)
  keepLogIn: 'keepLogIn', // 자동 로그인 여부 (localStorage)
  reLogIn: 'reLogIn', // refreshToken 만료 로 인한 재로그인 (sessionStorage)
};

// 로그인 성공 시 token 처리
export const onLogInSuccess = (response: AxiosResponse, keepLogIn: boolean) => {
  const { accessToken } = response.data;
  console.log('access token', accessToken);
  //access token - 로컬 변수로 이용
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  axios.defaults.withCredentials = true;
  // refresh token -httpOnly Cookie 에 저장할  경우
  //자동 로그인 여부를 localStorage에 저장해 ,  나중에 사이트 방문 시 로그인 자동 여부를 판별할 수 있도록 함
  if (keepLogIn) {
    localStorage.setItem('keepLogIn', JSON.stringify(true));
  } else {
    if (localStorage.getItem('keepLogIn')) {
      localStorage.removeItem('keepLogIn');
    }
  }
};
// token refresh (refresh token을 클라이언트에 접근할 수 있는 경우를 가정해 작성했음)
export const onSilentRefresh = async (keepLogIn: boolean) => {
  try {
    const response = await httpClient.post(TOKEN_REFRESH_PATH);
    if (response.status === 200) {
      onLogInSuccess(response, keepLogIn);
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      // refresh token 만료 - 로그인 페이지 이동
      sessionStorage.setItem('reLogIn', JSON.stringify(true));
      location.href = window.location.protocol + '//' + window.location.host + '/' + 'login';
    }
  }
};
export const onLogIn = async (params: LogInAPIParams, keepLogIn: boolean) => {
  try {
    const response = await httpClient.post(LOG_IN_PATH, params, {
      withCredentials: true,
    });
    if (response.status === 200) {
      onLogInSuccess(response, keepLogIn);
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    handleAxiosError(axiosError);
  }
};

window.onbeforeunload = () => {
  const item = localStorage.getItem('keepLogIn');
  onSilentRefresh(item !== null);
};
