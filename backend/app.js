import express from 'express'
import v1Routes from './routes/index.js'
import sequelize from './config/databaseConection.js'


try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully to the DDBB.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

var app = express();app.get('/', function (req, res) {
  res.send('Hello World!');
});app.listen(3002, function () {
  console.log('Example app listening on port 3002!');
});