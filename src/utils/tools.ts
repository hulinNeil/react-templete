// 获取cookie
export const getCookie = (name: string): string => {
  const reg = new RegExp(`(^| )${name}(?:=([^;]*))?(;|$)`);
  const val = document.cookie.match(reg);
  return val ? (val[2] ? unescape(val[2]) : '') : '';
};

// 设置cookie
export const setCookie = (name: string, value: any, expires = 24 * 60, path = '/', domain = null, secure = false): void => {
  const expdate = new Date();
  expdate.setMinutes(expdate.getMinutes() + parseInt(expires)); // 默认为1天(24*60)
  // eslint-disable-next-line
  const cookietemp = `${window.escape(name)}=${window.escape(value)}${expires ? `; expires=${expdate.toUTCString()}` : ''}; path=${path}${
    domain ? `; domain=${domain}` : ''
  }${secure ? '; secure' : ''}`;
  document.cookie = cookietemp;
};

// 深拷贝
export function deepCopy(source: any): void {
  let copy, i, len, prop;
  const _hasOwn = window['Object']['prototype']['hasOwnProperty'];
  if (typeof source !== 'object' || source == null || typeof source.nodeType === 'number') {
    copy = source;
  } else if (typeof source.length === 'number') {
    copy = [];
    for (i = 0, len = source.length; i < len; i++) {
      if (_hasOwn.call(source, i)) {
        copy[i] = deepCopy(source[i]);
      }
    }
  } else {
    copy = {};
    for (prop in source) {
      if (_hasOwn.call(source, prop)) {
        copy[prop] = deepCopy(source[prop]);
      }
    }
  }
  return copy;
}

export const delay = (millis) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), millis);
  });

// 封装localStorage
export const storage = {
  setItem: (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value)),
  getItem: (key: string) => JSON.parse(localStorage.getItem(key)),
  removeItem: (key: string) => localStorage.removeItem(key),
};

export function delUserStorage(): void {
  storage.removeItem('user_key');
  storage.removeItem('request_token');
  storage.removeItem('front_routers');
  storage.removeItem('menu_tree');
  storage.removeItem('expire_time');
  storage.removeItem('permission_tree');
}
