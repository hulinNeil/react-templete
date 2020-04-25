import { get, post, del } from '@/utils/send';

// 邮件定时任务API（mail cronjob API）

export interface CreateParamsType {
  channelId: number;
  templateId: number;
  mailTo: string[]; // 发送对象邮箱 ['1@qq.com', '2@qq.com']
  replaceWord: string[];
  sendTime: number;
}

export interface DelParamsType {
  id: number;
}

export interface GetParamsType {
  pageno: number;
}

export const createCronjob = (params: CreateParamsType): Promise<any> => {
  return post('/ms/email/newcronjob', params);
};

export const deleteCronjob = (params: DelParamsType): Promise<any> => {
  return del('/ms/email/delcronjob', params);
};

export const getCronjobList = (params: GetParamsType): Promise<any> => {
  return get('/ms/email/cronjoblist', params);
};
