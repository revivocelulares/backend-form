const route = require("express").Router();
const { final } = require('../controllers/FinalProceso');

route.post('/', final);

module.exports = route;