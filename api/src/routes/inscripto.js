const route = require("express").Router();
const { addNewInscripto, listarTodosInscriptos, listarInscriptoPorEmail, listarInscriptosPorCongreso, listarMailsSiben } = require('../controllers/Inscripto');

route.post('/', addNewInscripto);
route.get('/', listarTodosInscriptos);
route.get('/:email', listarInscriptoPorEmail);
route.get('/:idCongreso', listarInscriptosPorCongreso);
route.get('/mailsSiben', listarMailsSiben);

module.exports = route;