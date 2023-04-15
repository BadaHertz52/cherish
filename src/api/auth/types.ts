import { GenderType } from '@/pages/SignUp/signUpTypes';

export type APIErrorData = {
  message: string;
};
export type AuthNumberAPIParams = {
  email: string;
  code: string;
};

export type APIResult = {
  success: boolean;
};
export type EmailVerificationAPIParams = {
  email: string;
};

export const EMAIL_API_RESULT_TYPE = {
  pause: 'pause', // 5분간 재전송 금지,
  overSending: 'overSending', //이메일 인증 횟수 초과
  duplicate: 'duplicate', //이메일 중복
  success: 'success',
  serverError: 'serverError',
} as const;

export type EmailAPIResultType = keyof typeof EMAIL_API_RESULT_TYPE;

export type LogInAPIParams = {
  email: string;
  password: string;
};
export type LogInAPIResultData = {
  accessToken: string;
};

export type SignUpAPIParams = {
  name: string;
  nickName: string;
  email: string; // 이메일
  password: string; // 패스워드
  infoCheck: boolean; // 광고성 동의
  gender: 'NONE' | GenderType; //nullable
  birth: Date; // 생일; nullable
  job: string; //nullable
};
