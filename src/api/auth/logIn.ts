import { AxiosError, AxiosResponse } from 'axios';

import { handleAxiosError, httpClient } from '../index';

import { APIResult, LogInAPIParams } from './types';

const LOG_IN_PATH = '/public/member/login';
const TOKEN_REFRESH_PATH = '/public/token/refresh';
// item key
export const LOG_IN_API_ITEM_KEY = {
  logIn: 'logIn', // 사용자 로그인 여부 (sessionStorage)
  keepLogIn: 'keepLogIn', // 자동 로그인 여부 (localStorage)
  reLogIn: 'reLogIn', // refreshToken 만료 로 인한 재로그인 (sessionStorage)
};

// token refresh
export const onSilentRefresh = async () => {
  //  사용자가 로그인 상태  일때만 실행
  if (
    sessionStorage.getItem(LOG_IN_API_ITEM_KEY.logIn) ||
    localStorage.getItem(LOG_IN_API_ITEM_KEY.keepLogIn)
  ) {
    try {
      const response = await httpClient.post(TOKEN_REFRESH_PATH);
      if (response.status === 200) {
        onLogInSuccess(response);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        // refresh token 만료 - 로그인 페이지 이동
        sessionStorage.setItem(LOG_IN_API_ITEM_KEY.reLogIn, JSON.stringify(true));
        window.location.pathname = '/login';
      }
    }
  }
};
// 로그인 성공 시 token 처리
export const onLogInSuccess = (response: AxiosResponse) => {
  const { accessToken } = response.data;
  //access token - 변수로 이용
  httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  httpClient.defaults.withCredentials = true;
  // 로그아웃시 , sessionStorage에서 LOG_IN_API_ITEM_KEY.logIn 삭제!!!
  !sessionStorage.getItem(LOG_IN_API_ITEM_KEY.logIn) &&
    sessionStorage.setItem(LOG_IN_API_ITEM_KEY.logIn, 'true');
  if (location.pathname === '/login' || location.pathname === '/signup') {
    window.location.pathname = '/';
  }
  //accessToken 만료 시간 1분 전
  // access token 민료 시점에 onSilentRefresh 실행
  setTimeout(() => {
    onSilentRefresh();
  }, 29 * 60 * 1000);
};

export const onLogIn = async (params: LogInAPIParams) => {
  let result: APIResult = { success: false };
  try {
    const response = await httpClient.post(LOG_IN_PATH, params, { withCredentials: true });
    if (response.status === 200) {
      onLogInSuccess(response);
      result = { success: true };
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    handleAxiosError(axiosError);
    result = { success: false };
  }
  return result;
};
