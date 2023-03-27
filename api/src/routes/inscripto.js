const route = require("express").Router();
const { addNewInscripto, listarTodosInscriptos, listarInscriptoPorEmail } = require('../controllers/Inscripto');

route.post('/', addNewInscripto);
route.get('/', listarTodosInscriptos);
route.get('/:email', listarInscriptoPorEmail);

module.exports = route;