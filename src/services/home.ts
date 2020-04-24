import request from '@/utils/request';
import { post, get } from '@/utils/send';
const proxy = '/api';

export const getList = (params) => {
  return get(proxy +'/api/v1/topics', params);
};


export const query = () => {
  return request(proxy + '/api/v1/topics');
};

