const router = require('express').Router();
const payment = require('./paymentMP');
const congreso = require('./congreso');
const inscripto = require('./inscripto');
const comprobante = require('./comprobante');
const resp_pago = require('./resp_pago');
const dolar = require('./dolar');
const mailsSiben = require('./mailsSiben');
const buscar = require('./mierda');
const cupo_restante = require('./cupo_restante');
const finalisima = require('./finalProcess');

router.use('/create_preference', payment);
router.use('/congreso', congreso);
router.use('/inscripto', inscripto);
router.use('/comprobante', comprobante);
router.use('/resp_pago', resp_pago);
router.use('/dolar', dolar);
router.use('/mailsSiben', mailsSiben);
router.use('/buscarInscripto', buscar);
router.use('/cupo_restante', cupo_restante);
router.use('/final', finalisima);

module.exports = router;