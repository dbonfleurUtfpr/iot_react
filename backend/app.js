var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Importação do mongoose
const mongoose = require('mongoose');
// Importação da rota de autenticação
const authRoutes = require('./routes/auth');
// Importação da rota de sensores
const sensorRoutes = require('./routes/sensor');
// Importação da rota de pessoas
const pessoaRoutes = require('./routes/pessoa');
// Importação da rota de gateways
const gatewayRoutes = require('./routes/gateway');
// Importação da rota de dispositivos
const dispositivoRoutes = require('./routes/dispositivos');
// Importação das rotas do atuador
const atuadorRoutes = require('./routes/atuadores');
// Importação das rotas da leitura
const leituraRoutes = require('./routes/leitura');
// Importação do cors
const cors = require('cors');
// Requisição do dotenv
require('dotenv').config();

var app = express();

// Configuração do banco de dados
mongoose
  .connect("mongodb+srv://dbonfleur:17GdwQfDjLjDyA1j@cluster0.rjj365z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {})
  .then(() => {
    console.log("MongoDB conectado!");
  })
  .catch( (err) => {
    console.log("MongoDB não conectado: ");
    console.log(err);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Definição dos rotas da aplicação
app.use('/auth', authRoutes);
app.use('/atuador', atuadorRoutes);
app.use('/leitura', leituraRoutes);
app.use('/sensor', sensorRoutes);
app.use('/pessoa', pessoaRoutes);
app.use('/gateway', gatewayRoutes);
app.use('/dispositivo', dispositivoRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
