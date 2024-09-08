const express = require('express');
const path = require('path');

const app = express();

// Pug 템플릿 엔진 설정
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 정적 파일 서빙
app.use(

  express.static(path.join(__dirname, '../dist'))

);

app.get('/', (req, res) => {
  console.log('안녕');
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});