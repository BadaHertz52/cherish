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
export type AgreementStateType = {
  termsAndCondition: boolean; //이용약관
  personalInformation: boolean; // 개인정보 수집 및 이용
  ageCondition: boolean;
  marketing: boolean; // 마케팅 정보 활용 동의
};
const termsCheckBoxName = {
  termsAndCondition: 'termsAndCondition',
  personalInformation: 'personalInformation',
  ageCondition: 'ageCondition',
  marketing: 'marketing',
} as const;
export type TermsCheckBoxNameType = keyof typeof termsCheckBoxName;
//⚠️ sessionData property 명과 각 화원가입단계의 입력란이 input 인 경우애는 name  value 맞추기 (ex: name, email)
export const sessionDataKey = {
  ...inputFormId,
  job: 'job',
  gender: 'gender',
  birth: 'birth',
};
export type SessionDataKeyType = keyof typeof sessionDataKey;
// sessionStore 의 item 은 SessionDataType[]의 형태로 나옴
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
  'blue-collar': 'blue-collar', //노동 생산직
  'self-employment': 'self-employment', //자영업자
  student: 'student', //삭생
  homemaker: 'homemaker', // 가정주부
  inoccupation: 'inoccupation', // 무직
  etc: 'etc', //기타
} as const;
export type JobType = keyof typeof job;
type JobCheckBoxType = {
  name: JobType;
  label: string;
};
export const jobCheckBoxArr: JobCheckBoxType[] = [
  { name: 'profession', label: '전문직' },
  { name: 'management', label: '경영/관리직' },
  { name: 'desk', label: '사무직' },
  { name: 'service', label: '판매/서비스직' },
  { name: 'blue-collar', label: '노동/생산직' },
  { name: 'self-employment', label: '자영업' },
  { name: 'student', label: '학생' },
  { name: 'homemaker', label: '전업주부' },
  { name: 'inoccupation', label: '무직' },
  { name: 'etc', label: '기타' },
];

export type SignUpStateType = {
  progress: SignUpProgressType;
  agreeToTerms: AgreementStateType;
  name: string | null;
  nickname: string | null;
  email: string | null;
  pw: string | null;
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
  required: '필수 입력 항목이에요.',
  invalidName: '2~20자의 한글,영문(대소문자)를 사용하세요',
  invalidNickName: '3~10자의 한글,영문(대소문자),숫자를 사용하세요',
  invalidEmail: '올바르지 않은 형식의 이메일이에요.',
  invalidPw: '8~20자의 영문(대소문자),숫자 및 특수기호(!,@,^)를 혼용하여 입력하세요',
  invalidConfirmPw: '비밀번호가 일치하지 않아요.',
};
export type InputDataType = {
  value: string;
  errorMsg: string | null;
};
export const initialInputData: InputDataType = {
  value: '',
  errorMsg: null,
};
