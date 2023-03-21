const { dbconn } = require('../db');

const congreso = {
    addNewCongreso: async (req, res) => {
        try {
            let { titulo, descripcion, cupo, fecha_congreso, fecha_inicio, fecha_cierre, costo_usd } = req.body;
            const query = "CALL sp_crear_congreso(?,?,?,?,?,?,?)";

            const conn = await dbconn();
            conn.query(query, [titulo, descripcion, cupo, fecha_congreso, fecha_inicio, fecha_cierre, costo_usd],
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
    updateCongreso: async (req, res) => {
        try {
            const idCongreso = req.params["idCongreso"];
            let { titulo, descripcion, cupo, fecha_congreso, fecha_inicio, fecha_cierre, costo_usd } = req.body;
            const query = "CALL sp_editar_congreso(?,?,?,?,?,?,?,?)";

            const conn = await dbconn();
            conn.query(query, [idCongreso, titulo, descripcion, cupo, fecha_congreso, fecha_inicio, fecha_cierre, costo_usd],
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
    listarCongreso: async (req, res) => {
        try {
            const query = "CALL sp_listar_congreso()";

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

module.exports = congreso;