const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const user = require('./src/routes/user');
dotenv.config({ path: './config.env' });
const app = express();

app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

app.post('/', function (req, res) {
  res.send('POST request to the server');
});
app.use('/user', user);

app.listen(process.env.PORT, function () {
  console.log('server is runing  in port ' + process.env.PORT);
});
