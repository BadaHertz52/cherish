import { httpClient } from './index';

export const withdrawal = async () => {
  await httpClient.delete(`/member/delete`);
};

export type ModifyMemberInformationParams = {
  nickName: string;
  jobName: string;
  currentPassword: string;
  nextPassword: string;
};

export const modifyMemberInformation = (params: ModifyMemberInformationParams) => {
  return httpClient.patch('/member/change-info', params);
};
