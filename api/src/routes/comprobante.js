const route = require("express").Router();
const { addNewComprobante } = require('../controllers/Comprobante');

route.post('/', addNewComprobante);

module.exports = route;