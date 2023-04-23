import { AxiosError } from 'axios';

import { handleAxiosError, httpClient } from '../index';

import { APIResult, FindPwAPIParams } from './types';

const FIND_PW_API_PATH = '/public/member/change-password';

export const onFindPw = async (params: FindPwAPIParams) => {
  let result: APIResult = { success: false };
  try {
    const response = await httpClient.post(FIND_PW_API_PATH, params);
    if (response.status === 200) {
      result = { success: true };
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    handleAxiosError(axiosError);
    result = { success: false };
  }
  return result;
};
