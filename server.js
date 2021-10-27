const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const user = require('./src/routes/user');
const questionType = require('./src/routes/questionType');

dotenv.config({ path: './config.env' });
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', user);
app.use('/questiontype', questionType);

app.listen(process.env.PORT, function () {
  console.log('server is runing  in port ' + process.env.PORT);
});
