const route = require("express").Router();
const { addNewInscripto, listarTodosInscriptos, listarInscriptosPorCongreso } = require('../controllers/Inscripto');

route.post('/', addNewInscripto);
route.get('/', listarTodosInscriptos);
route.get('/:idCongreso', listarInscriptosPorCongreso);

module.exports = route;