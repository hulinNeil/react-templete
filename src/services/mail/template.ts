import { get, post, del } from '@/utils/send';

// 邮件模板API（mail template API）

export interface CreateParamsType {
  id?: number;
  title: string;
  context: string;
  business: number;
  system: string;
  rule: number;
  kind: number;
  channel: number;
  placeholderCount: number;
}

export interface DelParamsType {
  id: number;
}

export interface GetParamsType {
  pageno: number;
}

export const createemplate = (params: CreateParamsType): Promise<any> => {
  return post('/ms/email/newtemplate', params);
};

export const editTemplate = (params: CreateParamsType): Promise<any> => {
  return post('/ms/email/edittemplate', params);
};

export const delTemplate = (params: DelParamsType): Promise<any> => {
  return del('/ms/email/deltemplate', params);
};

export const getTemplateList = (params: GetParamsType): Promise<any> => {
  return get('/ms/email/templatelist', params);
};
