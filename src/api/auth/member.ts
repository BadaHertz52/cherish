import { httpClient } from './index';

export const withdrawal = async () => {
  await httpClient.delete(`/member/delete`);
};
