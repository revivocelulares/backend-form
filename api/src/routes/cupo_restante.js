const route = require("express").Router();
const { calculoCupo } = require('../controllers/CupoRestante');

route.get('/:idCongreso', calculoCupo);

module.exports = route;