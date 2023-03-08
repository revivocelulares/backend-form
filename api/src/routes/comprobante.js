const route = require("express").Router();
const { addNewComprobante, listarComprobantes } = require('../controllers/Comprobante');

route.post('/', addNewComprobante);
route.get('/', listarComprobantes);

module.exports = route;