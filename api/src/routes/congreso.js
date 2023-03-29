const route = require("express").Router();
const { addNewCongreso, updateCongreso, listarCongreso, uploadImagen } = require('../controllers/Congreso');

route.post('/', addNewCongreso);
route.patch('/:idCongreso', updateCongreso);
route.get('/', listarCongreso);
route.post('/imagen', uploadImagen);


module.exports = route;