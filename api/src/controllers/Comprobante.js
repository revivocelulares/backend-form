const { dbconn } = require('../db');
const sendMail = require('./Mailer');
const { getNombre, getApellido } = require('./Data');

const comprobante = {
    addNewComprobante: async (req, res) => {
        try {
            let { fecha_inscripcion, idCongreso, email } = req.body;
            const query = "CALL sp_crear_comprobante(?,?,?)";

            const conn = await dbconn();
            conn.query(query, [fecha_inscripcion, idCongreso, email],
                async (error, results, fields) => {
                    if(error) {
                        console.error(error.message);
                    }

                    if(results.affectedRows === 1) {
                        let info = {
                            confimInscription: true,
                            email: email,
                            nombre: await getNombre(email),
                            apellido: await getApellido(email)
                        }
                        console.log('INFO ----------- ' + info);
                        await sendMail(info);
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
            const idCongreso = req.params['idCongreso'];
            const query = "CALL sp_buscar_comprobante(?)";

            const conn = await dbconn();
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

module.exports = comprobante;