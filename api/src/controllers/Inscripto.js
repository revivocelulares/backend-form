const { dbconn } = require('../db');
const mysql = require('mysql2/promise');
const { SIBEN_DB_USER, SIBEN_DB_PASSWORD, SIBEN_DB_HOST, SIBEN_DB_NAME } = process.env;

const inscripto = {
    addNewInscripto: async (req, res) => {
        try {
            let { email, nombre, apellido, pais, profesion, isResident, isMember } = req.body;

            const connect = await mysql.createConnection({
                host: SIBEN_DB_HOST,
                user: SIBEN_DB_USER,
                password: SIBEN_DB_PASSWORD,
                database: SIBEN_DB_NAME
            });
            const [rows, fields] = await connect.execute(`SELECT * FROM users WHERE email=? AND group_id=3 AND active=1`, [email]);
            const verify_email = rows.length > 0 ? rows[0]?.email : null;
            let isMember1 = verify_email != null ? 1 : 0;

            if(isMember === isMember1) {
                isMember = 1;
            } else {
                isMember = 0;
            }

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