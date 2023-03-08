const mysql = require('mysql2');
require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME}  = process.env;

const dbconn = async () => {
    let conn = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    });

    conn.connect(function(err) {
        if (err) {
            console.error('Error al conectar a la Base de Datos', err.stack);
            return;
        }
        console.log("Conexión a la Base de Datos establecida con Éxito - ID: " + conn.threadId);
    });
    return conn;
}

module.exports = { dbconn };