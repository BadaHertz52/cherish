import { httpClient } from './index';

export type ModifyMemberInformationParams = {
  nickName: string;
  jobName: string;
  currentPassword: string;
  nextPassword: string;
};

export const modifyMemberInformation = (params: ModifyMemberInformationParams) => {
  return httpClient.patch('/member/change-info', params);
};
