const express = require('express');
const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))  // for parsing application/x-www-form-urlencoded


const router = require('./router');

app.use('/', router);
app.listen(3100, () => {
  console.log('app is running at 3100');
});
