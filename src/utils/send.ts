import axios, { AxiosResponse } from 'axios';
import Qs from 'qs';
import { message } from 'antd';
import { storage, delUserStorage } from './tools';
import { apiConfig } from '@/config/index';

function checkLoginAndSetToken(resp: AxiosResponse): boolean {
  const token = resp.headers.authorization;
  const expireTime = resp.headers.expire_time;
  const code = resp.data.code;
  if (code === 401) {
    delUserStorage();
    message.error(resp.data.message, 1000);
    setTimeout(function () {
      window.location.href = '/';
    }, 500);
    return false;
  }
  if (token) {
    const tokenArr = token.split(' ');
    storage.setItem('request_token', tokenArr[1]);
    storage.setItem('expire_time', Number(expireTime));
  }
  return true;
}

axios.interceptors.request.use(function (config) {
  config.url = apiConfig.host + apiConfig.proxy + config.url;
  const requestToken = storage.getItem('request_token');
  config.headers['Authorization'] = 'Bearer ' + requestToken;
  config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  config.timeout = 60000;
  return config;
});
axios.interceptors.response.use(
  function (response) {
    if (checkLoginAndSetToken(response) === false) {
      return Promise.reject(false);
    }
    return response;
  },
  function (error) {
    message.error('未知错误，请检查下你的网络哦~');
    return { error };
  }
);

export const post = (url: string, param: any) => {
  const data = Qs.stringify(param);
  return axios.post(url, data).then((resp) => resp.data);
};

export const put = (url: string, param: any) => {
  const data = Qs.stringify(param);
  return axios.put(url, data).then((resp) => resp.data);
};

export const get = (url: string, params: any) => {
  return axios.get(url, { params }).then((resp) => resp.data);
};

export const del = (url: string, params: any) => {
  return axios.delete(url, { params }).then((resp) => resp.data);
};

export const download = (url: string, params: any) => {
  return axios({
    method: 'get',
    url: url,
    params: params,
    headers: {
      'Content-Type': 'application/json;application/octet-stream',
    },
    responseType: 'blob',
  }).then((resp) => {
    return {
      data: resp.data,
    };
  });
};
