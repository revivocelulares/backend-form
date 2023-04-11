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
    },
    getTipo: async (idCongreso) => {
        try {
            const connect = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME
            });

            const [rows, fields] = await connect.execute(`SELECT tipo FROM Congreso WHERE idCongreso=?`, [idCongreso]);
            await connect.end();
            return rows[0].tipo;
        } catch (error) {
            console.log(error);
        }
    },
    getPagadoUSD: async (email) => {
        try {
            const connect = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME
            });

            const [rows, fields] = await connect.execute(`SELECT monto_abonado_usd AS pagado_usd FROM respuesta_pago WHERE email=?`, [email]);
            connect.end();
            return rows[0].pagado_usd;
        } catch (error) {
            console.log(error);
        }
    },
    getPagadoARS: async (email) => {
        try {
            const connect = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME
            });

            const [rows, fields] = await connect.execute(`SELECT monto_abonado_ars AS pagado_ars FROM respuesta_pago WHERE email=?`, [email]);
            connect.end();
            return rows[0].pagado_ars;
        } catch (error) {
            console.log(error);
        }
    },
    getIdPago: async (email) => {
        try {
            const connect = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME
            });

            const [rows, fields] = await connect.execute(`CALL sp_listar_respuesta_pago(?)`, [email]);
            connect.end();
            const resp = rows.map(element => { return { 
                id_pago: element.detalle.map(e => e.id).toString()
            }});
            return resp;
        } catch (error) {
            console.log(error);
        }
    },
    getEstadoPago: async (email) => {
        try {
            const connect = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME
            });

            const [rows, fields] = await connect.execute(`CALL sp_listar_respuesta_pago(?)`, [email]);
            connect.end();
            const resp = rows.map(element => { return { 
                estado_pago: element.detalle.map(e => e.status).toString()
            }});
            return resp;
        } catch (error) {
            console.log(error);
        } 
    },
    getMetodoPago: async (email) => {
        try {
            const connect = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME
            });

            const [rows, fields] = await connect.execute(`CALL sp_listar_respuesta_pago(?)`, [email]);
            connect.end();
            const resp = rows.map(element => { return { 
                metodo_pago: element.detalle.map(e => e.status).toString() === 'approved' ? 'Mercado Pago' : 'PayPal'
            }});
            return resp;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = data;