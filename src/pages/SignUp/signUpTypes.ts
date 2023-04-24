//⚠️ singUpProgress 순서는 꼭 회원가입 진행 단계 순서과 일치하게 할 것
export const SIGN_UP_PROGRESS = {
  agreeToTerms: 'agreeToTerms',
  nameAndNickName: 'nameAndNickName', // name 이랑 nickname 같이
  email: 'email',
  pw: 'pw',
  genderAndBirth: 'genderAndBirth',
  job: 'job',
} as const;
export type SignUpProgressType = keyof typeof SIGN_UP_PROGRESS;
// 약관 동의란에는 progressBar가 필요 없음
export const PROGRESS_ARR: SignUpProgressType[] = [
  SIGN_UP_PROGRESS.agreeToTerms,
  SIGN_UP_PROGRESS.nameAndNickName,
  SIGN_UP_PROGRESS.email,
  SIGN_UP_PROGRESS.pw,
  SIGN_UP_PROGRESS.genderAndBirth,
  SIGN_UP_PROGRESS.job,
];
export const INPUT_FORM_ID = {
  name: 'name',
  nickName: 'nickName',
  email: 'email',
  pw: 'pw',
  confirmPw: 'confirmPw',
};
export type InputFormIdType = keyof typeof INPUT_FORM_ID;
export type AgreementStateType = {
  termsOfUse: boolean; //이용약관
  personalInformation: boolean; // 개인정보 수집 및 이용
  ageCondition: boolean;
  marketing: boolean; // 마케팅 정보 활용 동의
};
export const TERMS_CONTENTS_NAME = {
  termsOfUse: 'termsOfUse',
  personalInformation: 'personalInformation',
  marketing: 'marketing',
} as const;
export type TermsContentsNameType = keyof typeof TERMS_CONTENTS_NAME;
export const TERMS_CHECK_BOX_NAME = {
  ...TERMS_CONTENTS_NAME,
  ageCondition: 'ageCondition',
} as const;
export type TermsCheckBoxNameType = keyof typeof TERMS_CHECK_BOX_NAME;
//⚠️ sessionData property 명과 각 화원가입단계의 입력란이 input 인 경우애는 name  value 맞추기 (ex: name, email)
export const SIGN_UP_SESSION_DATA_KEY = {
  ...INPUT_FORM_ID,
  job: 'job',
  gender: 'gender',
  birth: 'birth',
};
export type SignUpSessionDataKeyType = keyof typeof SIGN_UP_SESSION_DATA_KEY;
// sessionStore 의 item 은 SignUpSessionDataType[]의 형태로 나옴
export type SignUpSessionDataType = {
  key: SignUpSessionDataKeyType;
  value: string;
};
export const GENDER_TYPE = {
  male: '남성',
  female: '여성',
};
export type GenderType = keyof typeof GENDER_TYPE;
export const JOB_TYPE = {
  profession: '전문직', //전문직
  managementAndDesk: '관리/사무직', // 관리 /사무직
  service: '판매/서비스직', // 판매/서비스직
  blueCollar: '노동/생산직', //노동 생산직
  selfEmployment: '자영업', //자영업자
  student: '학생', //학생
  homemaker: '전업주부', // 가정주부
  inoccupation: '무직', // 무직
  jobEtc: '기타', //기타
} as const;
export type JobType = keyof typeof JOB_TYPE;
type JobRadioBtnType = {
  name: JobType;
};
export const JOB_ARR: JobRadioBtnType[] = [
  { name: JOB_TYPE.profession as JobType },
  { name: JOB_TYPE.managementAndDesk as JobType },
  { name: JOB_TYPE.service as JobType },
  { name: JOB_TYPE.blueCollar as JobType },
  { name: JOB_TYPE.selfEmployment as JobType },
  { name: JOB_TYPE.student as JobType },
  { name: JOB_TYPE.homemaker as JobType },
  { name: JOB_TYPE.inoccupation as JobType },
  { name: JOB_TYPE.jobEtc as JobType },
];
export type BirthDateType = {
  year: string;
  month: string;
  date: string;
};
export type SignUpStateType = {
  progress: SignUpProgressType;
  agreeToTerms: AgreementStateType;
  name?: string;
  nickname?: string;
  email?: string;
  pw?: string;
  gender?: GenderType;
  birth?: BirthDateType;
  job?: JobType;
};
export const ERROR_MSG = {
  required: '필수 입력 항목이에요.',
  invalidName: '한글 또는 영문을 사용하여 2-20자내로 입력하세요.',
  invalidNickName: '한글,영문,숫자 중 1가지 이상을 사용하여 3-10자 내로 입력하세요',
  invalidEmail: '올바르지 않은 형식의 이메일이에요.',
  invalidAuthNumber: '인증번호가 일치하지 않아요.',
  invalidPw: '영문,숫자,특수기호(!,@,^)을 최소 1가지씩 사용하여 8-20자내로 입력하세요.',
  invalidConfirmPw: '비밀번호가 일치하지 않아요.',
  duplicatedEmail: '이미 회원가입된 이메일이에요.',
  notExistEmail: '해당 이메일로 가입한 이력이 없어요.',
};
export type ErrorType = keyof typeof ERROR_MSG;
export type TestResultType = ErrorType | 'pass';
export type InputDataType = {
  value: string | GenderType;
  errorType?: ErrorType;
};
export const initialInputData: InputDataType = {
  value: '',
};
export type RequiredErrorMsgType = 'required';
export type GenderStateType = {
  value?: GenderType;
  errorType?: RequiredErrorMsgType;
};

export type BirthStateType = {
  value?: BirthDateType;
  errorType?: RequiredErrorMsgType;
};

export type JobStateType = {
  value?: JobType;
  errorType?: RequiredErrorMsgType;
};
