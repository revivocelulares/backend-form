const axios = require('axios');
const route = require("express").Router();

route.get('/', async (req, res) => {
    const dolar = await axios.get('https://api-cotizaciondolar.onrender.com/api/dolaroficial');
    return res.status(200).json(dolar.data);
});

module.exports = route;