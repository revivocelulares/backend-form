const route = require("express").Router();
const { addNewComprobante, listarComprobantes } = require('../controllers/Comprobante');

route.post('/', addNewComprobante);
route.get('/:idCongreso', listarComprobantes);

module.exports = route;