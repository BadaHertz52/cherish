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
  noUser: 'noUser', // 해당 유저가 없음 (비밀번호 찾기 페이지에서 이메일 인증 시)
} as const;

export type EmailAPIResultType = keyof typeof EMAIL_API_RESULT_TYPE;

export type FindPwAPIParams = {
  email: string;
  password: string;
};
export type LogInAPIParams = {
  email: string;
  password: string;
};
export type LogInAPIResultData = {
  accessToken: string;
};
export type SignUpAPIParams = {
  name: string;
  nickname: string;
  email: string;
  password: string;
  infoCheck: boolean;
  gender: 'NONE' | 'MALE' | 'FEMALE';
  birth: Date | string; // [to do]
  job: string;
};
