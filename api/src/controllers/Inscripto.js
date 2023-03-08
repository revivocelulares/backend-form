const { dbconn } = require('../db');

const inscripto = {
    addNewInscripto: async (req, res) => {
        try {
            let { email, nombre, apellido, pais, profesion, isResident, isMember } = req.body;
            const query = "CALL sp_crear_inscripto(?,?,?,?,?,?,?)";

            const conn = await dbconn();
            conn.query(query, [email, nombre, apellido, pais, profesion, isResident, isMember],
                (error, results, fields) => {
                    if(error) {
                        console.error(error.message);
                    }
                    res.status(200).json(results.affectedRows);
                }
            );
            conn.end();
        } catch (error) {
            console.log(error);
        }
    },
    listarTodosInscriptos: async (req, res) => {
        try {
            const query = "CALL sp_listar_toods_inscriptos()";

            const conn = await dbconn();
            conn.query(query, (error, results, fields) => {
                if(error) {
                    console.error(error.message);
                }
                res.status(200).json(results[0]);
            });
            conn.end();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = inscripto;