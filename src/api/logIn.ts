import { httpClient } from '.';
const LOG_IN_PATH = '/public/member/login';

export type LogInParams = {
  email: string;
  password: string;
};
export type LogInData = {
  accessToken: string;
  refreshToken: string;
};

export const postLogInData = async (params: LogInParams) => {
  try {
    const response = await httpClient.post(LOG_IN_PATH, params);
    if (response.status === 200) {
      return response.data as LogInData;
    }
  } catch (error) {
    console.error(error);
  }
};
