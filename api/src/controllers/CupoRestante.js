const mysql = require('mysql2/promise');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME}  = process.env;
const { getTipo } = require('./Data');

const cupoRestante = {
    calculoCupo: async (req, res) => {
        try {
            const idCongreso = req.params['idCongreso'];
            const tipo = await getTipo(idCongreso);
            console.log('TIPO: ----------------------- ' + tipo)

            const connect = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME
            });

            const [rows, fields] = await connect.execute('SELECT cupo FROM Congreso WHERE idCongreso=?', [idCongreso]);
            const cupo = rows;
            console.log('CUPO: ----------------------- ' + parseInt(cupo[0].cupo));

            const inscriptos = await connect.execute('CALL sp_contar_inscriptosPorCongreso(?)', [idCongreso]);
            console.log('INSCRIPTOS: ----------------- ' + parseInt(Object.values(inscriptos[0][0][0])));

            await connect.end();

            if(tipo && tipo != 'congreso') {
                const cupos_restantes = parseInt(cupo[0].cupo) - parseInt(Object.values(inscriptos[0][0][0]));
                console.log('CUPOS_RESTANTES: -------- ' + cupos_restantes);
                return res.status(200).json(cupos_restantes);
            } else {
                return res.status(404).send({msg: 'No aplica para ese Tipo'});
            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = cupoRestante;