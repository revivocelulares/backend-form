const server = require('./src/app');
require('dotenv').config();

server.listen(process.env.PORT, () => {
    console.log('Servidor escuchando en puerto ' + process.env.PORT);
});