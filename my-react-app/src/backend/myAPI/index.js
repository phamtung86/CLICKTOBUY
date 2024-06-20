const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Sử dụng bodyParser để xử lý JSON và x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Định nghĩa endpoint GET /api/hello
app.get('/api/hello', (req, res) => {
  res.send('Hello World!');
});

// Khởi động server và lắng nghe các kết nối tới cổng port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
