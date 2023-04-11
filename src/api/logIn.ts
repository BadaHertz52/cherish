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
export const setCookie = (name: string, value: string, keepLogIn: boolean, saveDate: number) => {
  const basicCookie =
    encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';' + 'samesite=lax;' + 'secure';
  if (keepLogIn) {
    const now = new Date();
    const date = new Date(now.setDate(now.getDate() + saveDate));
    const cookie = basicCookie + 'expires' + date.toUTCString();
    document.cookie = cookie;
  } else {
    document.cookie = basicCookie;
  }
};
export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
// 로그인 성공 시 token 처리
export const onLogInSuccess = (response: AxiosResponse, keepLogIn: boolean) => {
  const { accessToken, refreshToken } = response.data;
  //access token - 로컬 변수로 이용
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  // case 1. refresh token -httpOnly Cookie 에 저장할  경우
  // localStorage 의 keepLogIn == true 이면 웹 페이지 마운트 시 자동로그인
  if (keepLogIn) {
    localStorage.setItem('keepLogIn', 'true');
  } else {
    localStorage.setItem('keepLogIn', 'false');
  }
  // case2. refresh token 을  httpOnly Cookie 에 저장하지 않을 경우
  setCookie('refreshToken', refreshToken, keepLogIn, 14);
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
      sessionStorage.setItem('reLogIn', 'true');
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
