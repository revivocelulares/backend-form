const route = require("express").Router();
const { addNewInscripto, listarTodosInscriptos } = require('../controllers/Inscripto');

route.post('/', addNewInscripto);
route.get('/', listarTodosInscriptos);

module.exports = route;