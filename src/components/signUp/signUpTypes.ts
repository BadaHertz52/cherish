//⚠️ singUpProgress 순서는 꼭 회원가입 진행 단계 순서과 일치하게 할 것
const signUpProgress = {
  agreeToTerms: 'agreeToTerms',
  nameAndNickName: 'nameAndNickName', // name 이랑 nickname 같이
  email: 'email',
  pw: 'pw',
  genderAndBirth: 'genderAndBirth',
  job: 'job',
} as const;
export type SignUpProgressType = keyof typeof signUpProgress;
// 약관 동의란에는 progressBar가 필요 없음
export const progressArr: SignUpProgressType[] = [
  'agreeToTerms',
  'nameAndNickName',
  'email',
  'pw',
  'genderAndBirth',
  'job',
];
const inputFormId = {
  name: 'name',
  nickName: 'nickName',
  email: 'email',
  pw: 'pw',
  confirmPw: 'confirmPw',
};
export type InputFormIdType = keyof typeof inputFormId;
//⚠️ sessionData property 명과 각 화원가입단계의 입력란이 input 인 경우애는 name  value 맞추기 (ex: name, email)
export const sessionDataKey = {
  ...inputFormId,
  job: 'job',
  gender: 'gender',
  birth: 'birth',
};
export type SessionDataKeyType = keyof typeof sessionDataKey;
export type SessionDataType = {
  key: SessionDataKeyType;
  value: string;
};
const gender = {
  male: 'male',
  female: 'female',
} as const;
export type GenderType = keyof typeof gender;
const job = {
  profession: 'profession', //전문직
  management: 'management', //경영 관리
  desk: 'desk', //사무직
  service: 'service', // 서비스직
  blueCollar: 'blue-collar', //노동 생산직
  selfEmployment: 'self-employment', //자영업자
  student: 'student', //삭생
  homemaker: 'homemaker', // 가정주부
  inoccupation: 'inoccupation', // 무직
  etc: 'etc', //기타
} as const;
export type JobType = keyof typeof job;
export type SignUpStateType = {
  progress: SignUpProgressType;
  agreeToTerms: boolean;
  name: string | null;
  nickname: string | null;
  email: string | null;
  pw: number | null;
  confirmPw: number | null;
  gender: GenderType | null;
  birth: { year: number; month: number; date: number } | null;
  job: JobType | null;
};
const errorType = {
  required: 'required',
  invalidName: 'invalidName',
  invalidNickName: 'invalidNickName',
  invalidEmail: 'invalidEmail',
  invalidPw: 'invalidPw',
  invalidConfirmPw: 'invalidConfirmPw',
} as const;
export type ErrorType = keyof typeof errorType;
const pass = 'pass';
export type TestResultType = ErrorType | typeof pass;
//⚠️ ErrorType 과 ERROR_MSG의 property 명은 같아야함
export const ERROR_MSG = {
  required: '필수 정보 입니다.',
  invalidName: '2~20자의 한글, 영어를 사용하세요',
  invalidNickName: '3~10자의 한글, 영어를 사용하세요',
  invalidEmail: '유효하지 않은 이메일형식 압니다.',
  invalidPw: '8~20자의 소문자(영어), 숫자를 사용하세요',
  invalidConfirmPw: '비밀번호가 일치 하지 않습니다.',
};
export type InputDataType = {
  value: string;
  errorMsg: string | null;
};
