import express from 'express'
import sequelize from './config/databaseConection.js'
import dbRoute from './routes/ddbb.route.js'
import mapaRoute from './routes/mapa.route.js'
import actualRoute from './routes/actual.route.js'
import resaltadosRoute from './routes/resaltados.route.js'
import graficasRoute from './routes/graficas.route.js'
import cors from 'cors';

let app = express(); // Sensitive
app.use(express.json());


try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully to the DDBB.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

app.use(cors());


app.use('/ddbb', dbRoute)
app.use('/mapa', mapaRoute)
app.use('/actual', actualRoute)
app.use('/resaltados', resaltadosRoute)
app.use('/graficas', graficasRoute)

app.listen(3002, function () {
  console.log('Example app listening on port 3002!');
});