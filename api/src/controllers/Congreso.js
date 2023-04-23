const { dbconn } = require('../db');
let fs = require('fs');

const congreso = {
    addNewCongreso: async (req, res) => {
        try {
            let { titulo, 
                  tipo, 
                  descripcion, 
                  cupo, 
                  imagen, 
                  fecha_congreso, 
                  fecha_inicio, 
                  fecha_cierre, 
                  costo_usd_medicos_nm, 
                  costo_usd_medicos_m,
                  costo_usd_nomedicos_nm,
                  costo_usd_nomedicos_m,
                  costo_ars_medicos_m,
                  costo_ars_medicos_nm,
                  costo_ars_nomedicos_m,
                  costo_ars_nomedicos_nm } = req.body;
            let buff = fs.readFileSync(`./src/imagenes/${titulo}.jpg`);
            imagen = buff.toString('base64');
            const query = "CALL sp_crear_congreso(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

            const conn = await dbconn();
            conn.query(query, [titulo, 
                               tipo, 
                               descripcion, 
                               cupo, 
                               imagen, 
                               fecha_congreso, 
                               fecha_inicio, 
                               fecha_cierre, 
                               costo_usd_medicos_nm, 
                               costo_usd_medicos_m,
                               costo_usd_nomedicos_nm,
                               costo_usd_nomedicos_m,
                               costo_ars_medicos_m,
                               costo_ars_medicos_nm,
                               costo_ars_nomedicos_m,
                               costo_ars_nomedicos_nm],
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
            let { titulo, 
                  tipo, 
                  descripcion, 
                  cupo, 
                  imagen, 
                  fecha_congreso, 
                  fecha_inicio, 
                  fecha_cierre, 
                  costo_usd_medicos_nm, 
                  costo_usd_medicos_m,
                  costo_usd_nomedicos_nm,
                  costo_usd_nomedicos_m,
                  costo_ars_medicos_m,
                  costo_ars_medicos_nm,
                  costo_ars_nomedicos_m,
                  costo_ars_nomedicos_nm } = req.body;
            const query = "CALL sp_editar_congreso(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

            const conn = await dbconn();
            conn.query(query, [idCongreso, 
                               titulo, 
                               tipo, 
                               descripcion, 
                               cupo, 
                               imagen, 
                               fecha_congreso, 
                               fecha_inicio, 
                               fecha_cierre, 
                               costo_usd_medicos_nm, 
                               costo_usd_medicos_m,
                               costo_usd_nomedicos_nm,
                               costo_usd_nomedicos_m,
                               costo_ars_medicos_m,
                               costo_ars_medicos_nm,
                               costo_ars_nomedicos_m,
                               costo_ars_nomedicos_nm],
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
    },
    eliminarCongreso: async (req, res) => {
        try {
            const idCongreso = req.params["idCongreso"];
            const query = 'CALL sp_eliminar_congreso(?)';

            const conn = await dbconn();
            conn.query(query, [idCongreso],
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
    uploadImagen: async (req, res) => {
        try {
            let upfile = req.files.file;
            console.log('file: ' + upfile.name);
            upfile.mv(`./src/imagenes/${upfile.name}`, err => {
            if(err) return res.status(500).send({ message : err });
                return res.status(200).send({ message : 'File upload' });
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = congreso;