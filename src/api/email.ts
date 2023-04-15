import { AxiosError } from 'axios';

import {
  APIErrorData,
  EMAIL_API_RESULT_TYPE,
  EmailAPIResultType,
  EmailVerificationParams,
} from './types';

import { httpClient } from '.';

const EMAIL_VERIFICATION_PATH = {
  signUp: '/public/member/register/code',
  findPw: '/public/member/change-password/code',
};

export const onEmailVerification = async (
  params: EmailVerificationParams,
  isInFindPw: boolean,
): Promise<EmailAPIResultType> => {
  let result: EmailAPIResultType = EMAIL_API_RESULT_TYPE.axiosError;
  try {
    const path = isInFindPw ? EMAIL_VERIFICATION_PATH.findPw : EMAIL_VERIFICATION_PATH.signUp;
    const response = await httpClient.post(path, params);
    if (response.status === 200) {
      result = EMAIL_API_RESULT_TYPE.success;
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorResponse = axiosError.response;
    if (errorResponse && errorResponse.status === 400) {
      const { message } = errorResponse.data as APIErrorData;
      if (message.includes('가입')) {
        //중복 이메일
        result = EMAIL_API_RESULT_TYPE.duplicate;
      }
      if (message.includes('5분')) {
        //5분간 이메일 전송 금지
        result = EMAIL_API_RESULT_TYPE.pause;
      }
      if (message.includes('초과')) {
        // 하루 인증 횟수 초과
        result = EMAIL_API_RESULT_TYPE.overSending;
      }
      if (message.includes('에러')) {
        // 알 수 없는 서버 에러
        result = EMAIL_API_RESULT_TYPE.serverError;
      }
    } else {
      result = EMAIL_API_RESULT_TYPE.axiosError;
    }
  }
  return result;
};
