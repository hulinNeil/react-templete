import dva from 'dva';
import createLoading from 'dva-loading';
import intl from 'react-intl-universal';
import { storage } from '@/utils/tools';
import { createBrowserHistory } from 'history';
import RouterConfig from './router';
import models from './models';
import '@/assets/styles/index.less';

// Set language
let lang = storage.getItem('lang_local') ? storage.getItem('lang_local') : (navigator.languages && navigator.languages[0]) || navigator.language;
let currentLocale = '';
switch (lang) {
  case 'zh-CN':
    currentLocale = 'zh-CN';
    break;
  case 'zh-TW':
    currentLocale = 'zh-TW';
    break;
  default:
    currentLocale = 'en-US';
}
const locales = {};
locales[currentLocale] = require(`./locales/${currentLocale}`).default;
intl.init({
  currentLocale,
  locales,
});

const app = dva({
  history: createBrowserHistory(),
});

// Use pluins
app.use(createLoading());

// Use Model
models.forEach((key) => app.model(key.default));

// reqire router
app.router(RouterConfig);

// run app
app.start('#root');
