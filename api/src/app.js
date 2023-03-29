const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const corss = require('corss');
const fileUpload = require('express-fileupload');
const routes = require('./routes/index.js');
require('dotenv').config();

const server = express();

server.name = 'BACKEND FORMULARIO SIBEN';

server.use(express.json({limit: '50mb'}));
server.use(express.urlencoded({limit: '50mb'}));
server.use(cookieParser());
server.use(fileUpload());
server.use(morgan('dev'));
server.use(corss());
server.use('/api/imagenes', express.static(__dirname + '/imagenes'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

server.use('/api', routes);

server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;