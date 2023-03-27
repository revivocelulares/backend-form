const route = require("express").Router();
const { listar_InscriptosPorCongreso } = require('../controllers/Nosequepasa');

route.get('/:idCongreso', listar_InscriptosPorCongreso);

module.exports = route;