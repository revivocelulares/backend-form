const route = require("express").Router();
const { addNewRespPago, getRespuestaPago } = require('../controllers/Resp_pago');

route.post('/', addNewRespPago);
route.get('/:email', getRespuestaPago);

module.exports = route;