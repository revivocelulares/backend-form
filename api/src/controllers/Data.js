const mysql = require('mysql2/promise');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME}  = process.env;

const data = {
    getNombre: async (email) => {
        try {
            const connect = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME
            });

            const [rows, fields] = await connect.execute(`SELECT nombre FROM Inscriptos WHERE email=?`, [email]);
            await connect.end();
            return rows[0].nombre;
        } catch (error) {
            console.log(error);
        }
    },
    getApellido: async (email) => {
        try {
            const connect = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME
            });

            const [rows, fields] = await connect.execute(`SELECT apellido FROM Inscriptos WHERE email=?`, [email]);
            await connect.end();
            return rows[0].apellido;
        } catch (error) {
            console.log(error);
        }
    },
    getTitulo: async (idCongreso) => {
        try {
            const connect = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME
            });

            const [rows, fields] = await connect.execute(`SELECT titulo FROM Congreso WHERE idCongreso=?`, [idCongreso]);
            await connect.end();
            return rows[0].titulo;
        } catch (error) {
            console.log(error);
        }
    },
    getFechaCongreso: async (idCongreso) => {
        try {
            const connect = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME
            });

            const [rows, fields] = await connect.execute(`SELECT fecha_congreso FROM Congreso WHERE idCongreso=?`, [idCongreso]);
            await connect.end();
            return rows[0].fecha_congreso;
        } catch (error) {
            console.log(error);
        }
    },
    getDescripcion: async (idCongreso) => {
        try {
            const connect = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME
            });

            const [rows, fields] = await connect.execute(`SELECT descripcion FROM Congreso WHERE idCongreso=?`, [idCongreso]);
            await connect.end();
            return rows[0].descripcion;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = data;