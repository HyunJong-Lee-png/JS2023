const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
require('./mongoose');
const userRouter = require('./Router/userRouter');

console.log(__dirname)
app.set('port', 3001);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static('C:\\JS2023\\fullStack\\dist'));
app.use(morgan('dev'));
app.use(cors());

app.use('/user', userRouter);

app.listen(app.get('port'), () => {
  console.log(`server in running ${app.get('port')}`);
})

