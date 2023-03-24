const route = require("express").Router();
const { listarMailsSiben } = require('../controllers/MailsSiben');

route.get('/', listarMailsSiben);

module.exports = route;