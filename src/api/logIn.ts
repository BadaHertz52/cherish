import axios, { AxiosResponse } from 'axios';

import { httpClient } from '.';
const LOG_IN_PATH = '/public/member/login';
const TOKEN_REFRESH_PATH = '/public/token/refresh';

export type LogInParams = {
  email: string;
  password: string;
};
export type LogInData = {
  accessToken: string;
  refreshToken: string;
};

// 로그인 성공 시 token 처리
export const onLogInSuccess = (response: AxiosResponse, keepLogIn: boolean) => {
  const { accessToken } = response.data;
  //access token - 로컬 변수로 이용
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
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
    const data = {
      refreshToken: '',
    };
    const response = await httpClient.post(TOKEN_REFRESH_PATH, data);
    if (response.status === 200) {
      onLogInSuccess(response, keepLogIn);
    }
    if (response.status === 401) {
      // refresh token 만료 - 로그인 페이지 이동
      sessionStorage.setItem('reLogIn', JSON.stringify(true));
      location.href = window.location.protocol + '//' + window.location.host + '/' + 'login';
    }
  } catch (error) {}
};
export const onLogIn = async (params: LogInParams, keepLogIn: boolean) => {
  try {
    const response = await httpClient.post(LOG_IN_PATH, params);
    if (response.status === 200) {
      onLogInSuccess(response, keepLogIn);
    }
  } catch (error) {
    console.error(error);
  }
};

window.onbeforeunload = () => {
  const item = localStorage.getItem('keepLogIn');
  onSilentRefresh(item !== null);
};
