const { dbconn } = require('../db');

const data = {
    getNombre: async (email) => {
        try {
            const conn = await dbconn();

            conn.query('SELECT nmbre FROM Inscriptos WHERE email=?', [email],
                (error, results, fields) => {
                    if(error) {
                        console.error(error.message);
                    }

                    let nombre = results[0].nombre;

                    return nombre;
                }
            );
            conn.end();
        } catch (error) {
            console.log(error);
        }
    },
    getApellido: async (email) => {
        try {
            const conn = await dbconn();

            conn.query('SELECT apellido FROM Inscriptos WHERE email=?', [email],
                (error, results, fields) => {
                    if(error) {
                        console.error(error.message);
                    }

                    let apellido = results[0].apellido;

                    return apellido;
                }
            );
            conn.end();
        } catch (error) {
            console.log(error);
        }
    },
}

module.exports = data;