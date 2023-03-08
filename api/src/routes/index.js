const router = require('express').Router();
const payment = require('./paymentMP');
const congreso = require('./congreso');
const inscripto = require('./inscripto');

router.use('/process-payment', payment);
router.use('/congreso', congreso);
router.use('/inscripto', inscripto);

module.exports = router;