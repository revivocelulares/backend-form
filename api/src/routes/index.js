const router = require('express').Router();
const payment = require('./paymentMP');
const congreso = require('./congreso');
const inscripto = require('./inscripto');
const comprobante = require('./comprobante');
const resp_pago = require('./resp_pago');
const dolar = require('./dolar');
const mailsSiben = require('./mailsSiben');
const buscar = require('./mierda');

router.use('/process-payment', payment);
router.use('/congreso', congreso);
router.use('/inscripto', inscripto);
router.use('/comprobante', comprobante);
router.use('/resp_pago', resp_pago);
router.use('/dolar', dolar);
router.use('/mailsSiben', mailsSiben);
router.use('/buscarInscripto', buscar);

module.exports = router;