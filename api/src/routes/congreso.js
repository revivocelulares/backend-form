const route = require("express").Router();
const { addNewCongreso, updateCongreso, listarCongreso, uploadImagen, eliminarCongreso } = require('../controllers/Congreso');

route.post('/', addNewCongreso);
route.patch('/:idCongreso', updateCongreso);
route.get('/', listarCongreso);
route.post('/imagen', uploadImagen);
route.delete('/:idCongreso', eliminarCongreso);


module.exports = route;