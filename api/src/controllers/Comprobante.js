const { dbconn } = require('../db');

const comprobante = {
    addNewComprobante: async (req, res) => {
        try {
            let { fecha_inscripcion, idCongreso, email } = req.body;
            const query = "CALL sp_crear_comprobante(?,?,?)";

            const conn = await dbconn();
            conn.query(query, [fecha_inscripcion, idCongreso, email],
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
    listarComprobantes: async (req, res) => {
        try {
            let { idCongreso, email } = req.body;
            const query = "CALL sp_listar_comprobantes(?,?)";

            const conn = await dbconn();
            conn.query(query, [idCongreso, email],
                (error, results, fields) => {
                    if(error) {
                        console.error(error.message);
                    }
                    res.status(200).json(results[0]);
                }
            );
            conn.end();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = comprobante;