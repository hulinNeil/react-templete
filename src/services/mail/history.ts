import { post } from '@/utils/send';

// 历史邮件API（mail history API）

export interface GetParamsType {
  begin: string;
  end: string;
  id: number;
  status: number;
  email: string;
  pageno: 1;
}

export const getHistory = (params: GetParamsType): Promise<any> => {
  return post('/ms/email/historylist', params);
};
