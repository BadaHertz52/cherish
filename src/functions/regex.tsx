import { INPUT_FORM_ID, InputFormIdType, TestResultType } from '@/pages/SignUp/signUpTypes';

export const REGEX = {
  //2~20자 (한글, 영문)
  name: new RegExp('^[ㄱ-ㅎ가-힣a-zA-Z]{2,20}$'),
  //3~10자 (한글, 영문, 숫자)
  nickName: new RegExp('^[ㄱ-ㅎ가-힣a-zA-Z0-9]{3,10}$'),
  email: new RegExp(
    '^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$',
  ),
  //8~20자 (영문 + 숫자 + 특수기호(!@^))
  pw: new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@^])[a-zA-z0-9!@^]{8,20}$'),
};

export const checkRegex = (text: string, id: InputFormIdType): TestResultType => {
  let result: TestResultType = 'pass';
  switch (id) {
    case INPUT_FORM_ID.name:
      result = REGEX.name.test(text) ? 'pass' : 'invalidName';
      break;
    case INPUT_FORM_ID.nickName:
      result = REGEX.nickName.test(text) ? 'pass' : 'invalidNickName';
      break;
    case INPUT_FORM_ID.email:
      result = REGEX.email.test(text) ? 'pass' : 'invalidEmail';
      break;
    case INPUT_FORM_ID.pw:
      result = REGEX.pw.test(text) ? 'pass' : 'invalidPw';
      break;
    case INPUT_FORM_ID.confirmPw:
      const inputPwEl = document.querySelector('#input-pw') as HTMLInputElement | null;
      result = inputPwEl?.value === text ? 'pass' : 'invalidConfirmPw';
    default:
      break;
  }
  return result;
};
