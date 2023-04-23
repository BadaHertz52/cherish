import { AxiosError } from 'axios';

import { handleAxiosError, httpClient } from '../index';

import { APIResult, SignUpAPIParams } from './types';

const SIGN_UP_API_PATH = '/public/member/register';

export const onSignUp = async (params: SignUpAPIParams) => {
  let result: APIResult = { success: false };
  try {
    const response = await httpClient.post(SIGN_UP_API_PATH, params);
    if (response.status === 201) {
      result = { success: true };
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    handleAxiosError(axiosError);
    result = { success: false };
  }
  return result;
};
