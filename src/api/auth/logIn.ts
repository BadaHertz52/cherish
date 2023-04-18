import axios, { AxiosError, AxiosResponse } from 'axios';

import { APIResult, LogInAPIParams } from './types';

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

// token refresh
export const onSilentRefresh = async (keepLogIn: boolean) => {
  //  사용자가 로그인 상태  일때만 실행
  if (sessionStorage.getItem(LOG_IN_API_ITEM_KEY.logIn)) {
    try {
      const response = await httpClient.post(TOKEN_REFRESH_PATH);
      if (response.status === 200) {
        onLogInSuccess(response, keepLogIn);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        // refresh token 만료 - 로그인 페이지 이동
        sessionStorage.setItem(LOG_IN_API_ITEM_KEY.reLogIn, JSON.stringify(true));
        location.href = window.location.protocol + '//' + window.location.host + '/' + 'login';
      }
    }
  }
};
// 로그인 성공 시 token 처리
export const onLogInSuccess = (response: AxiosResponse, keepLogIn: boolean) => {
  const { accessToken } = response.data;
  sessionStorage.setItem(LOG_IN_API_ITEM_KEY.logIn, 'true');
  //access token - 로컬 변수로 이용
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  axios.defaults.withCredentials = true;
  //accessToken 만료 시간 1분 전
  // access token 민료 시점에 onSilentRefresh 실행
  setTimeout(() => {
    onSilentRefresh(keepLogIn);
  }, 29 * 60 * 1000);
  // [to-do api] userInfo
  //자동 로그인 여부를 localStorage에 저장해 ,  나중에 사이트 방문 시 로그인 자동 여부를 판별할 수 있도록 함
  if (keepLogIn) {
    localStorage.setItem(LOG_IN_API_ITEM_KEY.keepLogIn, JSON.stringify(true));
  } else {
    if (localStorage.getItem(LOG_IN_API_ITEM_KEY.keepLogIn)) {
      localStorage.removeItem(LOG_IN_API_ITEM_KEY.keepLogIn);
    }
  }
  // 월별 큐레이션 페이지로 이동
  //[to do : 월별 큐레이션 경로 나오면 수정 ]
  if (location.pathname === '/login' || location.pathname === '/signup') {
    location.href = window.location.protocol + '//' + window.location.host + '/' + '월별큐레이션';
  }
};

export const onLogIn = async (params: LogInAPIParams, keepLogIn: boolean) => {
  let result: APIResult = { success: false };
  try {
    const response = await httpClient.post(LOG_IN_PATH, params, { withCredentials: true });
    if (response.status === 200) {
      onLogInSuccess(response, keepLogIn);
      result = { success: true };
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    handleAxiosError(axiosError);
    result = { success: false };
  }
  return result;
};
