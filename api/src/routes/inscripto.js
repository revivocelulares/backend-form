const route = require("express").Router();
const { addNewInscripto, listarTodosInscriptos, listarInscriptoPorEmail, listarInscriptosPorCongreso } = require('../controllers/Inscripto');

route.post('/', addNewInscripto);
route.get('/', listarTodosInscriptos);
route.get('/:email', listarInscriptoPorEmail);
route.get('/:idCongreso', listarInscriptosPorCongreso);

module.exports = route;