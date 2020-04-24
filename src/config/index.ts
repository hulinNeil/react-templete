let host = ''; // 这里是本地开发版（Here is the development version）
if (process.env.REACT_APP_ENV === 'dev') {
  // 这里是线上测试版（Here is the beta version）
  host = 'http://localhost:3100';
} else if (process.env.REACT_APP_ENV === 'production') {
  // 这里是正式版（Here is the production version）
  host = 'http://www.kiple.com';
}

export { host };
