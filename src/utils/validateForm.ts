export const validateMailContent = (rule: any, value: string) => {
  value = value.trim();
  let msg = '';
  if (value === '<p><br></p>') {
    msg = '必须输入邮件模板';
  } else {
    const replaces = value.match(/{\d+}/gi);
    const repetitiveKeys: string[] = [];
    replaces &&
      replaces.sort().sort((a, b) => {
        if (a === b && !~repetitiveKeys.indexOf(a)) {
          repetitiveKeys.push(a);
        }
        return 0;
      });
    if (repetitiveKeys.length > 0) {
      msg = `不能有重复的模板变量：${repetitiveKeys.join('-')}`;
    }
  }
  return msg ? Promise.reject(msg) : Promise.reject();
};

export const validateMailAddressee = (rule: any, value: string) => {
  console.log(rule, value);
  let msg = '';
  if (!value) {
    msg = '必须输入邮件模板';
  } else {
    value = value.trim();
    const addressList: string[] = value.split(' ');
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    console.log(addressList.length);
    for (let i = 0, length = addressList.length; i < length; i++) {
      if (!reg.test(addressList[i])) {
        msg = '邮箱格式不正确';
        break;
      }
    }
  }
  return msg ? Promise.reject(msg) : Promise.reject();
};
