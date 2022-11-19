import express from 'express'
import v1Routes from './routes/index.js'



var app = express();app.get('/', function (req, res) {
  res.send('Hello World!');
});app.listen(3002, function () {
  console.log('Example app listening on port 3002!');
});