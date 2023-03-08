const route = require("express").Router();
const { addNewRespPago } = require('../controllers/Resp_pago');

route.post('/', addNewRespPago);

module.exports = route;