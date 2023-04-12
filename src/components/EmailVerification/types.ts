export const EMAIL_API_RESULT_TYPE = {
  pause: 'pause', // 5분간 재전송 금지,
  overSending: 'overSending', //이메일 인증 횟수 초과
  duplicate: 'duplicate', //이메일 중복
  success: 'success',
  serverError: 'serverError',
} as const;

export type EmailAPIResultType = keyof typeof EMAIL_API_RESULT_TYPE;

export type EmailAPIResult = {
  type: EmailAPIResultType;
  msg?: string;
};
