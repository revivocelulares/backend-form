const router = require('express').Router();
const payment = require('./paymentMP');
const congreso = require('./congreso');

router.use('/process-payment', payment);
router.use('/congreso', congreso);

module.exports = router;