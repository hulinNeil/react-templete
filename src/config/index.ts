const apiConfig = {
  host: '',
  proxy: '/api',
};

if (process.env.REACT_APP_ENV === 'dev') {
  // 这里是线上测试版（Here is the beta version）
  apiConfig.host = 'http://localhost:3100';
  apiConfig.proxy = '/api/v1';
} else if (process.env.REACT_APP_ENV === 'production') {
  // 这里是正式版（Here is the production version）
  apiConfig.host = 'http://www.kiple.com';
}

export { apiConfig };
