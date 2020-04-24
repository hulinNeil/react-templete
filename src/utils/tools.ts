// 获取cookie
export const getCookie = (name: string) => {
  const reg = new RegExp(`(^| )${name}(?:=([^;]*))?(;|$)`);
  const val = document.cookie.match(reg);
  return val ? (val[2] ? unescape(val[2]) : '') : null;
};

// 设置cookie
export const setCookie = (name: string, value: any, expires = 24 * 60, path = '/', domain = null, secure = false) => {
  const expdate = new Date();
  expdate.setMinutes(expdate.getMinutes() + parseInt(expires)); // 默认为1天(24*60)
  // eslint-disable-next-line
  const cookietemp = `${window.escape(name)}=${window.escape(value)}${expires ? `; expires=${expdate.toUTCString()}` : ''}; path=${path}${
    domain ? `; domain=${domain}` : ''
  }${secure ? '; secure' : ''}`;
  document.cookie = cookietemp;
};

const time33 = (str: string) => {
  // 哈希time33算法
  let hash = '';
  for (let i = 0, len = str.length, hash = 5381; i < len; ++i) {
    hash += (hash << 5) + str.charCodeAt(i);
  }
  return hash & 0x7fffffff;
};

// 深拷贝
export function deepCopy(source) {
  let copy, i, len, prop;
  let _hasOwn = window['Object']['prototype']['hasOwnProperty'];
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

export const validateIP = (ip) => {
  const reg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return reg.test(ip);
};

export const delay = (millis) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), millis);
  });

export function formateDate(time: number) {
  if (!time) {
    return '';
  }
  let date = new Date(time);
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds()
  );
}

// 封装localStorage
export const storage = {
  setItem: (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value)),
  getItem: (key: string) => JSON.parse(localStorage.getItem(key)),
  removeItem: (key: string) => localStorage.removeItem(key),
};

export function delUserStorage() {
  storage.removeItem('user_key');
  storage.removeItem('request_token');
  storage.removeItem('front_routers');
  storage.removeItem('menu_tree');
  storage.removeItem('expire_time');
  storage.removeItem('permission_tree');
}