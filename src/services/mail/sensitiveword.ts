import { get, post, del } from '@/utils/send';

// 敏感词相关API（sensitiveword API）

export interface CreateParamsType {
  word: string;
}

export interface DelParamsType {
  id: number;
}

export interface GetParamsType {
  pageno: number;
}

export const createWord = (params: CreateParamsType): Promise<any> => {
  return post('/ms/newsensitiveword', params);
};

export const deleteWord = (params: DelParamsType): Promise<any> => {
  return del('/ms/delsensitiveword', params);
};

export const getWordList = (params: GetParamsType): Promise<any> => {
  return get('/ms/sensitivewordlist', params);
};
