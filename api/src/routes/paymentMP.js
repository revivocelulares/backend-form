const route = require("express").Router();
const { paymentmethod, feedback } = require('../controllers/PaymentMP');

route.post('/MELI', paymentmethod);
route.get('/feedback', feedback);

module.exports = route;