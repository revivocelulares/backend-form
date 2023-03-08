const route = require("express").Router();
const { addNewCongreso, updateCongreso, listarCongreso } = require('../controllers/Congreso');

route.post('/', addNewCongreso);
route.patch('/:idCongreso', updateCongreso);
route.get('/', listarCongreso);


module.exports = route;