enum signUpProgress {
  agreeToTerms = 'agreeToTerms',
  nameAndNickName = 'nameAndNickNaem', // name 이랑 nickname 같이
  email = 'email',
  pw = 'pw',
  genderAndBirth = 'genderAndBirth',
  job = 'job',
}
export type SignUpProgressType = keyof typeof signUpProgress;
enum gender {
  male = 'male',
  female = 'female',
}
export type GenderType = keyof typeof gender;
enum job {
  profession = 'profession', //전문직
  management = 'management', //경영 관리
  desk = 'desk', //사무직
  service = 'service', // 서비스직
  blueCollar = 'blue-collar', //노동 생산직
  selfEmployment = 'self-employment', //자영업자
  student = 'student', //삭생
  homemaker = 'housemaker', // 가정주부
  inoccupation = 'inoccupation', // 무직
  etc = 'etc', //기타
}
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
