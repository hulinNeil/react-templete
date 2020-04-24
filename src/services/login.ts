import { get, post, put } from '@/utils/send';
const proxy = '/api/';

export interface LoginParamsType {
  userName: string;
  password: string;
}

export interface Menu {
  title: string;
  icon: string;
  key?: string;
  children?: Menu[];
}

export interface UserInfoType {
  status: number;
  data: {
    username: string;
    createTime: number;
    permission: number;
    menu: Menu[];
  };
}

export const login = (params: LoginParamsType): Promise<UserInfoType> => {
  return post(proxy + 'login', params);
};

export const logout = () => {
  return get(proxy + 'logout', {});
};

export const updateBasicInfo = (params: any) => {
  return put(proxy + 'update_basic_info', params);
};

export const check = (params: any) => {
  return put(proxy + 'check', params);
};

export const getFakeCaptcha = (mobile: string) => {
  return get(`/api/captcha?mobile=${mobile}`, {});
};
