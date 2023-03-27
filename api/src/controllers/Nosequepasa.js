const { dbconn } = require('../db');

const mierda = {
    listar_InscriptosPorCongreso: async (req, res) => {
        try {
            let idCongreso = req.params['idCongreso'];
            const query = "CALL sp_buscar_inscriptosPorCongreso(?)";
            
            let conn = await dbconn();
            conn.query(query, [idCongreso],
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

module.exports = mierda;
